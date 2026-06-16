const fs = require('fs');

const file = 'c:\\Users\\adilm\\OneDrive\\Desktop\\Subtitles\\.PROJECT\\Interiors\\index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. UPDATE HEADER
const headerRegex = /(<header id="navbar"[\s\S]*?<\/header>)/;
let headerMatch = content.match(headerRegex);
if(headerMatch) {
    let header = headerMatch[1];
    
    // Change base header text to dark
    header = header.replace('text-white', 'text-slate-900');
    
    // Make the gold darker for better contrast on cream
    header = header.replace(/text-brand-400/g, 'text-brand-700');
    header = header.replace(/hover:text-brand-400/g, 'hover:text-brand-700');
    header = header.replace(/hover:text-brand-300/g, 'hover:text-brand-800');
    
    // Fix text-white inside mobile menu
    header = header.replace(/text-white/g, 'text-slate-900');
    header = header.replace('bg-carbon/95', 'bg-white/95');
    
    // "Get a Quote" Button
    header = header.replace('border-brand-500 text-brand-700', 'border-brand-700 text-brand-700 get-quote-btn');
    
    content = content.replace(headerRegex, header);
}

// 2. ADD CSS FOR SCROLLED HEADER & DARK GRADIENT
const cssAdd = `
        .nav-scrolled .nav-link { color: #e6daca !important; }
        .nav-scrolled .logo-text { color: #fff !important; }
        .nav-scrolled .logo-text .text-brand-700 { color: #D4AF37 !important; }
        .nav-scrolled .get-quote-btn { border-color: #D4AF37 !important; color: #D4AF37 !important; }
        .nav-scrolled .get-quote-btn:hover { color: #fff !important; }
        .nav-scrolled .get-quote-btn span.absolute { background-color: #B8860B !important; }

        /* ─── Dark Gradient Text ─── */
        .gradient-text-dark {
            background: linear-gradient(135deg, #96735a, #7d5e4b, #544136);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
`;
if(!content.includes('gradient-text-dark')) {
    content = content.replace('.nav-scrolled .logo-text { color: #fff !important; }', cssAdd.trim());
}

// 3. UPDATE HERO SECTION
const heroRegex = /(<section id="hero"[\s\S]*?<\/section>)/;
let heroMatch = content.match(heroRegex);
if(heroMatch) {
    let hero = heroMatch[1];
    
    // Make ALL "text-brand-400" darker
    hero = hero.replace(/text-brand-400/g, 'text-brand-700');
    
    // Make scroll dot and text darker
    hero = hero.replace('bg-brand-400', 'bg-brand-600');
    hero = hero.replace('text-dark/40', 'text-slate-900/60');
    
    // Make paragraph text darker and bold
    hero = hero.replace('text-gray-800 text-base', 'text-slate-900 font-medium text-base');
    
    // Apply dark gradient
    hero = hero.replace('gradient-text', 'gradient-text-dark');
    
    content = content.replace(heroRegex, hero);
}

// Fix button hover text white explicitly
content = content.replace('border-brand-700 text-brand-700 get-quote-btn rounded-full text-xs uppercase tracking-[0.2em] font-semibold overflow-hidden transition-all duration-500 hover:text-slate-900', 'border-brand-700 text-brand-700 get-quote-btn rounded-full text-xs uppercase tracking-[0.2em] font-semibold overflow-hidden transition-all duration-500 hover:text-white');

fs.writeFileSync(file, content);
console.log('Fixed contrast for Hero and Header');
