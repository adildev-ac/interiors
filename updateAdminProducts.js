const fs = require('fs');
const file = 'c:\\Users\\adilm\\OneDrive\\Desktop\\Subtitles\\.PROJECT\\Interiors\\index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Add "Shop" to Nav
if (!content.includes('>Shop</a>')) {
    content = content.replace(
        '<a href="#about"    class="nav-link',
        '<a href="products.html" class="nav-link text-xs uppercase tracking-[0.2em] font-medium text-brand-400 hover:text-brand-300 transition-colors duration-300">Shop</a>\n                <a href="#about"    class="nav-link'
    );
    
    content = content.replace(
        '<a href="#about"    class="text-white',
        '<a href="products.html" class="text-brand-400 font-medium hover:text-brand-300 mobile-link tracking-widest text-sm uppercase">Shop</a>\n                <a href="#about"    class="text-white'
    );
}

// 2. Add "Add Product" HTML
const addProductHTML = `
            <!-- ── Add Product Item ── -->
            <div class="glass rounded-2xl p-6 mt-6">
                <h3 class="text-lg font-serif text-white mb-5 flex items-center gap-2"><i class="fas fa-couch text-brand-400 text-sm"></i> Add Product</h3>
                <div class="space-y-5">
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Upload Product Image (Required)</label>
                        <div id="admin-product-dropzone" class="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-brand-400 hover:bg-brand-500/5 transition-colors relative">
                            <input type="file" id="admin-input-product-files" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                            <i class="fas fa-image text-3xl text-brand-400 mb-3"></i>
                            <p id="admin-product-dropzone-text" class="text-sm text-gray-400 relative z-0">Drag image here or click to upload</p>
                        </div>
                    </div>
                    <div id="upload-product-status-container" class="hidden text-sm text-brand-300 mt-2 text-center bg-brand-500/10 border border-brand-500/20 p-2 rounded-lg">
                        Uploading...
                    </div>
                    
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2 mt-4">3D Model URL (Optional)</label>
                        <input type="url" id="admin-input-product-3d" placeholder="https://domain.com/model.glb" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors placeholder:text-gray-600">
                        <p class="text-[10px] text-gray-500 mt-1">If you have a 3D .glb file hosted online, paste the direct link here to enable 3D/AR view.</p>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2 mt-2">Product Name</label>
                        <input type="text" id="admin-input-product-title" placeholder="e.g. Velvet Sofa" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors placeholder:text-gray-600">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Price (₹)</label>
                        <input type="number" id="admin-input-product-price" placeholder="e.g. 45000" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-brand-400 focus:outline-none transition-colors placeholder:text-gray-600">
                    </div>

                    <button id="add-product-btn" class="w-full bg-brand-500 text-white py-3 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-600 transition-colors rounded-xl">
                        <i class="fas fa-plus mr-2"></i> Add Product
                    </button>
                </div>
            </div>
`;

if (!content.includes('id="admin-product-dropzone"')) {
    content = content.replace('<!-- ── Portfolio Manager ── -->', addProductHTML + '\n            <!-- ── Portfolio Manager ── -->');
}

// 3. Add Product JS
const addProductJS = `
    // ─── Image Upload Preview for Products ───
    const productFileInput = document.getElementById('admin-input-product-files');
    const productDropzoneText = document.getElementById('admin-product-dropzone-text');
    if(productFileInput) {
        productFileInput.addEventListener('change', () => {
            if(productFileInput.files.length > 0) {
                productDropzoneText.textContent = '1 file selected';
            } else {
                productDropzoneText.textContent = 'Drag image here or click to upload';
            }
        });
    }

    // ─── Add Product Item ───
    const addProductBtn = document.getElementById('add-product-btn');
    if(addProductBtn) {
        addProductBtn.addEventListener('click', async () => {
            const fileInput = document.getElementById('admin-input-product-files');
            const title = document.getElementById('admin-input-product-title').value.trim();
            const price = document.getElementById('admin-input-product-price').value.trim();
            const model3d = document.getElementById('admin-input-product-3d').value.trim();
            const btn = document.getElementById('add-product-btn');
            const status = document.getElementById('upload-product-status-container');

            if (fileInput.files.length === 0 || !title || !price) {
                const orig = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i> Image, Title, and Price Required';
                btn.classList.replace('bg-brand-500', 'bg-red-500');
                setTimeout(() => { btn.innerHTML = orig; btn.classList.replace('bg-red-500', 'bg-brand-500'); }, 2500);
                return;
            }

            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
            status.classList.remove('hidden');
            status.textContent = 'Uploading image to ImgBB...';
            
            const file = fileInput.files[0];
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
                    
                    if (window._fb) {
                        const fb = window._fb;
                        await fb.addDoc(fb.collection(fb.db, 'artifacts', fb.appId, 'public', 'data', 'products'), {
                            imageUrl: imgUrl, title, price, model3d, createdAt: Date.now()
                        });
                    }
                    status.textContent = 'Successfully added product!';
                    status.classList.replace('text-brand-300', 'text-green-400');
                    status.classList.replace('bg-brand-500/10', 'bg-green-500/10');
                    status.classList.replace('border-brand-500/20', 'border-green-500/20');
                }
            } catch(e) {
                status.textContent = 'Failed to upload image.';
                console.error(e);
            }

            setTimeout(() => {
                status.classList.add('hidden');
                status.classList.replace('text-green-400', 'text-brand-300');
                status.classList.replace('bg-green-500/10', 'bg-brand-500/10');
                status.classList.replace('border-green-500/20', 'border-brand-500/20');
                
                fileInput.value = '';
                productDropzoneText.textContent = 'Drag image here or click to upload';
                document.getElementById('admin-input-product-title').value = '';
                document.getElementById('admin-input-product-price').value = '';
                document.getElementById('admin-input-product-3d').value = '';
                
                btn.innerHTML = '<i class="fas fa-plus mr-2"></i> Add Product';
                btn.disabled = false;
            }, 3000);
        });
    }
`;

if (!content.includes('id="add-product-btn"')) {
    content = content.replace('// ─── Init ───', addProductJS + '\n    // ─── Init ───');
}

fs.writeFileSync(file, content);
console.log("Updated index.html admin UI successfully.");
