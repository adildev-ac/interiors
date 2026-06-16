const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const regex = /(document\.getElementById\('quote-form'\)\.addEventListener\('submit', async function\(e\) \{[\s\S]*?btn\.querySelector\('span'\)\.textContent = 'Get Estimate';\s*\}\s*\}\);)/;

const newSubmit = `document.getElementById('quote-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;
        const btn = document.getElementById('quote-submit-btn');
        btn.disabled = true;
        btn.querySelector('span').textContent = 'Opening WhatsApp...';

        try {
            const name = form.querySelector('[name="name"]').value;
            const phone = form.querySelector('[name="phone"]').value;
            const location = form.querySelector('[name="location"]').value;
            const layoutElement = form.querySelector('input[name="Floorplan"]:checked');
            const layout = layoutElement ? layoutElement.value : "Custom";
            const estimate = document.getElementById('hidden-estimate').value;
            const breakdown = document.getElementById('hidden-breakdown').value;

            let waText = \`*New Interior Quote Enquiry* 🏠\\n\\n\`;
            waText += \`*Name:* \${name}\\n\`;
            waText += \`*Phone:* \${phone}\\n\`;
            waText += \`*Location:* \${location}\\n\`;
            waText += \`*Layout Selected:* \${layout}\\n\\n\`;
            waText += \`*Requirement Breakdown:*\\n\${breakdown}\\n\`;
            waText += \`*Estimated Total:* \${estimate}\\n\\n\`;
            waText += \`Please get in touch with me regarding this quote!\`;

            const WHATSAPP_NUMBER = "919000000000"; // REPLACE WITH ACTUAL NUMBER
            const waUrl = \`https://wa.me/\${WHATSAPP_NUMBER}?text=\${encodeURIComponent(waText)}\`;
            
            window.open(waUrl, '_blank');

            document.getElementById('quote-success').classList.remove('hidden');
            form.reset();
            setTimeout(() => {
                closeQuoteModal();
                goToQuoteStep(1);
                document.getElementById('quote-success').classList.add('hidden');
            }, 3000);
        } catch(err) {
            document.getElementById('quote-error').classList.remove('hidden');
        } finally {
            btn.disabled = false;
            btn.querySelector('span').textContent = 'Get Estimate';
        }
    });`;

if(content.match(regex)) {
    content = content.replace(regex, newSubmit);
    fs.writeFileSync('index.html', content);
    console.log("Replaced successfully");
} else {
    console.log("Regex not matched");
}
