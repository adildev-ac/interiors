const fs = require('fs');

const file = 'c:\\Users\\adilm\\OneDrive\\Desktop\\Subtitles\\.PROJECT\\Interiors\\index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Inject Admin UI
const adminRatesUI = `
            <!-- ── Dynamic Quote Rates ── -->
            <div class="glass rounded-2xl p-6">
                <h3 class="text-lg font-serif text-white mb-5 flex items-center gap-2"><i class="fas fa-calculator text-brand-400 text-sm"></i> Quote Calculator Rates</h3>
                <p class="text-xs text-gray-500 mb-5 leading-relaxed">Update the per-square-foot pricing for the estimator. Changes here reflect instantly on the live website.</p>
                
                <div class="space-y-4">
                    <!-- Standard Rooms -->
                    <div class="bg-white/5 border border-white/10 rounded-xl p-4">
                        <label class="block text-xs font-medium text-brand-400 uppercase tracking-widest mb-3">Standard Rooms</label>
                        <div class="grid grid-cols-3 gap-2">
                            <div>
                                <label class="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Essential</label>
                                <input type="number" id="rate-std-ess" class="w-full bg-dark border border-white/10 rounded-lg p-2 text-xs text-white focus:border-brand-400 focus:outline-none" placeholder="700">
                            </div>
                            <div>
                                <label class="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Premium</label>
                                <input type="number" id="rate-std-prem" class="w-full bg-dark border border-white/10 rounded-lg p-2 text-xs text-white focus:border-brand-400 focus:outline-none" placeholder="1000">
                            </div>
                            <div>
                                <label class="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Luxury</label>
                                <input type="number" id="rate-std-lux" class="w-full bg-dark border border-white/10 rounded-lg p-2 text-xs text-white focus:border-brand-400 focus:outline-none" placeholder="1200">
                            </div>
                        </div>
                    </div>

                    <!-- Kitchen -->
                    <div class="bg-white/5 border border-white/10 rounded-xl p-4">
                        <label class="block text-xs font-medium text-brand-400 uppercase tracking-widest mb-3">Kitchen</label>
                        <div class="grid grid-cols-3 gap-2">
                            <div>
                                <label class="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Essential</label>
                                <input type="number" id="rate-kit-ess" class="w-full bg-dark border border-white/10 rounded-lg p-2 text-xs text-white focus:border-brand-400 focus:outline-none" placeholder="1200">
                            </div>
                            <div>
                                <label class="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Premium</label>
                                <input type="number" id="rate-kit-prem" class="w-full bg-dark border border-white/10 rounded-lg p-2 text-xs text-white focus:border-brand-400 focus:outline-none" placeholder="1500">
                            </div>
                            <div>
                                <label class="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Luxury</label>
                                <input type="number" id="rate-kit-lux" class="w-full bg-dark border border-white/10 rounded-lg p-2 text-xs text-white focus:border-brand-400 focus:outline-none" placeholder="1800">
                            </div>
                        </div>
                    </div>

                    <!-- Kitchen Loft -->
                    <div class="bg-white/5 border border-white/10 rounded-xl p-4">
                        <label class="block text-xs font-medium text-brand-400 uppercase tracking-widest mb-3">Kitchen Loft</label>
                        <div class="grid grid-cols-3 gap-2">
                            <div>
                                <label class="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Essential</label>
                                <input type="number" id="rate-kitloft-ess" class="w-full bg-dark border border-white/10 rounded-lg p-2 text-xs text-white focus:border-brand-400 focus:outline-none" placeholder="800">
                            </div>
                            <div>
                                <label class="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Premium</label>
                                <input type="number" id="rate-kitloft-prem" class="w-full bg-dark border border-white/10 rounded-lg p-2 text-xs text-white focus:border-brand-400 focus:outline-none" placeholder="1100">
                            </div>
                            <div>
                                <label class="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Luxury</label>
                                <input type="number" id="rate-kitloft-lux" class="w-full bg-dark border border-white/10 rounded-lg p-2 text-xs text-white focus:border-brand-400 focus:outline-none" placeholder="1500">
                            </div>
                        </div>
                    </div>

                    <!-- Bedroom Loft -->
                    <div class="bg-white/5 border border-white/10 rounded-xl p-4">
                        <label class="block text-xs font-medium text-brand-400 uppercase tracking-widest mb-3">Bedroom Loft</label>
                        <div class="grid grid-cols-3 gap-2">
                            <div>
                                <label class="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Essential</label>
                                <input type="number" id="rate-bedloft-ess" class="w-full bg-dark border border-white/10 rounded-lg p-2 text-xs text-white focus:border-brand-400 focus:outline-none" placeholder="550">
                            </div>
                            <div>
                                <label class="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Premium</label>
                                <input type="number" id="rate-bedloft-prem" class="w-full bg-dark border border-white/10 rounded-lg p-2 text-xs text-white focus:border-brand-400 focus:outline-none" placeholder="800">
                            </div>
                            <div>
                                <label class="block text-[9px] text-gray-500 uppercase tracking-wider mb-1">Luxury</label>
                                <input type="number" id="rate-bedloft-lux" class="w-full bg-dark border border-white/10 rounded-lg p-2 text-xs text-white focus:border-brand-400 focus:outline-none" placeholder="1000">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
`;

content = content.replace('<!-- ── Add Portfolio Item ── -->', adminRatesUI + '\n            <!-- ── Add Portfolio Item ── -->');


// 2. Change const to let for COMPONENT_RATES
content = content.replace('const COMPONENT_RATES = {', 'let COMPONENT_RATES = {');


// 3. Update applyConfig
const newApplyConfig = `    // ─── Update UI ───
    function applyConfig(data) {
        document.getElementById('hero-price-display').textContent = \`Starts at ₹\${data.price}/sqft\`;
        document.getElementById('hero-guarantee-display').textContent = data.guarantee;
        document.getElementById('banner-price-display').textContent = \`₹\${data.price}/sqft\`;
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
    }`;

const oldApplyConfigRegex = /\/\/ ─── Update UI ───[\s\S]*?function applyConfig\(data\) \{[\s\S]*?document\.getElementById\('admin-input-terms'\)\.value = data\.terms \|\| '';\s*\}/;
content = content.replace(oldApplyConfigRegex, newApplyConfig);

// 4. Update Save Admin Config
const newSaveLogic = `    document.getElementById('save-offers-btn').addEventListener('click', async () => {
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
        }`;

const oldSaveLogicRegex = /document\.getElementById\('save-offers-btn'\)\.addEventListener\('click', async \(\) => \{[\s\S]*?const data = \{ price, guarantee, terms \};[\s\S]*?if \(useFirebase\) \{[\s\S]*?await fb\.setDoc\(fb\.doc\(fb\.db, 'artifacts', fb\.appId, 'public', 'data', 'siteConfig', 'main'\), data\);\s*\} else \{\s*setLocalConfig\(data\);\s*applyConfig\(data\);\s*\}/;

content = content.replace(oldSaveLogicRegex, newSaveLogic);

fs.writeFileSync(file, content);
console.log('Successfully injected Dynamic Admin Rates module!');
