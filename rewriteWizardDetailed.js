const fs = require('fs');

const file = 'c:\\Users\\adilm\\OneDrive\\Desktop\\Subtitles\\.PROJECT\\Interiors\\index.html';
let content = fs.readFileSync(file, 'utf8');

// The New Quote Modal HTML
const newQuoteModalHTML = `    <div id="quote-modal" class="fixed inset-0 bg-dark/95 backdrop-blur-xl z-[100] hidden flex-col items-center justify-center">
        <div class="glass rounded-3xl p-6 md:p-8 max-w-2xl w-full mx-6 relative border-white/10 mt-10 md:mt-0 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button type="button" class="absolute top-5 right-5 text-gray-400 hover:text-white text-xl transition-colors z-10" onclick="closeQuoteModal()"><i class="fas fa-times"></i></button>
            
            <div class="text-center mb-6">
                <h3 class="text-2xl font-serif text-white mb-2">Get your free estimate</h3>
                
                <!-- Progress Bar -->
                <div class="flex justify-between items-center max-w-[200px] mx-auto mt-6 relative">
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0"></div>
                    <div id="quote-progress" class="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-1 bg-brand-500 rounded-full z-0 transition-all duration-500"></div>
                    
                    <div class="step-dot w-6 h-6 rounded-full bg-brand-500 border-4 border-dark relative z-10 flex items-center justify-center text-[10px] text-white font-bold" data-step="1">1</div>
                    <div class="step-dot w-6 h-6 rounded-full bg-white/20 border-4 border-dark relative z-10 flex items-center justify-center text-[10px] text-gray-400 font-bold" data-step="2">2</div>
                    <div class="step-dot w-6 h-6 rounded-full bg-white/20 border-4 border-dark relative z-10 flex items-center justify-center text-[10px] text-gray-400 font-bold" data-step="3">3</div>
                </div>
                <div class="flex justify-between max-w-[240px] mx-auto mt-2 text-[9px] uppercase tracking-widest text-gray-500">
                    <span class="w-1/3 text-center">Layout</span>
                    <span class="w-1/3 text-center">Calculator</span>
                    <span class="w-1/3 text-center">Review</span>
                </div>
            </div>

            <form id="quote-form" class="w-full">
                <!-- Web3Forms Config -->
                <input type="hidden" name="access_key" value="48e4969d-2176-4749-9e2c-8095a97c0bc8">
                <input type="hidden" name="subject" value="New Quote Request — Shantha Interiors">
                <input type="hidden" name="from_name" value="Shantha Interiors Website">
                <input type="checkbox" name="botcheck" class="hidden" style="display:none">
                
                <input type="hidden" name="System_Calculated_Estimate" id="hidden-estimate">
                <input type="hidden" name="Itemized_Breakdown" id="hidden-breakdown">

                <!-- STEP 1: Layout -->
                <div id="quote-step-1" class="step-content animate-fade-up">
                    <h4 class="text-white text-lg font-medium mb-4 text-center">Select your floorplan</h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <label class="cursor-pointer group">
                            <input type="radio" name="Floorplan" value="1 BHK" class="peer sr-only" required>
                            <div class="bg-white/5 border border-white/10 rounded-xl p-4 text-center peer-checked:bg-brand-500/20 peer-checked:border-brand-500 transition-all hover:border-brand-400/50">
                                <i class="fas fa-home text-2xl text-gray-400 group-hover:text-brand-300 peer-checked:text-brand-400 mb-2 transition-colors"></i>
                                <div class="text-sm text-gray-200 font-medium">1 BHK</div>
                            </div>
                        </label>
                        <label class="cursor-pointer group">
                            <input type="radio" name="Floorplan" value="2 BHK" class="peer sr-only">
                            <div class="bg-white/5 border border-white/10 rounded-xl p-4 text-center peer-checked:bg-brand-500/20 peer-checked:border-brand-500 transition-all hover:border-brand-400/50">
                                <i class="fas fa-building text-2xl text-gray-400 group-hover:text-brand-300 peer-checked:text-brand-400 mb-2 transition-colors"></i>
                                <div class="text-sm text-gray-200 font-medium">2 BHK</div>
                            </div>
                        </label>
                        <label class="cursor-pointer group">
                            <input type="radio" name="Floorplan" value="3 BHK" class="peer sr-only">
                            <div class="bg-white/5 border border-white/10 rounded-xl p-4 text-center peer-checked:bg-brand-500/20 peer-checked:border-brand-500 transition-all hover:border-brand-400/50">
                                <i class="fas fa-city text-2xl text-gray-400 group-hover:text-brand-300 peer-checked:text-brand-400 mb-2 transition-colors"></i>
                                <div class="text-sm text-gray-200 font-medium">3 BHK</div>
                            </div>
                        </label>
                        <label class="cursor-pointer group">
                            <input type="radio" name="Floorplan" value="4+ BHK" class="peer sr-only">
                            <div class="bg-white/5 border border-white/10 rounded-xl p-4 text-center peer-checked:bg-brand-500/20 peer-checked:border-brand-500 transition-all hover:border-brand-400/50">
                                <i class="fas fa-hotel text-2xl text-gray-400 group-hover:text-brand-300 peer-checked:text-brand-400 mb-2 transition-colors"></i>
                                <div class="text-sm text-gray-200 font-medium">4+ BHK</div>
                            </div>
                        </label>
                    </div>
                    
                    <button type="button" onclick="goToQuoteStep(2)" class="w-full bg-brand-500 text-white py-4 mt-8 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-600 transition-colors rounded-xl shadow-lg">
                        Next Step <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>

                <!-- STEP 2: Calculator -->
                <div id="quote-step-2" class="step-content hidden animate-fade-up">
                    <div class="flex justify-between items-end mb-4">
                        <div>
                            <h4 class="text-white text-lg font-medium">Customize components</h4>
                            <p class="text-xs text-gray-400">Mix & match packages per room.</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Set All To</p>
                            <div class="flex bg-white/5 rounded-lg border border-white/10 p-1">
                                <button type="button" onclick="setGlobalPackage('essential')" class="px-2 py-1 text-[10px] text-gray-400 hover:text-white uppercase tracking-wider rounded">Ess.</button>
                                <button type="button" onclick="setGlobalPackage('premium')" class="px-2 py-1 text-[10px] text-brand-300 bg-brand-500/20 uppercase tracking-wider rounded font-medium">Prem.</button>
                                <button type="button" onclick="setGlobalPackage('luxury')" class="px-2 py-1 text-[10px] text-gray-400 hover:text-white uppercase tracking-wider rounded">Lux.</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Dynamic List Container -->
                    <div id="quote-components-list" class="space-y-3 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
                        <!-- Populated by JS -->
                    </div>

                    <div class="flex gap-3 pt-6 mt-4 border-t border-white/10">
                        <button type="button" onclick="goToQuoteStep(1)" class="w-1/3 border border-white/20 text-gray-300 py-4 uppercase tracking-wider text-xs font-semibold hover:bg-white/5 transition-colors rounded-xl">Back</button>
                        <button type="button" onclick="goToQuoteStep(3)" class="w-2/3 bg-brand-500 text-white py-4 flex items-center justify-between px-6 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-600 transition-colors rounded-xl shadow-lg">
                            <span>Review</span>
                            <span id="step2-live-total" class="font-bold bg-white/20 px-2 py-1 rounded text-[10px]">₹0</span>
                        </button>
                    </div>
                </div>

                <!-- STEP 3: Review -->
                <div id="quote-step-3" class="step-content hidden animate-fade-up">
                    <h4 class="text-white text-lg font-medium mb-4 text-center">Your Estimate is Ready!</h4>
                    
                    <div class="mb-6 bg-brand-500/10 border border-brand-500/20 rounded-xl p-5 relative overflow-hidden text-left">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-[40px] rounded-full"></div>
                        
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-xs text-gray-400 font-medium">Grand Total</span>
                            <span id="quote-grand-total" class="text-sm text-white font-semibold">₹0</span>
                        </div>
                        <div class="flex justify-between items-center mb-3 pb-3 border-b border-brand-500/20">
                            <span class="text-xs text-gray-400 font-medium">+ GST (18%)</span>
                            <span id="quote-gst" class="text-sm text-white font-semibold">₹0</span>
                        </div>
                        <div class="flex justify-between items-end">
                            <span class="text-[10px] text-brand-400 uppercase tracking-widest font-bold">Final Amount</span>
                            <span id="quote-final-amount" class="text-3xl font-serif text-white">₹0</span>
                        </div>
                        <p class="text-[9px] text-gray-400 mt-4 leading-relaxed italic">*Note: This is an initial estimate and not final. The total amount might increase or decrease based on the final site assessment and specific material choices. (All totals include 18% GST).</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1">Your Name</label>
                            <input type="text" name="Name" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors" placeholder="John Doe">
                        </div>
                        <div>
                            <label class="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1">Phone Number</label>
                            <input type="tel" name="Phone" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors" placeholder="+91 98865 58663">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1">Email Address</label>
                            <input type="email" name="Email" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors" placeholder="john@example.com">
                        </div>
                        <div class="md:col-span-2 flex gap-4">
                            <div class="w-1/2">
                                <label class="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1">Purpose</label>
                                <select name="Purpose" required class="w-full bg-dark border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-400 focus:outline-none">
                                    <option value="Move In">Move In</option>
                                    <option value="Rent Out">Rent Out</option>
                                    <option value="Renovate">Renovate</option>
                                </select>
                            </div>
                            <div class="w-1/2">
                                <label class="block text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1">Location</label>
                                <select name="Location" required class="w-full bg-dark border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-400 focus:outline-none">
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-3 pt-2">
                        <button type="button" onclick="goToQuoteStep(2)" class="w-1/3 border border-white/20 text-gray-300 py-4 uppercase tracking-wider text-xs font-semibold hover:bg-white/5 transition-colors rounded-xl">Back</button>
                        <button type="submit" id="quote-submit-btn" class="w-2/3 bg-brand-500 text-white py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-600 transition-colors rounded-xl relative overflow-hidden shadow-lg">
                            <span class="relative z-10">Send me a copy</span>
                        </button>
                    </div>
                    
                    <div id="quote-success" class="hidden mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm text-center font-medium">
                        <i class="fas fa-check-circle mr-1"></i> Success! We'll reach out to you shortly.
                    </div>
                    <div id="quote-error" class="hidden mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm text-center">
                        <i class="fas fa-exclamation-circle mr-1"></i> Something went wrong.
                    </div>
                </div>
            </form>
        </div>
    </div>`;


