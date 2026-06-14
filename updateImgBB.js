const fs = require('fs');
const file = 'c:\\Users\\adilm\\OneDrive\\Desktop\\Subtitles\\.PROJECT\\Interiors\\index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace the "Image URL" input with the Drag & Drop Zone
const oldHTML = `                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Image URL</label>
                        <input type="url" id="admin-input-img" placeholder="https://images.unsplash.com/..." class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors placeholder:text-gray-600">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Project Title</label>
                        <input type="text" id="admin-input-title" placeholder="e.g. Modern Villa" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors placeholder:text-gray-600">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Location / Category</label>
                        <input type="text" id="admin-input-location" placeholder="e.g. Bangalore • Residential" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors placeholder:text-gray-600">
                    </div>

                    <!-- Image Preview -->
                    <div id="img-preview-container" class="hidden rounded-xl overflow-hidden border border-white/10">
                        <img id="img-preview" src="" alt="Preview" class="w-full h-40 object-cover">
                    </div>`;

const newHTML = `                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Upload Images</label>
                        <div id="admin-file-dropzone" class="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-brand-400 hover:bg-brand-500/5 transition-colors relative">
                            <input type="file" id="admin-input-files" multiple accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                            <i class="fas fa-cloud-upload-alt text-3xl text-brand-400 mb-3"></i>
                            <p id="admin-file-dropzone-text" class="text-sm text-gray-400 relative z-0">Drag files here or click to upload</p>
                            <p class="text-[10px] text-gray-500 mt-1 relative z-0">Supports multiple JPG, PNG, WEBP</p>
                        </div>
                    </div>
                    <div id="upload-status-container" class="hidden text-sm text-brand-300 mt-2 text-center bg-brand-500/10 border border-brand-500/20 p-2 rounded-lg">
                        Uploading...
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2 mt-4">Shared Project Title</label>
                        <input type="text" id="admin-input-title" placeholder="e.g. Modern Villa" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors placeholder:text-gray-600">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Shared Location / Category</label>
                        <input type="text" id="admin-input-location" placeholder="e.g. Bangalore • Residential" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors placeholder:text-gray-600">
                    </div>`;

content = content.replace(oldHTML, newHTML);


// 2. Replace the Preview JS
const oldPreviewJSMatch = content.match(/\/\/ ─── Image Preview in Admin ───[\s\S]*?container\.classList\.add\('hidden'\);\n\s*\}\n\s*\}\);/);
if (oldPreviewJSMatch) {
    const newPreviewJS = `// ─── Image Upload Preview in Admin ───
    const fileInput = document.getElementById('admin-input-files');
    const dropzoneText = document.getElementById('admin-file-dropzone-text');
    if(fileInput) {
        fileInput.addEventListener('change', () => {
            if(fileInput.files.length > 0) {
                dropzoneText.textContent = fileInput.files.length + ' file(s) selected';
            } else {
                dropzoneText.textContent = 'Drag files here or click to upload';
            }
        });
    }`;
    content = content.replace(oldPreviewJSMatch[0], newPreviewJS);
}

// 3. Replace the Add Portfolio Item logic
const oldAddPortfolioJSMatch = content.match(/\/\/ Add portfolio item[\s\S]*?btn\.innerHTML = '<i class="fas fa-plus mr-2"><\/i> Add to Portfolio';\n\s*\}\);/);
if (oldAddPortfolioJSMatch) {
    const newAddPortfolioJS = `// Add portfolio item (ImgBB Bulk Upload)
    document.getElementById('add-portfolio-btn').addEventListener('click', async () => {
        const fileInput = document.getElementById('admin-input-files');
        const title = document.getElementById('admin-input-title').value.trim();
        const loc = document.getElementById('admin-input-location').value.trim();
        const btn = document.getElementById('add-portfolio-btn');
        const status = document.getElementById('upload-status-container');

        if (fileInput.files.length === 0 || !title) {
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i> Images & Title Required';
            btn.classList.replace('bg-brand-500', 'bg-red-500');
            setTimeout(() => { btn.innerHTML = orig; btn.classList.replace('bg-red-500', 'bg-brand-500'); }, 2500);
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
        status.classList.remove('hidden');
        
        const files = Array.from(fileInput.files);
        let successCount = 0;
        
        for (let i = 0; i < files.length; i++) {
            status.textContent = 'Uploading image ' + (i + 1) + ' of ' + files.length + '...';
            const file = files[i];
            
            const formData = new FormData();
            formData.append('image', file);
            
            try {
                const res = await fetch('https://api.imgbb.com/1/upload?key=5b350073a427b815146376e7993e6cd7', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                
                if (data && data.success) {
                    const imgUrl = data.data.url;
                    
                    if (useFirebase) {
                        const fb = window._fb;
                        await fb.addDoc(fb.collection(fb.db, 'artifacts', fb.appId, 'public', 'data', 'portfolio'), {
                            imageUrl: imgUrl, title, location: loc || 'South India', createdAt: Date.now() + i
                        });
                    } else {
                        const items = getLocalPortfolio();
                        items.push({ id: 'p' + (Date.now() + i), imageUrl: imgUrl, title, location: loc || 'South India', createdAt: Date.now() + i });
                        setLocalPortfolio(items);
                        renderPortfolio(items);
                    }
                    successCount++;
                }
            } catch(e) {
                console.error("Upload failed for file", file.name, e);
            }
        }

        status.textContent = 'Successfully uploaded ' + successCount + ' images!';
        status.classList.replace('text-brand-300', 'text-green-400');
        status.classList.replace('bg-brand-500/10', 'bg-green-500/10');
        status.classList.replace('border-brand-500/20', 'border-green-500/20');

        setTimeout(() => {
            status.classList.add('hidden');
            status.classList.replace('text-green-400', 'text-brand-300');
            status.classList.replace('bg-green-500/10', 'bg-brand-500/10');
            status.classList.replace('border-green-500/20', 'border-brand-500/20');
            
            fileInput.value = '';
            document.getElementById('admin-file-dropzone-text').textContent = 'Drag files here or click to upload';
            document.getElementById('admin-input-title').value = '';
            document.getElementById('admin-input-location').value = '';
            
            btn.innerHTML = '<i class="fas fa-plus mr-2"></i> Add to Portfolio';
            btn.disabled = false;
        }, 3000);
    });`;
    
    content = content.replace(oldAddPortfolioJSMatch[0], newAddPortfolioJS);
} else {
    console.log("Could not find Add Portfolio JS match!");
}

// 4. Update instruction text above the box
content = content.replace(
    '<p class="text-xs text-gray-500 mb-5 leading-relaxed">Upload images to Cloudinary, Imgur, or any image host first, then paste the direct link below.</p>',
    '<p class="text-xs text-gray-500 mb-5 leading-relaxed">Select or drag & drop multiple images. They will be bulk-uploaded securely and added to your portfolio automatically.</p>'
);

fs.writeFileSync(file, content);
console.log("Updated ImgBB logic successfully!");
