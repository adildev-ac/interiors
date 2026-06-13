const fs = require('fs');
const file = 'c:\\Users\\adilm\\OneDrive\\Desktop\\Subtitles\\.PROJECT\\Interiors\\index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Favicon
if (!content.includes('<link rel="icon"')) {
    content = content.replace('</head>', '    <link rel="icon" href="INTERIORS.png" type="image/png">\n</head>');
}

// 2. Remove navbar logo
content = content.replace(/<img src="INTERIORS.png" alt="Logo" class="h-10 md:h-12 object-contain">\s*<span class="logo-text/g, '<span class="logo-text');

// 3. Global padding reduction (py-28 to py-16 md:py-28)
content = content.replace(/py-28/g, 'py-16 md:py-28');
content = content.replace(/py-14/g, 'py-10 md:py-14'); // also for offer banner

// 4. Move portfolio before about
const portfolioMatch = content.match(/<!-- ═══════════════════════════════════════════\s*PORTFOLIO\s*═══════════════════════════════════════════ -->\s*<section id="portfolio"[\s\S]*?<\/section>/);

if (portfolioMatch) {
    const portfolioContent = portfolioMatch[0];
    content = content.replace(portfolioContent, ''); // Remove from original position
    
    // Insert before ABOUT
    const aboutRegex = /<!-- ═══════════════════════════════════════════\s*ABOUT\s*═══════════════════════════════════════════ -->/;
    content = content.replace(aboutRegex, portfolioContent + '\n\n\n    <!-- ═══════════════════════════════════════════\n         ABOUT\n    ═══════════════════════════════════════════ -->');
}

fs.writeFileSync(file, content);
console.log("Successfully updated index.html");