// The new JS Logic
const newQuoteLogicJS = `    // ─── Quote Modal Logic (Component Estimator) ───
    const COMPONENT_RATES = {
        standard: { essential: 700, premium: 1000, luxury: 1200 },
        kitchen: { essential: 1200, premium: 1500, luxury: 1800 },
        kitchenLoft: { essential: 800, premium: 1100, luxury: 1500 }
    };

    const DEFAULT_COMPONENTS = [
        { id: 'kitchen', name: 'Kitchen', type: 'kitchen', defaultSqft: 100 },
        { id: 'kitchenLoft', name: 'Kitchen Loft', type: 'kitchenLoft', defaultSqft: 40 },
        { id: 'bed1', name: 'Bedroom 1', type: 'standard', defaultSqft: 100 },
        { id: 'bed2', name: 'Bedroom 2', type: 'standard', defaultSqft: 70 },
        { id: 'bed3', name: 'Bedroom 3', type: 'standard', defaultSqft: 70 },
        { id: 'bed4', name: 'Bedroom 4', type: 'standard', defaultSqft: 70 },
        { id: 'tvUnit', name: 'TV Unit', type: 'standard', defaultSqft: 49 },
        { id: 'poojaUnit', name: 'Pooja Unit', type: 'standard', defaultSqft: 21 },
        { id: 'shoeStand', name: 'Shoe Stand', type: 'standard', defaultSqft: 16 },
        { id: 'vanity', name: 'Vanity', type: 'standard', defaultSqft: 7.5 },
    ];

    let activeComponents = [];

    function openQuoteModal() {
        const m = document.getElementById('quote-modal');
        m.classList.remove('hidden');
        m.classList.add('flex');
        goToQuoteStep(1);
    }
    function closeQuoteModal() {
        const m = document.getElementById('quote-modal');
        m.classList.add('hidden');
        m.classList.remove('flex');
    }

    let currentQuoteStep = 1;

    function goToQuoteStep(step) {
        const form = document.getElementById('quote-form');
        
        // Validation
        if(step > 1 && currentQuoteStep === 1) {
            if(!form.querySelector('input[name="Floorplan"]:checked')) {
                return alert("Please select a Floorplan to continue.");
            }
            generateComponentsUI(form.querySelector('input[name="Floorplan"]:checked').value);
        }
        
        // Hide all
        document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
        const targetStepEl = document.getElementById('quote-step-' + step);
        if(targetStepEl) targetStepEl.classList.remove('hidden');
        
        // Update Progress
        currentQuoteStep = step;
        const progressWidth = ((step - 1) / 2) * 100;
        const progEl = document.getElementById('quote-progress');
        if(progEl) progEl.style.width = progressWidth + '%';
        
        document.querySelectorAll('.step-dot').forEach(dot => {
            const dotStep = parseInt(dot.dataset.step);
            if(dotStep <= step) {
                dot.classList.remove('bg-white/20', 'text-gray-400');
                dot.classList.add('bg-brand-500', 'text-white');
            } else {
                dot.classList.remove('bg-brand-500', 'text-white');
                dot.classList.add('bg-white/20', 'text-gray-400');
            }
        });
    }

    function generateComponentsUI(bhk) {
        const listEl = document.getElementById('quote-components-list');
        listEl.innerHTML = '';
        
        let bedsCount = 1;
        if (bhk === "2 BHK") bedsCount = 2;
        if (bhk === "3 BHK") bedsCount = 3;
        if (bhk === "4+ BHK") bedsCount = 4;

        activeComponents = DEFAULT_COMPONENTS.filter(item => {
            if (item.id === 'bed2' && bedsCount < 2) return false;
            if (item.id === 'bed3' && bedsCount < 3) return false;
            if (item.id === 'bed4' && bedsCount < 4) return false;
            return true;
        });

        activeComponents.forEach(comp => {
            const rowHTML = \`
                <div class="bg-dark/50 border border-white/10 rounded-xl p-4 component-row" data-id="\${comp.id}" data-type="\${comp.type}">
                    <div class="flex justify-between items-center mb-3">
                        <div>
                            <h5 class="text-white font-medium text-sm">\${comp.name}</h5>
                        </div>
                        <div class="flex items-center bg-white/5 rounded-lg border border-white/10">
                            <button type="button" class="px-3 py-1 text-gray-400 hover:text-white" onclick="updateCompSqft('\${comp.id}', -1)">-</button>
                            <input type="number" id="sqft-\${comp.id}" class="w-12 text-center bg-transparent text-white text-sm font-semibold outline-none comp-sqft-input" value="\${comp.defaultSqft}" step="0.5" onchange="calculateQuoteTotals()">
                            <button type="button" class="px-3 py-1 text-gray-400 hover:text-white" onclick="updateCompSqft('\${comp.id}', 1)">+</button>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <label class="flex-1 cursor-pointer">
                            <input type="radio" name="pkg-\${comp.id}" value="essential" class="peer sr-only pkg-radio" onchange="calculateQuoteTotals()">
                            <div class="text-center py-2 border border-white/10 rounded-lg text-[10px] text-gray-400 peer-checked:bg-brand-500 peer-checked:text-white peer-checked:border-brand-500 transition-all uppercase tracking-widest">Ess.</div>
                        </label>
                        <label class="flex-1 cursor-pointer">
                            <input type="radio" name="pkg-\${comp.id}" value="premium" class="peer sr-only pkg-radio" checked onchange="calculateQuoteTotals()">
                            <div class="text-center py-2 border border-white/10 rounded-lg text-[10px] text-gray-400 peer-checked:bg-brand-500 peer-checked:text-white peer-checked:border-brand-500 transition-all uppercase tracking-widest">Prem.</div>
                        </label>
                        <label class="flex-1 cursor-pointer">
                            <input type="radio" name="pkg-\${comp.id}" value="luxury" class="peer sr-only pkg-radio" onchange="calculateQuoteTotals()">
                            <div class="text-center py-2 border border-white/10 rounded-lg text-[10px] text-gray-400 peer-checked:bg-brand-500 peer-checked:text-white peer-checked:border-brand-500 transition-all uppercase tracking-widest">Lux.</div>
                        </label>
                    </div>
                </div>
            \`;
            listEl.insertAdjacentHTML('beforeend', rowHTML);
        });
        
        calculateQuoteTotals();
    }

    function updateCompSqft(id, amount) {
        const input = document.getElementById('sqft-' + id);
        let val = parseFloat(input.value) || 0;
        val += amount;
        if(val < 0) val = 0;
        input.value = val;
        calculateQuoteTotals();
    }

    function setGlobalPackage(pkgName) {
        // Highlight active global button
        const buttons = event.currentTarget.parentElement.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.classList.remove('text-brand-300', 'bg-brand-500/20', 'font-medium', 'border-brand-500');
            btn.classList.add('text-gray-400', 'border-transparent');
        });
        event.currentTarget.classList.add('text-brand-300', 'bg-brand-500/20', 'font-medium', 'border-brand-500');
        event.currentTarget.classList.remove('text-gray-400', 'border-transparent');

        // Apply to all active components
        activeComponents.forEach(comp => {
            const radio = document.querySelector(\`input[name="pkg-\${comp.id}"][value="\${pkgName}"]\`);
            if(radio) radio.checked = true;
        });
        calculateQuoteTotals();
    }

    function calculateQuoteTotals() {
        let grandTotal = 0;
        let breakdownTxt = "";

        activeComponents.forEach(comp => {
            const sqftInput = document.getElementById('sqft-' + comp.id);
            const sqft = parseFloat(sqftInput.value) || 0;
            const pkgRadio = document.querySelector(\`input[name="pkg-\${comp.id}"]:checked\`);
            
            if(sqft > 0 && pkgRadio) {
                const pkgValue = pkgRadio.value; // essential, premium, luxury
                const rate = COMPONENT_RATES[comp.type][pkgValue];
                const itemTotal = sqft * rate;
                grandTotal += itemTotal;
                
                breakdownTxt += \`- \${comp.name} (\${sqft} sqft): \${pkgValue} @ ₹\${rate} = ₹\${itemTotal.toLocaleString('en-IN')}\\n\`;
            }
        });

        const gst = grandTotal * 0.18;
        const finalAmount = grandTotal + gst;

        // Update UI
        document.getElementById('step2-live-total').textContent = "₹" + finalAmount.toLocaleString('en-IN', {maximumFractionDigits:0});
        
        document.getElementById('quote-grand-total').textContent = "₹" + grandTotal.toLocaleString('en-IN', {maximumFractionDigits:0});
        document.getElementById('quote-gst').textContent = "₹" + gst.toLocaleString('en-IN', {maximumFractionDigits:0});
        document.getElementById('quote-final-amount').textContent = "₹" + finalAmount.toLocaleString('en-IN', {maximumFractionDigits:0});

        // Hidden fields for email
        document.getElementById('hidden-estimate').value = "₹" + finalAmount.toLocaleString('en-IN', {maximumFractionDigits:0}) + " (Includes 18% GST)";
        document.getElementById('hidden-breakdown').value = breakdownTxt;
    }

    document.getElementById('quote-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = e.target;
        const btn = document.getElementById('quote-submit-btn');
        btn.disabled = true;
        btn.querySelector('span').textContent = 'Submitting...';

        try {`;


// Regex replace HTML block
const htmlRegex = /<div id="quote-modal"[\s\S]*?<!-- ═══════════════════════════════════════════\s*REFERRAL MODAL/;
content = content.replace(htmlRegex, newQuoteModalHTML + '\n\n\n    <!-- ═══════════════════════════════════════════\n         REFERRAL MODAL');

// Regex replace JS block
const jsRegex = /\/\/ ─── Quote Modal Logic \(Wizard\) ───[\s\S]*?document\.getElementById\('quote-form'\)\.addEventListener\('submit', async function\(e\) {\s*e\.preventDefault\(\);\s*const form = e\.target;\s*const btn = document\.getElementById\('quote-submit-btn'\);\s*btn\.disabled = true;\s*btn\.querySelector\('span'\)\.textContent = 'Submitting\.\.\.';\s*try \{/m;
content = content.replace(jsRegex, newQuoteLogicJS);

fs.writeFileSync(file, content);
console.log('Fixed HTML and JS for Detailed Estimator!');
