const fs = require('fs');
const glob = require('path');

const filesToProcess = [
    'index.html',
    'portfolio.html',
    'products.html',
    'js/main.js',
    'js/quote-wizard.js',
    'js/admin.js'
];

filesToProcess.forEach(file => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Safe direct swaps
    content = content.replace(/\bbg-dark\b/g, 'bg-slate-50');
    content = content.replace(/\bbg-carbon\b/g, 'bg-white shadow-xl');
    
    // Text colors
    content = content.replace(/\btext-gray-200\b/g, 'text-slate-700');
    content = content.replace(/\btext-gray-300\b/g, 'text-slate-600');
    content = content.replace(/\btext-gray-400\b/g, 'text-slate-500');
    content = content.replace(/\btext-gray-500\b/g, 'text-slate-400');
    
    // Borders
    content = content.replace(/\bborder-white\/5\b/g, 'border-slate-200');
    content = content.replace(/\bborder-white\/10\b/g, 'border-slate-200');
    content = content.replace(/\bborder-white\/20\b/g, 'border-slate-300');
    
    // Semi-transparent backgrounds (used for inputs/cards in dark mode)
    content = content.replace(/\bbg-white\/5\b/g, 'bg-white shadow-sm border border-slate-200');
    content = content.replace(/\bbg-white\/10\b/g, 'bg-slate-100');
    content = content.replace(/\bbg-white\/20\b/g, 'bg-slate-200');
    
    // Brand text colors (need to be darker on light backgrounds)
    content = content.replace(/\btext-brand-300\b/g, 'text-brand-600');
    content = content.replace(/\btext-brand-400\b/g, 'text-brand-600');

    // Handle pure white text
    // We want text-white to become text-slate-900, EXCEPT on primary buttons or dark overlays
    // We'll replace it globally, then fix the buttons
    content = content.replace(/\btext-white\b/g, 'text-slate-900');
    
    // Fix buttons & dark sections
    content = content.replace(/bg-brand-500 text-slate-900/g, 'bg-brand-500 text-white');
    content = content.replace(/bg-red-500\/80 backdrop-blur-sm text-slate-900/g, 'bg-red-500/80 backdrop-blur-sm text-white');
    content = content.replace(/bg-red-600 text-slate-900/g, 'bg-red-600 text-white');
    content = content.replace(/text-slate-900 bg-brand-500/g, 'text-white bg-brand-500');
    
    // Fix overlay text (hero image and portfolio hover overlays)
    // Overlays use absolute inset-0 bg-gradient ... text-white. 
    // Wait, it's easier to fix overlays manually if they break. Let's run it and see.

    // Fix scrollbar CSS in style.css
    if(file === 'index.html' || file === 'css/style.css') {
        // Nothing here because CSS is external now, we'll run a separate replacement on style.css
    }

    fs.writeFileSync(file, content);
});

// Update style.css
if(fs.existsSync('css/style.css')) {
    let css = fs.readFileSync('css/style.css', 'utf8');
    css = css.replace(/background: #121212;/g, 'background: #f8fafc;');
    css = css.replace(/color: #e6daca !important;/g, 'color: #334155 !important;'); // Nav text
    css = css.replace(/color: #fff !important;/g, 'color: #0f172a !important;'); // Nav logo
    css = css.replace(/background-color: rgba\(18,18,18,0\.92\) !important;/g, 'background-color: rgba(255,255,255,0.92) !important;'); // Scrolled nav
    fs.writeFileSync('css/style.css', css);
}

// Update config.js (Add slate colors if needed, though Tailwind CDN has them by default)

console.log("Light theme classes applied!");
