const fs = require('fs');

const file = 'c:\\Users\\adilm\\OneDrive\\Desktop\\Subtitles\\.PROJECT\\Interiors\\index.html';
let content = fs.readFileSync(file, 'utf8');

// The new HTML for Quote Modal
const newQuoteModalHTML = `    <div id="quote-modal" class="fixed inset-0 bg-dark/95 backdrop-blur-xl z-[100] hidden flex-col items-center justify-center">
        <div class="glass rounded-3xl p-6 md:p-8 max-w-2xl w-full mx-6 relative border-white/10 mt-10 md:mt-0 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button type="button" class="absolute top-5 right-5 text-gray-400 hover:text-white text-xl transition-colors z-10" onclick="closeQuoteModal()"><i class="fas fa-times"></i></button>
            
            <div class="text-center mb-6">
                <h3 class="text-2xl font-serif text-white mb-2">Get your free estimate</h3>
                
                <!-- Progress Bar -->
                <div class="flex justify-between items-center max-w-xs mx-auto mt-6 relative">
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0"></div>
                    <div id="quote-progress" class="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-1 bg-brand-500 rounded-full z-0 transition-all duration-500"></div>
                    
                    <div class="step-dot w-6 h-6 rounded-full bg-brand-500 border-4 border-dark relative z-10 flex items-center justify-center text-[10px] text-white font-bold" data-step="1">1</div>
                    <div class="step-dot w-6 h-6 rounded-full bg-white/20 border-4 border-dark relative z-10 flex items-center justify-center text-[10px] text-gray-400 font-bold" data-step="2">2</div>
                    <div class="step-dot w-6 h-6 rounded-full bg-white/20 border-4 border-dark relative z-10 flex items-center justify-center text-[10px] text-gray-400 font-bold" data-step="3">3</div>
                    <div class="step-dot w-6 h-6 rounded-full bg-white/20 border-4 border-dark relative z-10 flex items-center justify-center text-[10px] text-gray-400 font-bold" data-step="4">4</div>
                </div>
                <div class="flex justify-between max-w-[340px] mx-auto mt-2 text-[9px] uppercase tracking-widest text-gray-500">
                    <span class="w-1/4 text-center">Layout</span>
                    <span class="w-1/4 text-center">Size</span>
                    <span class="w-1/4 text-center">Package</span>
                    <span class="w-1/4 text-center">Review</span>
                </div>
            </div>

            <form id="quote-form" class="w-full">
                <!-- Web3Forms Config -->
                <input type="hidden" name="access_key" value="48e4969d-2176-4749-9e2c-8095a97c0bc8">
                <input type="hidden" name="subject" value="New Quote Request — Shantha Interiors">
                <input type="hidden" name="from_name" value="Shantha Interiors Website">
                <input type="checkbox" name="botcheck" class="hidden" style="display:none">
                
                <input type="hidden" name="System_Calculated_Estimate" id="hidden-estimate">

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

                <!-- STEP 2: Measurements -->
                <div id="quote-step-2" class="step-content hidden animate-fade-up">
                    <h4 class="text-white text-lg font-medium mb-2 text-center">Review measurements</h4>
                    <p class="text-center text-xs text-gray-400 mb-6 bg-brand-500/10 py-2 rounded-lg text-brand-300 border border-brand-500/20">Standard size has been set for your convenience based on your layout.</p>
                    
                    <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Total Woodwork Area</label>
                        <div class="flex items-center gap-4">
                            <input type="number" name="TotalSqFt" id="quote-sqft" class="w-full bg-dark border border-white/10 rounded-xl p-4 text-xl font-semibold text-white focus:border-brand-400 focus:outline-none transition-colors" data-auto="true">
                            <span class="text-gray-400 font-medium text-lg">sq.ft.</span>
                        </div>
                    </div>

                    <div class="flex gap-3 pt-8">
                        <button type="button" onclick="goToQuoteStep(1)" class="w-1/3 border border-white/20 text-gray-300 py-4 uppercase tracking-wider text-xs font-semibold hover:bg-white/5 transition-colors rounded-xl">Back</button>
                        <button type="button" onclick="goToQuoteStep(3)" class="w-2/3 bg-brand-500 text-white py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-600 transition-colors rounded-xl shadow-lg">Next Step <i class="fas fa-arrow-right ml-2"></i></button>
                    </div>
                </div>

                <!-- STEP 3: Package -->
                <div id="quote-step-3" class="step-content hidden animate-fade-up">
                    <h4 class="text-white text-lg font-medium mb-4 text-center">Pick your package</h4>
                    
                    <div class="space-y-3">
                        <label class="cursor-pointer block relative">
                            <input type="radio" name="Package" value="Standard" data-rate="700" class="peer sr-only" required>
                            <div class="bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-4 peer-checked:bg-brand-500/10 peer-checked:border-brand-500 transition-all hover:bg-white/10">
                                <div class="w-5 h-5 rounded-full border-2 border-gray-500 flex-shrink-0 peer-checked:border-brand-400 peer-checked:bg-brand-400 mt-1 flex items-center justify-center">
                                    <div class="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                </div>
                                <div>
                                    <h5 class="text-white font-serif text-lg mb-1">Standard <span class="text-brand-400 text-sm font-sans">(₹700/sqft)</span></h5>
                                    <p class="text-xs text-gray-400 mb-2">Essential woodwork constructed with high-quality Particle Board.</p>
                                    <ul class="text-[10px] text-gray-500 space-y-1">
                                        <li><i class="fas fa-check text-green-500 mr-1"></i> Particle Board core</li>
                                        <li><i class="fas fa-check text-green-500 mr-1"></i> Standard finishes</li>
                                    </ul>
                                </div>
                            </div>
                        </label>

                        <label class="cursor-pointer block relative">
                            <input type="radio" name="Package" value="Premium" data-rate="1000" class="peer sr-only">
                            <div class="bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-4 peer-checked:bg-brand-500/10 peer-checked:border-brand-500 transition-all relative overflow-hidden hover:bg-white/10">
                                <div class="absolute top-0 right-0 bg-brand-500 text-white text-[9px] uppercase tracking-widest px-3 py-1 font-bold rounded-bl-lg">Recommended</div>
                                <div class="w-5 h-5 rounded-full border-2 border-gray-500 flex-shrink-0 peer-checked:border-brand-400 peer-checked:bg-brand-400 mt-1 flex items-center justify-center">
                                    <div class="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                </div>
                                <div>
                                    <h5 class="text-white font-serif text-lg mb-1">Premium <span class="text-brand-400 text-sm font-sans">(₹1000/sqft)</span></h5>
                                    <p class="text-xs text-gray-400 mb-2">Durable and elegant designs built using Normal Plywood for longevity.</p>
                                    <ul class="text-[10px] text-gray-500 space-y-1">
                                        <li><i class="fas fa-check text-green-500 mr-1"></i> Normal Plywood core</li>
                                        <li><i class="fas fa-check text-green-500 mr-1"></i> Wide range of laminates</li>
                                    </ul>
                                </div>
                            </div>
                        </label>

                        <label class="cursor-pointer block relative">
                            <input type="radio" name="Package" value="Luxe" data-rate="1200" class="peer sr-only">
                            <div class="bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-4 peer-checked:bg-brand-500/10 peer-checked:border-brand-500 transition-all hover:bg-white/10">
                                <div class="w-5 h-5 rounded-full border-2 border-gray-500 flex-shrink-0 peer-checked:border-brand-400 peer-checked:bg-brand-400 mt-1 flex items-center justify-center">
                                    <div class="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                </div>
                                <div>
                                    <h5 class="text-white font-serif text-lg mb-1">Luxe <span class="text-brand-400 text-sm font-sans">(₹1200/sqft)</span></h5>
                                    <p class="text-xs text-gray-400 mb-2">The ultimate luxury offering with premium materials, finishes, and elite accessories.</p>
                                    <ul class="text-[10px] text-gray-500 space-y-1">
                                        <li><i class="fas fa-check text-green-500 mr-1"></i> Premium Plywood/BWP</li>
                                        <li><i class="fas fa-check text-green-500 mr-1"></i> Acrylic/PU luxury finishes</li>
                                    </ul>
                                </div>
                            </div>
                        </label>
                    </div>

                    <div class="flex gap-3 pt-6">
                        <button type="button" onclick="goToQuoteStep(2)" class="w-1/3 border border-white/20 text-gray-300 py-4 uppercase tracking-wider text-xs font-semibold hover:bg-white/5 transition-colors rounded-xl">Back</button>
                        <button type="button" onclick="goToQuoteStep(4)" class="w-2/3 bg-brand-500 text-white py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-600 transition-colors rounded-xl shadow-lg">Next Step <i class="fas fa-arrow-right ml-2"></i></button>
                    </div>
                </div>

                <!-- STEP 4: Review -->
                <div id="quote-step-4" class="step-content hidden animate-fade-up">
                    <h4 class="text-white text-lg font-medium mb-4 text-center">Your Estimate is Ready!</h4>
                    
                    <div class="mb-6 bg-brand-500/10 border border-brand-500/20 rounded-xl p-5 text-center relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-[40px] rounded-full"></div>
                        <p class="text-xs text-brand-400 uppercase tracking-widest font-semibold mb-2">Estimated Cost</p>
                        <h4 id="quote-estimate-display" class="text-3xl md:text-4xl font-serif text-white mb-2">₹0</h4>
                        <p id="quote-math-breakdown" class="text-xs text-gray-400 mb-3 font-medium"></p>
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
                        <button type="button" onclick="goToQuoteStep(3)" class="w-1/3 border border-white/20 text-gray-300 py-4 uppercase tracking-wider text-xs font-semibold hover:bg-white/5 transition-colors rounded-xl">Back</button>
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

// Regex replace HTML block
const htmlRegex = /<div id="quote-modal"[\s\S]*?<!-- ═══════════════════════════════════════════\s*REFERRAL MODAL/;
content = content.replace(htmlRegex, newQuoteModalHTML + '\n\n\n    <!-- ═══════════════════════════════════════════\n         REFERRAL MODAL');

fs.writeFileSync(file, content);
console.log('Fixed HTML');
