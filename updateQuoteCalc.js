const fs = require('fs');
const file = 'c:\\Users\\adilm\\OneDrive\\Desktop\\Subtitles\\.PROJECT\\Interiors\\index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Inject SqFt Input in Step 1 (before Location)
const sqftHTML = `
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Total Area (Optional)</label>
                        <input type="number" name="TotalSqFt" id="quote-sqft" class="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors" placeholder="e.g. 1200 SqFt">
                    </div>
`;
content = content.replace('<div>\n                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Location</label>', sqftHTML + '\n                    <div>\n                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Location</label>');

// 2. Inject Estimate Display in Step 2 (before Name)
const estimateDisplayHTML = `
                    <div class="mb-6 bg-brand-500/10 border border-brand-500/20 rounded-xl p-4 text-center">
                        <p class="text-xs text-brand-400 uppercase tracking-widest font-semibold mb-1">Estimated Cost</p>
                        <h4 id="quote-estimate-display" class="text-2xl md:text-3xl font-serif text-white mb-2">₹0</h4>
                        <p class="text-[10px] text-gray-400 leading-tight">*Base rate starts at ₹700/sqft. Final rate may change based on availability, demand, and material selection.</p>
                    </div>
                    <input type="hidden" name="System_Estimated_Cost" id="hidden-estimate">
`;
content = content.replace('<div>\n                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">Your Name</label>', estimateDisplayHTML + '\n                    <div>\n                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">Your Name</label>');

// 3. Update the quoteNextStep() JS logic
const oldJS = `    function quoteNextStep() {
        const form = document.getElementById('quote-form');
        if(!form.querySelector('input[name="Floorplan"]:checked')) return alert("Please select a Floorplan");
        if(!form.querySelector('input[name="Purpose"]:checked')) return alert("Please select a Purpose");
        if(!form.querySelector('select[name="Location"]').value) return alert("Please select a Location");
        
        document.getElementById('quote-step-1').classList.add('hidden');
        document.getElementById('quote-step-2').classList.remove('hidden');
    }`;

const newJS = `    function quoteNextStep() {
        const form = document.getElementById('quote-form');
        const floorplanEl = form.querySelector('input[name="Floorplan"]:checked');
        if(!floorplanEl) return alert("Please select a Floorplan");
        if(!form.querySelector('input[name="Purpose"]:checked')) return alert("Please select a Purpose");
        if(!form.querySelector('select[name="Location"]').value) return alert("Please select a Location");
        
        // Calculate Estimate
        const baseRate = 700;
        let woodworkSqFt = 0;
        const manualSqFt = parseInt(document.getElementById('quote-sqft').value);
        
        if (manualSqFt > 0) {
            woodworkSqFt = manualSqFt;
        } else {
            const floorplan = floorplanEl.value; // "1 BHK", "2 BHK", "3 BHK", "4+ BHK"
            let beds = 1;
            if (floorplan === "2 BHK") beds = 2;
            else if (floorplan === "3 BHK") beds = 3;
            else if (floorplan === "4+ BHK") beds = 4;
            
            // Beds * 70 + Kitchen (70)
            woodworkSqFt = (beds * 70) + 70;
        }
        
        const estimate = woodworkSqFt * baseRate;
        const formattedEstimate = "₹" + estimate.toLocaleString('en-IN');
        
        document.getElementById('quote-estimate-display').textContent = formattedEstimate;
        document.getElementById('hidden-estimate').value = formattedEstimate;

        document.getElementById('quote-step-1').classList.add('hidden');
        document.getElementById('quote-step-2').classList.remove('hidden');
    }`;

content = content.replace(oldJS, newJS);

fs.writeFileSync(file, content);
console.log("Successfully updated quote calculator.");
