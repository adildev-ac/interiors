const fs = require('fs');

const file = 'c:\\Users\\adilm\\OneDrive\\Desktop\\Subtitles\\.PROJECT\\Interiors\\index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. UPDATE HERO SECTION
const heroRegex = /(<section id="hero"[\s\S]*?<\/section>)/;
let heroMatch = content.match(heroRegex);
if(heroMatch) {
    let hero = heroMatch[1];
    
    // Background gradient
    hero = hero.replace('from-dark/70 via-dark/40 to-dark', 'from-[#faf8f5]/90 via-[#faf8f5]/60 to-[#faf8f5]');
    
    // Text colors
    hero = hero.replace('text-white leading-[1.1]', 'text-dark leading-[1.1]');
    hero = hero.replace('text-gray-300', 'text-gray-800');
    
    // Badges
    hero = hero.replace(/class="glass text-white/g, 'class="bg-white/60 backdrop-blur-md text-dark');
    hero = hero.replace('glass text-brand-300 hover:text-white', 'bg-white/60 backdrop-blur-md text-brand-700 hover:text-brand-900');
    
    // Contact button
    hero = hero.replace('border border-white/25 text-white', 'border border-dark/20 text-dark');
    hero = hero.replace('hover:bg-white hover:text-dark', 'hover:bg-dark hover:text-white');
    
    // Scroll indicator
    hero = hero.replace('text-white/40', 'text-dark/40');
    hero = hero.replace('border-white/20', 'border-dark/20');
    
    content = content.replace(heroRegex, hero);
}

// 2. UPDATE QUOTE MODAL (HTML Part)
const quoteRegex = /(<div id="quote-modal"[\s\S]*?<\/form>\s*<\/div>\s*<\/div>)/;
let quoteMatch = content.match(quoteRegex);
if(quoteMatch) {
    let quote = quoteMatch[1];
    
    // Background
    quote = quote.replace('bg-dark/95 backdrop-blur-xl', 'bg-[#faf8f5]/60 backdrop-blur-2xl');
    
    // Container
    quote = quote.replace('glass rounded-3xl', 'bg-white shadow-2xl rounded-3xl border border-brand-500/10');
    
    // Texts
    quote = quote.replace(/text-white/g, 'text-dark');
    quote = quote.replace(/text-gray-200/g, 'text-gray-800');
    quote = quote.replace(/text-gray-300/g, 'text-gray-700');
    quote = quote.replace(/text-gray-400/g, 'text-gray-500');
    quote = quote.replace(/text-gray-500/g, 'text-gray-400');
    
    // Backgrounds inside modal
    quote = quote.replace(/bg-white\/5/g, 'bg-slate-50 border border-slate-200');
    quote = quote.replace(/bg-dark/g, 'bg-white shadow-sm border border-slate-200');
    
    // Specific fixes
    quote = quote.replace('bg-white/10 rounded-full', 'bg-brand-500/10 rounded-full'); // progress bar bg
    quote = quote.replace(/bg-white\/20/g, 'bg-brand-500/20');
    
    // Fix submit button text color (was inverted to text-dark)
    quote = quote.replace('bg-brand-500 text-dark', 'bg-brand-500 text-white');
    quote = quote.replace('bg-brand-500/20 border-4 border-dark', 'bg-brand-500 border-4 border-white'); // step dots
    
    content = content.replace(quoteRegex, quote);
}

// 3. UPDATE QUOTE MODAL (JS HTML Generation Part)
const jsRegex = /(function generateComponentsUI[\s\S]*?function updateCompSqft)/;
let jsMatch = content.match(jsRegex);
if(jsMatch) {
    let js = jsMatch[1];
    js = js.replace('bg-dark/50 border border-white/10', 'bg-slate-50 border border-slate-200');
    js = js.replace(/text-white/g, 'text-dark');
    js = js.replace(/text-gray-400/g, 'text-gray-500');
    js = js.replace(/bg-white\/5/g, 'bg-white shadow-sm border border-slate-200');
    js = js.replace(/border-white\/10/g, 'border-slate-200');
    
    content = content.replace(jsRegex, js);
}

fs.writeFileSync(file, content);
console.log('Hero and Modal Light Theme applied successfully!');
