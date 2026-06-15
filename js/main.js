// ─── Firebase Setup ───
    let db = null, auth = null, appId = 'shanta-app';
    let useFirebase = false;

    // Dynamic imports
    async function initFirebase() {
        try {
            const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
            const { getAuth, signInAnonymously, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
            const { getFirestore, collection, doc, setDoc, addDoc, deleteDoc, onSnapshot } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");

            const firebaseConfig = {
                apiKey: "AIzaSyDr7HTFfrH9ysDVAg2WlR6RkMdst0mMdTM",
                authDomain: "interiors-56740.firebaseapp.com",
                projectId: "interiors-56740",
                storageBucket: "interiors-56740.firebasestorage.app",
                messagingSenderId: "304781491747",
                appId: "1:304781491747:web:ef1efb994267e102197b96",
                measurementId: "G-PFNV109SP5"
            };

            const app = initializeApp(firebaseConfig);
            auth = getAuth(app);
            db = getFirestore(app);
            appId = typeof __app_id !== 'undefined' ? __app_id : 'shanta-app';
            useFirebase = true;

            // Store references globally for admin operations
            window._fb = { db, collection, doc, setDoc, addDoc, deleteDoc, onSnapshot, appId };

            onAuthStateChanged(auth, (user) => { if (user) initLiveData(); });
            await signInAnonymously(auth);
        } catch (e) {
            console.log('Firebase not available, using localStorage fallback.', e.message);
            useFirebase = false;
            initLocalData();
        }
    }

    // ─── Default Data ───
    const DEFAULTS = {
        config: {
            price: '700',
            guarantee: '30-Day Delivery Guarantee*',
            terms: 'Payment structure is 60% Advance, 30% upon completion of building structure, and 10% final payment. In the event of a project delay beyond the 30-day timeline, the 10% final payment will be waived off.'
        },
        portfolio: [
            { id: 'p1', imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop', title: 'The Indiranagar Villa', location: 'Bangalore • Residential', createdAt: 1 },
            { id: 'p2', imageUrl: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=600&auto=format&fit=crop', title: 'Earthy Kitchen', location: 'Chennai', createdAt: 2 },
            { id: 'p3', imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop', title: 'Minimalist Living', location: 'Hyderabad', createdAt: 3 },
            { id: 'p4', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop', title: 'Jubilee Hills Penthouse', location: 'Hyderabad • Turnkey', createdAt: 4 },
        ]
    };

        // ─── Update UI ───
    function applyConfig(data) {
        document.getElementById('hero-price-display').textContent = `Starts at ₹${data.price}/sqft`;
        document.getElementById('hero-guarantee-display').textContent = data.guarantee;
        document.getElementById('banner-price-display').textContent = `₹${data.price}/sqft`;
        document.getElementById('banner-guarantee-title').textContent = data.guarantee;
        document.getElementById('banner-terms-display').textContent = data.terms;
        document.getElementById('admin-input-price').value = data.price || '';
        document.getElementById('admin-input-guarantee').value = data.guarantee || '';
        document.getElementById('admin-input-terms').value = data.terms || '';
        
        if (data.componentRates) {
            COMPONENT_RATES = data.componentRates;
            document.getElementById('rate-std-ess').value = data.componentRates.standard.essential;
            document.getElementById('rate-std-prem').value = data.componentRates.standard.premium;
            document.getElementById('rate-std-lux').value = data.componentRates.standard.luxury;
            
            document.getElementById('rate-kit-ess').value = data.componentRates.kitchen.essential;
            document.getElementById('rate-kit-prem').value = data.componentRates.kitchen.premium;
            document.getElementById('rate-kit-lux').value = data.componentRates.kitchen.luxury;
            
            document.getElementById('rate-kitloft-ess').value = data.componentRates.kitchenLoft.essential;
            document.getElementById('rate-kitloft-prem').value = data.componentRates.kitchenLoft.premium;
            document.getElementById('rate-kitloft-lux').value = data.componentRates.kitchenLoft.luxury;
            
            document.getElementById('rate-bedloft-ess').value = data.componentRates.bedroomLoft.essential;
            document.getElementById('rate-bedloft-prem').value = data.componentRates.bedroomLoft.premium;
            document.getElementById('rate-bedloft-lux').value = data.componentRates.bedroomLoft.luxury;
            
            // Re-calc quote totals if modal is open
            if(typeof calculateQuoteTotals === 'function') calculateQuoteTotals();
        }
    }

    window.isAdminAuthed = false;

    function renderPortfolio(items) {
        const grid = document.getElementById('portfolio-grid');
        const adminList = document.getElementById('admin-portfolio-list');
        grid.innerHTML = '';
        adminList.innerHTML = '';

        items.sort((a, b) => a.createdAt - b.createdAt);

        items.forEach((item, i) => {
            let extraClasses = '';
            let heightClass = 'h-[300px]';
            if (i === 0) { extraClasses = 'lg:col-span-2 lg:row-span-2'; heightClass = 'h-[300px] lg:h-[616px]'; }
            else if (i === 3) { extraClasses = 'lg:col-span-2'; }

            const adminBtnClass = window.isAdminAuthed ? 'flex' : 'hidden';

            grid.innerHTML += `
            <div class="${extraClasses} relative group img-hover-zoom cursor-pointer reveal active rounded-2xl" onclick="openLightbox('${item.imageUrl}')">
                <img src="${item.imageUrl}" alt="${item.title}" class="w-full ${heightClass} object-cover rounded-2xl">
                <div class="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 lg:p-8 rounded-2xl">
                    <h3 class="text-xl lg:text-2xl font-serif mb-1 text-slate-900">${item.title}</h3>
                    <p class="text-brand-600 text-xs uppercase tracking-widest">${item.location}</p>
                </div>
                <button onclick="event.stopPropagation(); window.confirmDelete('${item.id}', this)" data-confirm="false"
                    class="absolute top-4 right-4 bg-red-500/80 backdrop-blur-sm text-white w-10 h-10 rounded-full z-20 ${adminBtnClass} items-center justify-center transition-all hover:bg-red-600 admin-only-btn shadow-lg">
                    <i class="fas fa-trash-alt text-sm"></i>
                </button>
            </div>`;

            // Admin list item
            adminList.innerHTML += `
            <div class="flex items-center gap-3 p-3 bg-white shadow-sm border border-slate-200 rounded-xl">
                <img src="${item.imageUrl}" class="w-12 h-12 rounded-lg object-cover flex-shrink-0">
                <div class="flex-1 min-w-0">
                    <p class="text-slate-900 text-sm font-medium truncate">${item.title}</p>
                    <p class="text-slate-400 text-xs truncate">${item.location}</p>
                </div>
                <button onclick="window.confirmDelete('${item.id}', this)" data-confirm="false" class="text-slate-400 hover:text-red-400 transition-colors flex-shrink-0">
                    <i class="fas fa-trash-alt text-sm"></i>
                </button>
            </div>`;
        });
    }

    function renderReferrals(items) {
        const list = document.getElementById('admin-referrals-list');
        list.innerHTML = '';
        
        items.sort((a, b) => b.createdAt - a.createdAt); // newest first

        if (items.length === 0) {
            list.innerHTML = '<p class="text-slate-400 text-sm italic">No referrals found.</p>';
            return;
        }

        items.forEach(item => {
            const date = new Date(item.createdAt).toLocaleDateString();
            list.innerHTML += `
            <div class="p-4 bg-white shadow-sm border border-slate-200 rounded-xl border border-slate-200">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-brand-600 text-xs font-semibold uppercase tracking-widest px-2 py-1 bg-brand-500/10 rounded-md">Expected: ${item.friendName}</span>
                    <span class="text-slate-400 text-xs">${date}</span>
                </div>
                <div class="text-sm">
                    <p class="text-slate-900"><span class="text-slate-400 text-xs uppercase mr-1">Referred By:</span> ${item.referrerName}</p>
                    <p class="text-slate-500 mb-2"><i class="fas fa-phone text-xs mr-1 opacity-50"></i> ${item.referrerPhone}</p>
                    <p class="text-slate-900"><span class="text-slate-400 text-xs uppercase mr-1">Friend's Phone:</span> ${item.friendPhone || 'N/A'}</p>
                </div>
            </div>`;
        });
    }

    // ═════════════════════════════════════
    // LOCAL STORAGE MODE
    // ═════════════════════════════════════
    function getLocalConfig() {
        const stored = localStorage.getItem('shanta_config');
        return stored ? JSON.parse(stored) : { ...DEFAULTS.config };
    }
    function setLocalConfig(data) {
        localStorage.setItem('shanta_config', JSON.stringify(data));
    }
    function getLocalPortfolio() {
        const stored = localStorage.getItem('shanta_portfolio');
        return stored ? JSON.parse(stored) : [...DEFAULTS.portfolio];
    }
    function setLocalPortfolio(items) {
        localStorage.setItem('shanta_portfolio', JSON.stringify(items));
    }
    function getLocalReferrals() {
        const stored = localStorage.getItem('shanta_referrals');
        return stored ? JSON.parse(stored) : [];
    }

    function initLocalData() {
        applyConfig(getLocalConfig());
        renderPortfolio(getLocalPortfolio());
        renderReferrals(getLocalReferrals());
    }

    // ═════════════════════════════════════
    // FIREBASE LIVE MODE
    // ═════════════════════════════════════
    function initLiveData() {
        const fb = window._fb;
        const configDoc = fb.doc(fb.db, 'artifacts', fb.appId, 'public', 'data', 'siteConfig', 'main');
        const portfolioCol = fb.collection(fb.db, 'artifacts', fb.appId, 'public', 'data', 'portfolio');

        fb.onSnapshot(configDoc, (snap) => {
            if (snap.exists()) {
                applyConfig(snap.data());
            } else {
                fb.setDoc(configDoc, DEFAULTS.config);
            }
        });

        fb.onSnapshot(portfolioCol, (snap) => {
            if (snap.empty) {
                DEFAULTS.portfolio.forEach(item => fb.addDoc(portfolioCol, { imageUrl: item.imageUrl, title: item.title, location: item.location, createdAt: Date.now() }));
                return;
            }
            const items = [];
            snap.forEach(d => items.push({ id: d.id, ...d.data() }));
            renderPortfolio(items);
        });

        const referralsCol = fb.collection(fb.db, 'artifacts', fb.appId, 'public', 'data', 'referrals');
        fb.onSnapshot(referralsCol, (snap) => {
            const items = [];
            snap.forEach(d => items.push({ id: d.id, ...d.data() }));
            renderReferrals(items);
        });
    }

    // ═════════════════════════════════════
    // ADMIN OPERATIONS
    // ═════════════════════════════════════
    // Delete portfolio item
    window.confirmDelete = async (id, btn) => {
        if (btn.dataset.confirm === 'true') {
            if (useFirebase) {
                const fb = window._fb;
                await fb.deleteDoc(fb.doc(fb.db, 'artifacts', fb.appId, 'public', 'data', 'portfolio', id));
            } else {
                let items = getLocalPortfolio().filter(i => i.id !== id);
                setLocalPortfolio(items);
                renderPortfolio(items);
            }
        } else {
            btn.dataset.confirm = 'true';
            btn.innerHTML = '<i class="fas fa-check text-sm"></i>';
            btn.classList.add('!bg-orange-500');
            setTimeout(() => {
                btn.dataset.confirm = 'false';
                btn.innerHTML = '<i class="fas fa-trash-alt text-sm"></i>';
                btn.classList.remove('!bg-orange-500');
            }, 3000);
        }
    };

    // ── Admin UI Logic ───
    const loginModal = document.getElementById('admin-login-modal');
    const dashboard = document.getElementById('admin-dashboard-panel');

    document.getElementById('open-admin-btn').addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('hidden');
        loginModal.classList.add('flex');
        setTimeout(() => document.getElementById('admin-pin').focus(), 100);
    });

    document.getElementById('close-login-btn').addEventListener('click', () => {
        loginModal.classList.add('hidden');
        loginModal.classList.remove('flex');
        document.getElementById('login-error').classList.add('hidden');
        document.getElementById('admin-pin').value = '';
    });

    document.getElementById('admin-pin').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('login-submit-btn').click();
    });

    document.getElementById('login-submit-btn').addEventListener('click', () => {
        const pin = document.getElementById('admin-pin').value;
        if (pin === '8533') {
            window.isAdminAuthed = true;
            loginModal.classList.add('hidden');
            loginModal.classList.remove('flex');
            dashboard.classList.remove('translate-x-full');
            document.querySelectorAll('.admin-only-btn').forEach(b => { b.classList.remove('hidden'); b.classList.add('flex'); });
            document.getElementById('admin-pin').value = '';
        } else {
            document.getElementById('login-error').classList.remove('hidden');
            document.getElementById('admin-pin').value = '';
            document.getElementById('admin-pin').focus();
        }
    });

    document.getElementById('close-dashboard-btn').addEventListener('click', () => {
        dashboard.classList.add('translate-x-full');
    });

    // Save offers
        document.getElementById('save-offers-btn').addEventListener('click', async () => {
        const price = document.getElementById('admin-input-price').value;
        const guarantee = document.getElementById('admin-input-guarantee').value;
        const terms = document.getElementById('admin-input-terms').value;
        
        const componentRates = {
            standard: {
                essential: parseInt(document.getElementById('rate-std-ess').value) || 700,
                premium: parseInt(document.getElementById('rate-std-prem').value) || 1000,
                luxury: parseInt(document.getElementById('rate-std-lux').value) || 1200
            },
            kitchen: {
                essential: parseInt(document.getElementById('rate-kit-ess').value) || 1200,
                premium: parseInt(document.getElementById('rate-kit-prem').value) || 1500,
                luxury: parseInt(document.getElementById('rate-kit-lux').value) || 1800
            },
            kitchenLoft: {
                essential: parseInt(document.getElementById('rate-kitloft-ess').value) || 800,
                premium: parseInt(document.getElementById('rate-kitloft-prem').value) || 1100,
                luxury: parseInt(document.getElementById('rate-kitloft-lux').value) || 1500
            },
            bedroomLoft: {
                essential: parseInt(document.getElementById('rate-bedloft-ess').value) || 550,
                premium: parseInt(document.getElementById('rate-bedloft-prem').value) || 800,
                luxury: parseInt(document.getElementById('rate-bedloft-lux').value) || 1000
            }
        };
        
        const data = { price, guarantee, terms, componentRates };

        if (useFirebase) {
            const fb = window._fb;
            await fb.setDoc(fb.doc(fb.db, 'artifacts', fb.appId, 'public', 'data', 'siteConfig', 'main'), data);
        } else {
            setLocalConfig(data);
            applyConfig(data);
        }

        const msg = document.getElementById('save-offers-success');
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 3000);
    });

    // Add portfolio item (ImgBB Bulk Upload)
    document.getElementById('add-portfolio-btn').addEventListener('click', async () => {
        const fileInput = document.getElementById('admin-input-files');
        const title = document.getElementById('admin-input-title').value.trim();
        const loc = document.getElementById('admin-input-location').value.trim();
        const btn = document.getElementById('add-portfolio-btn');
        const status = document.getElementById('upload-status-container');

        if (fileInput.files.length === 0 || !title) {
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i> Images & Title Required';
            btn.classList.replace('bg-brand-500', 'bg-red-500');
            setTimeout(() => { btn.innerHTML = orig; btn.classList.replace('bg-red-500', 'bg-brand-500'); }, 2500);
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
        status.classList.remove('hidden');
        
        const files = Array.from(fileInput.files);
        let successCount = 0;
        
        for (let i = 0; i < files.length; i++) {
            status.textContent = 'Uploading image ' + (i + 1) + ' of ' + files.length + '...';
            const file = files[i];
            
            const formData = new FormData();
            formData.append('image', file);
            
            try {
                const res = await fetch('https://api.imgbb.com/1/upload?key=5b350073a427b815146376e7993e6cd7', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                
                if (data && data.success) {
                    const imgUrl = data.data.url;
                    
                    if (useFirebase) {
                        const fb = window._fb;
                        await fb.addDoc(fb.collection(fb.db, 'artifacts', fb.appId, 'public', 'data', 'portfolio'), {
                            imageUrl: imgUrl, title, location: loc || 'South India', createdAt: Date.now() + i
                        });
                    } else {
                        const items = getLocalPortfolio();
                        items.push({ id: 'p' + (Date.now() + i), imageUrl: imgUrl, title, location: loc || 'South India', createdAt: Date.now() + i });
                        setLocalPortfolio(items);
                        renderPortfolio(items);
                    }
                    successCount++;
                }
            } catch(e) {
                console.error("Upload failed for file", file.name, e);
            }
        }

        status.textContent = 'Successfully uploaded ' + successCount + ' images!';
        status.classList.replace('text-brand-600', 'text-green-400');
        status.classList.replace('bg-brand-500/10', 'bg-green-500/10');
        status.classList.replace('border-brand-500/20', 'border-green-500/20');

        setTimeout(() => {
            status.classList.add('hidden');
            status.classList.replace('text-green-400', 'text-brand-600');
            status.classList.replace('bg-green-500/10', 'bg-brand-500/10');
            status.classList.replace('border-green-500/20', 'border-brand-500/20');
            
            fileInput.value = '';
            document.getElementById('admin-file-dropzone-text').textContent = 'Drag files here or click to upload';
            document.getElementById('admin-input-title').value = '';
            document.getElementById('admin-input-location').value = '';
            
            btn.innerHTML = '<i class="fas fa-plus mr-2"></i> Add to Portfolio';
            btn.disabled = false;
        }, 3000);
    });

    // ── Init ───
    initFirebase();