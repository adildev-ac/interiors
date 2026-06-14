const fs = require('fs');
const file = 'c:\\Users\\adilm\\OneDrive\\Desktop\\Subtitles\\.PROJECT\\Interiors\\index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix mobile hero layout
content = content.replace(
    '<div class="relative z-10 text-center px-6 max-w-5xl mx-auto">',
    '<div class="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 md:pt-0">'
);

// 2. Inject Quote Modal HTML
const quoteHTML = `
    <!-- ═══════════════════════════════════════════
         QUOTE MODAL
    ═══════════════════════════════════════════ -->
    <div id="quote-modal" class="fixed inset-0 bg-dark/95 backdrop-blur-xl z-[100] hidden flex-col items-center justify-center">
        <div class="glass rounded-3xl p-8 md:p-10 max-w-xl w-full mx-6 relative border-white/10 mt-10 md:mt-0">
            <button class="absolute top-5 right-5 text-gray-400 hover:text-white text-xl transition-colors" onclick="closeQuoteModal()"><i class="fas fa-times"></i></button>
            
            <div class="text-center mb-8">
                <h3 class="text-2xl md:text-3xl font-serif text-white mb-2">Get your free estimate</h3>
                <p class="text-brand-400 text-sm tracking-wide">in under 30 seconds!</p>
            </div>

            <form id="quote-form" class="w-full">
                <!-- Web3Forms Config -->
                <input type="hidden" name="access_key" value="48e4969d-2176-4749-9e2c-8095a97c0bc8">
                <input type="hidden" name="subject" value="New Quote Request — Shantha Interiors">
                <input type="hidden" name="from_name" value="Shantha Interiors Website">
                <input type="checkbox" name="botcheck" class="hidden" style="display:none">

                <!-- STEP 1 -->
                <div id="quote-step-1" class="space-y-6">
                    <p class="text-sm text-gray-400 text-center mb-6">Step 1 of 2: Share your preferences</p>
                    
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Your Floorplan</label>
                        <div class="grid grid-cols-4 gap-2">
                            <label class="cursor-pointer">
                                <input type="radio" name="Floorplan" value="1 BHK" class="peer sr-only" required>
                                <div class="text-center py-3 border border-white/20 rounded-xl text-sm text-gray-300 peer-checked:bg-brand-500 peer-checked:text-white peer-checked:border-brand-500 transition-all hover:border-brand-400">1 BHK</div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="radio" name="Floorplan" value="2 BHK" class="peer sr-only">
                                <div class="text-center py-3 border border-white/20 rounded-xl text-sm text-gray-300 peer-checked:bg-brand-500 peer-checked:text-white peer-checked:border-brand-500 transition-all hover:border-brand-400">2 BHK</div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="radio" name="Floorplan" value="3 BHK" class="peer sr-only">
                                <div class="text-center py-3 border border-white/20 rounded-xl text-sm text-gray-300 peer-checked:bg-brand-500 peer-checked:text-white peer-checked:border-brand-500 transition-all hover:border-brand-400">3 BHK</div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="radio" name="Floorplan" value="4+ BHK" class="peer sr-only">
                                <div class="text-center py-3 border border-white/20 rounded-xl text-sm text-gray-300 peer-checked:bg-brand-500 peer-checked:text-white peer-checked:border-brand-500 transition-all hover:border-brand-400">4+ BHK</div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Purpose</label>
                        <div class="grid grid-cols-3 gap-2">
                            <label class="cursor-pointer">
                                <input type="radio" name="Purpose" value="Move In" class="peer sr-only" required>
                                <div class="text-center py-3 border border-white/20 rounded-xl text-sm text-gray-300 peer-checked:bg-brand-500 peer-checked:text-white peer-checked:border-brand-500 transition-all hover:border-brand-400">Move In</div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="radio" name="Purpose" value="Rent Out" class="peer sr-only">
                                <div class="text-center py-3 border border-white/20 rounded-xl text-sm text-gray-300 peer-checked:bg-brand-500 peer-checked:text-white peer-checked:border-brand-500 transition-all hover:border-brand-400">Rent Out</div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="radio" name="Purpose" value="Renovate" class="peer sr-only">
                                <div class="text-center py-3 border border-white/20 rounded-xl text-sm text-gray-300 peer-checked:bg-brand-500 peer-checked:text-white peer-checked:border-brand-500 transition-all hover:border-brand-400">Renovate</div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Location</label>
                        <select name="Location" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors appearance-none">
                            <option value="" disabled selected>Select your city...</option>
                            <option value="Bangalore" class="bg-dark">Bangalore</option>
                            <option value="Chennai" class="bg-dark">Chennai</option>
                            <option value="Hyderabad" class="bg-dark">Hyderabad</option>
                            <option value="Other" class="bg-dark">Other (South India)</option>
                        </select>
                    </div>

                    <button type="button" onclick="quoteNextStep()" class="w-full bg-brand-500 text-white py-4 mt-6 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-600 transition-colors rounded-xl shadow-lg">
                        Next Step <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>

                <!-- STEP 2 -->
                <div id="quote-step-2" class="space-y-4 hidden">
                    <p class="text-sm text-gray-400 text-center mb-6">Step 2 of 2: Where should we send it?</p>
                    
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">Your Name</label>
                        <input type="text" name="Name" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors" placeholder="e.g. John Doe">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">Email Address</label>
                        <input type="email" name="Email" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors" placeholder="john@example.com">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">Phone Number</label>
                        <input type="tel" name="Phone" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors" placeholder="+91 98865 58663">
                    </div>

                    <div class="flex gap-3 pt-4">
                        <button type="button" onclick="quotePrevStep()" class="w-1/3 border border-white/20 text-gray-300 py-4 uppercase tracking-wider text-xs font-semibold hover:bg-white/5 transition-colors rounded-xl">
                            Back
                        </button>
                        <button type="submit" id="quote-submit-btn" class="w-2/3 bg-brand-500 text-white py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-600 transition-colors rounded-xl relative overflow-hidden shadow-lg">
                            <span class="relative z-10">Get Estimate</span>
                        </button>
                    </div>

                    <div id="quote-success" class="hidden mt-4 p-4 bg-brand-500/10 border border-brand-500/30 rounded-xl text-brand-300 text-sm text-center">
                        <i class="fas fa-check-circle mr-1 text-brand-400"></i> Got it! We'll reach out shortly.
                    </div>
                    <div id="quote-error" class="hidden mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm text-center">
                        <i class="fas fa-exclamation-circle mr-1"></i> Something went wrong.
                    </div>
                </div>
            </form>
        </div>
    </div>
`;
content = content.replace(/<!-- ═══════════════════════════════════════════\s*REFERRAL MODAL\s*═══════════════════════════════════════════ -->/, quoteHTML + '\n\n    <!-- ═══════════════════════════════════════════\n         REFERRAL MODAL\n    ═══════════════════════════════════════════ -->');

