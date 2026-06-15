const fs = require('fs');
const path = require('path');

// Ensure directories exist
if (!fs.existsSync('css')) fs.mkdirSync('css');
if (!fs.existsSync('js')) fs.mkdirSync('js');

const indexFile = 'index.html';
let content = fs.readFileSync(indexFile, 'utf8');

// 1. Extract Tailwind Config
const tailwindRegex = /<script>\s*tailwind\.config = (\{[\s\S]*?\})\s*<\/script>/;
const tailwindMatch = content.match(tailwindRegex);
if (tailwindMatch) {
    fs.writeFileSync('js/config.js', `tailwind.config = ${tailwindMatch[1]};`);
    content = content.replace(tailwindRegex, '<script src="js/config.js"></script>');
}

// 2. Extract CSS
const styleRegex = /<style>\s*([\s\S]*?)\s*<\/style>/;
const styleMatch = content.match(styleRegex);
if (styleMatch) {
    fs.writeFileSync('css/style.css', styleMatch[1]);
    content = content.replace(styleRegex, '<link rel="stylesheet" href="css/style.css">');
}

// 3. Extract JS logic
// We need to carefully split the monolithic script tag
const scriptRegex = /<script type="module">\s*([\s\S]*?)\s*<\/script>/;
const scriptMatch = content.match(scriptRegex);

if (scriptMatch) {
    const fullJS = scriptMatch[1];
    
    // Split into modules based on comments
    // Admin
    const adminRegex = /(\/\/ ─── Admin UI Logic ───[\s\S]*)/;
    let adminJS = '';
    let remainingJS = fullJS;
    const adminMatch = remainingJS.match(adminRegex);
    if(adminMatch) {
        adminJS = adminMatch[1];
        remainingJS = remainingJS.replace(adminRegex, '');
    }

    // Quote Wizard
    const quoteRegex = /(\/\/ ─── Quote Modal Logic \(Component Estimator\) ───[\s\S]*?)(?=\n\s*\/\/ ───|$)/;
    let quoteJS = '';
    const quoteMatch = remainingJS.match(quoteRegex);
    if(quoteMatch) {
        quoteJS = quoteMatch[1];
        remainingJS = remainingJS.replace(quoteRegex, '');
    }

    // Firebase Init
    const firebaseRegex = /(import \{ initializeApp \} from "https:\/\/www\.gstatic\.com\/firebasejs.*?;\nimport \{ getFirestore.*?;\n\nconst firebaseConfig = \{[\s\S]*?};\n\nconst app = initializeApp\(firebaseConfig\);\nconst db = getFirestore\(app\);\nwindow\._fb = \{ app, db,.*?};)/;
    let firebaseJS = '';
    const firebaseMatch = remainingJS.match(firebaseRegex);
    if(firebaseMatch) {
        firebaseJS = firebaseMatch[1];
        remainingJS = remainingJS.replace(firebaseRegex, '');
    }

    // The rest is Main JS (lightbox, mobile menu, navbar scroll, etc)
    let mainJS = remainingJS.trim();

    fs.writeFileSync('js/firebase-init.js', firebaseJS);
    fs.writeFileSync('js/quote-wizard.js', quoteJS);
    fs.writeFileSync('js/admin.js', adminJS);
    fs.writeFileSync('js/main.js', mainJS);

    // Replace script block with external references
    const externalScripts = `
    <!-- External Scripts -->
    <script type="module" src="js/firebase-init.js"></script>
    <script src="js/main.js"></script>
    <script src="js/quote-wizard.js"></script>
    <script type="module" src="js/admin.js"></script>
    `;
    content = content.replace(scriptRegex, externalScripts);
}

fs.writeFileSync(indexFile, content);

// Apply to other files (portfolio.html, products.html)
const applyToOtherFile = (filename) => {
    if(!fs.existsSync(filename)) return;
    let html = fs.readFileSync(filename, 'utf8');
    
    // Replace inline Tailwind
    html = html.replace(/<script>\s*tailwind\.config = \{[\s\S]*?\}\s*<\/script>/, '<script src="js/config.js"></script>');
    
    // Replace inline CSS
    html = html.replace(/<style>\s*[\s\S]*?<\/style>/, '<link rel="stylesheet" href="css/style.css">');
    
    fs.writeFileSync(filename, html);
};

applyToOtherFile('portfolio.html');
applyToOtherFile('products.html');

console.log("Successfully extracted CSS and JS into separate files!");
