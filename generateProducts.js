const fs = require('fs');
const file = 'c:\\Users\\adilm\\OneDrive\\Desktop\\Subtitles\\.PROJECT\\Interiors\\products.html';

const htmlContent = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products | Shanta Interiors</title>
    <meta name="description" content="Browse our exclusive collection of premium furniture and interior products. Available with 3D AR viewing.">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- Google Model Viewer for 3D/AR -->
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>

    <!-- Tailwind Configuration -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Outfit', 'sans-serif'],
                        serif: ['Playfair Display', 'serif'],
                    },
                    colors: {
                        brand: {
                            50:  '#faf8f5',
                            100: '#f3ede5',
                            200: '#e6daca',
                            300: '#d4c1a8',
                            400: '#c0a484',
                            500: '#a8876a',
                            600: '#96735a',
                            700: '#7d5e4b',
                            800: '#664d40',
                            900: '#544136',
                            950: '#2d211b',
                        },
                        dark:   '#121212',
                        carbon: '#1a1a1a',
                        ash:    '#242424',
                    }
                }
            }
        }
    </script>

    <style>
        /* ─── Global ─── */
        ::selection { background: #a8876a; color: #fff; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #121212; }
        ::-webkit-scrollbar-thumb { background: #a8876a; border-radius: 99px; }

        /* ─── Decorative Divider ─── */
        .section-divider {
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #a8876a, #c0a484);
            border-radius: 99px;
        }

        /* ─── Reveal Animations ─── */
        .reveal { opacity: 0; transform: translateY(35px); transition: opacity 0.9s cubic-bezier(.22,1,.36,1), transform 0.9s cubic-bezier(.22,1,.36,1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        
        /* Model Viewer Styles */
        model-viewer {
            width: 100%;
            height: 350px;
            background-color: #242424;
            --poster-color: transparent;
        }
    </style>
</head>

<body class="font-sans text-gray-400 bg-carbon antialiased">

    <!-- ═══════════════════════════════════════════
         NAVIGATION 
    ═══════════════════════════════════════════ -->
    <header class="w-full z-50 py-5 text-white bg-dark border-b border-white/5">
        <div class="container mx-auto px-6 md:px-12 flex justify-between items-center">
            <a href="index.html" class="logo-text text-2xl font-serif font-bold tracking-wider transition-colors duration-300 flex items-center gap-3">
                <img src="INTERIORS.png" alt="Shantha Interiors Logo" class="h-10 w-auto">
                <div>
                    SHANTA <span class="font-light text-brand-400">INTERIORS</span>
                </div>
            </a>

            <nav class="hidden lg:flex space-x-8 items-center">
                <a href="index.html" class="nav-link text-xs uppercase tracking-[0.2em] font-medium hover:text-brand-400 transition-colors duration-300">Home</a>
                <a href="products.html" class="nav-link text-xs uppercase tracking-[0.2em] font-medium hover:text-brand-400 transition-colors duration-300 text-brand-400">Shop</a>
                <a href="index.html#contact" class="group relative px-7 py-2.5 border border-brand-500 text-brand-400 rounded-full text-xs uppercase tracking-[0.2em] font-semibold overflow-hidden transition-all duration-500 hover:text-white">
                    <span class="absolute inset-0 bg-brand-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
                    <span class="relative z-10">Get a Quote</span>
                </a>
            </nav>
            
            <a href="index.html" class="lg:hidden text-brand-400 text-sm uppercase tracking-widest font-medium">Home</a>
        </div>
    </header>


    <!-- ═══════════════════════════════════════════
         PRODUCTS HEADER
    ═══════════════════════════════════════════ -->
    <section class="py-20 bg-dark relative overflow-hidden">
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div class="container mx-auto px-6 md:px-12 text-center relative z-10">
            <p class="text-brand-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4 reveal">Premium Furniture</p>
            <div class="section-divider mx-auto mb-6 reveal"></div>
            <h1 class="text-5xl md:text-6xl font-serif text-white mb-6 reveal">The Showroom</h1>
            <p class="text-gray-400 max-w-2xl mx-auto reveal">Curated furniture pieces designed for elegant living. Experience select products in immersive 3D/AR.</p>
        </div>
    </section>


    <!-- ═══════════════════════════════════════════
         PRODUCTS GRID
    ═══════════════════════════════════════════ -->
    <section class="py-16 bg-carbon relative overflow-hidden min-h-[50vh]">
        <div class="container mx-auto px-6 md:px-12">
            <!-- Products Grid -->
            <div id="products-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Populated by JS -->
            </div>
            
            <!-- Loading State -->
            <div id="loading-spinner" class="flex justify-center py-20 text-brand-500">
                <i class="fas fa-spinner fa-spin text-4xl"></i>
            </div>
        </div>
    </section>


    <!-- ═══════════════════════════════════════════
         FOOTER
    ═══════════════════════════════════════════ -->
    <footer class="bg-dark text-gray-500 py-16 border-t border-white/5">
        <div class="container mx-auto px-6 md:px-12 text-center flex justify-center">
            <p>&copy; 2026 Shantha Interiors Bangalore. All rights reserved.</p>
        </div>
    </footer>


    <!-- ═══════════════════════════════════════════
         SCRIPTS & FIREBASE
    ═══════════════════════════════════════════ -->
    <script>
    // Scroll Reveal
    document.addEventListener('DOMContentLoaded', () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(r => r.classList.add('active'));
    });

    // WhatsApp Inquiry logic
    window.buyOnWhatsApp = function(title, price) {
        const phone = "919886558663";
        const message = "Hi Shantha Interiors, I'm interested in buying the " + title + " listed for ₹" + price + ". Please let me know how to proceed!";
        const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
        window.open(url, "_blank");
    }
    </script>

    <script type="module">
    const DEFAULTS = [
        { 
            id: 'demo1', 
            imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop', 
            model3d: '', 
            title: 'Modern Leather Sofa', 
            price: '45000', 
            createdAt: 1 
        },
        { 
            id: 'demo2', 
            imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800&auto=format&fit=crop', 
            model3d: '', 
            title: 'Nordic Oak Dining Chair', 
            price: '8500', 
            createdAt: 2 
        }
    ];

    function renderProducts(items) {
        document.getElementById('loading-spinner').classList.add('hidden');
        const grid = document.getElementById('products-grid');
        grid.innerHTML = '';

        items.sort((a, b) => b.createdAt - a.createdAt); // Newest first

        if(items.length === 0) {
            grid.innerHTML = '<p class="text-center col-span-full text-gray-500 py-10">No products available at the moment.</p>';
            return;
        }

        items.forEach((item, i) => {
            const delay = (i % 6) * 100;
            const priceFormatted = Number(item.price).toLocaleString('en-IN');
            
            let mediaContent = '';
            
            // If they provided a 3D model GLB URL, render the 3D Viewer
            if (item.model3d && (item.model3d.endsWith('.glb') || item.model3d.endsWith('.gltf'))) {
                mediaContent = \`
                    <model-viewer 
                        src="\${item.model3d}" 
                        poster="\${item.imageUrl}"
                        alt="\${item.title}" 
                        auto-rotate 
                        camera-controls
                        ar 
                        ar-modes="webxr scene-viewer quick-look"
                        shadow-intensity="1"
                        class="rounded-t-2xl object-cover w-full">
                        
                        <button slot="ar-button" class="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-white/20 transition-colors border border-white/20 shadow-lg flex items-center gap-2">
                            <i class="fas fa-cube"></i> View in your space
                        </button>
                    </model-viewer>
                \`;
            } 
            // Otherwise, render a standard Image
            else {
                mediaContent = \`<img src="\${item.imageUrl}" alt="\${item.title}" class="w-full h-[350px] object-cover rounded-t-2xl transition-transform duration-700 hover:scale-105">\`;
            }

            grid.innerHTML += \`
            <div class="bg-ash rounded-2xl overflow-hidden shadow-2xl reveal active flex flex-col" style="transition-delay: \${delay}ms;">
                <div class="relative w-full h-[350px] overflow-hidden bg-carbon/50 flex-shrink-0">
                    \${mediaContent}
                </div>
                
                <div class="p-6 flex-grow flex flex-col justify-between border-t border-white/5">
                    <div class="mb-6">
                        <div class="flex justify-between items-start gap-4 mb-2">
                            <h3 class="text-xl font-serif text-white">\${item.title}</h3>
                            <span class="text-brand-400 font-semibold whitespace-nowrap">₹\${priceFormatted}</span>
                        </div>
                    </div>
                    
                    <button onclick="buyOnWhatsApp('\${item.title.replace(/'/g, "\\'")}', '\${priceFormatted}')" class="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 py-3.5 rounded-xl uppercase tracking-widest text-xs font-semibold transition-colors flex justify-center items-center gap-2">
                        <i class="fab fa-whatsapp text-lg"></i> Inquire via WhatsApp
                    </button>
                </div>
            </div>\`;
        });
    }

    // ─── Data Loading Logic ───
    async function init() {
        try {
            const firebaseConfig = {
                apiKey: "AIzaSyDr7HTFfrH9ysDVAg2WlR6RkMdst0mMdTM",
                authDomain: "interiors-56740.firebaseapp.com",
                projectId: "interiors-56740",
                storageBucket: "interiors-56740.firebasestorage.app",
                messagingSenderId: "304781491747",
                appId: "1:304781491747:web:ef1efb994267e102197b96",
                measurementId: "G-PFNV109SP5"
            };

            const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
            const { getAuth, signInAnonymously } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
            const { getFirestore, collection, onSnapshot } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");

            const app = initializeApp(firebaseConfig);
            const auth = getAuth(app);
            const db = getFirestore(app);
            const appId = 'shanta-app';

            await signInAnonymously(auth);
            
            const productsCol = collection(db, 'artifacts', appId, 'public', 'data', 'products');
            onSnapshot(productsCol, (snap) => {
                if (snap.empty) {
                    renderProducts(DEFAULTS);
                } else {
                    const items = [];
                    snap.forEach(d => items.push({ id: d.id, ...d.data() }));
                    renderProducts(items);
                }
            });

        } catch (e) {
            console.log('Firebase not available, using defaults.', e.message);
            renderProducts(DEFAULTS);
        }
    }

    init();
    </script>
</body>
</html>
`;

fs.writeFileSync(file, htmlContent);
console.log("Successfully created products.html");