// 3. Inject Quote Modal JS
const quoteJS = `
    // ─── Quote Modal Logic ───
    function openQuoteModal() {
        const m = document.getElementById('quote-modal');
        m.classList.remove('hidden');
        m.classList.add('flex');
    }
    function closeQuoteModal() {
        const m = document.getElementById('quote-modal');
        m.classList.add('hidden');
        m.classList.remove('flex');
    }
    function quoteNextStep() {
        const form = document.getElementById('quote-form');
        if(!form.querySelector('input[name="Floorplan"]:checked')) return alert("Please select a Floorplan");
        if(!form.querySelector('input[name="Purpose"]:checked')) return alert("Please select a Purpose");
        if(!form.querySelector('select[name="Location"]').value) return alert("Please select a Location");
        
        document.getElementById('quote-step-1').classList.add('hidden');
        document.getElementById('quote-step-2').classList.remove('hidden');
    }
    function quotePrevStep() {
        document.getElementById('quote-step-2').classList.add('hidden');
        document.getElementById('quote-step-1').classList.remove('hidden');
    }

    document.getElementById('quote-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = e.target;
        const btn = document.getElementById('quote-submit-btn');
        btn.disabled = true;
        btn.querySelector('span').textContent = 'Submitting...';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: new FormData(form)
            });
            const result = await response.json();
            
            if (!response.ok || !result.success) throw new Error();

            document.getElementById('quote-success').classList.remove('hidden');
            form.reset();
            setTimeout(() => {
                closeQuoteModal();
                quotePrevStep();
                document.getElementById('quote-success').classList.add('hidden');
            }, 3000);
        } catch(err) {
            document.getElementById('quote-error').classList.remove('hidden');
        } finally {
            btn.disabled = false;
            btn.querySelector('span').textContent = 'Get Estimate';
        }
    });

    // Auto-trigger Quote Modal after 4 seconds (once per session)
    window.addEventListener('DOMContentLoaded', () => {
        if (!sessionStorage.getItem('quote_modal_shown')) {
            setTimeout(() => {
                openQuoteModal();
                sessionStorage.setItem('quote_modal_shown', 'true');
            }, 4000);
        }
    });
`;
content = content.replace(/document.getElementById\('referral-form'\).addEventListener\('submit',/, quoteJS + '\n\n    document.getElementById(\'referral-form\').addEventListener(\'submit\',');

fs.writeFileSync(file, content);
console.log("Successfully added quote modal.");
