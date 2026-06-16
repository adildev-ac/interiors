const fs = require('fs');

const filesToUpdate = [
    'index.html',
    'products.html',
    'portfolio.html',
    'generateProducts.js'
];

filesToUpdate.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Update favicons
        content = content.replace(/<link rel="icon" href="INTERIORS.png" type="image\/png">/g, '<link rel="icon" href="logo.png" type="image/png" sizes="192x192">\n    <link rel="apple-touch-icon" href="logo.png">');
        
        // Update image src
        content = content.replace(/INTERIORS\.png/g, 'logo.png');
        
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
