const API = 'api/api.php';

console.log('Admin.js loaded successfully');

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  const bgColor = type === 'success' ? 'bg-emerald-700' : 'bg-red-600';
  toast.className = `${bgColor} text-white px-4 py-3 rounded-lg shadow-lg mt-2 flex items-center gap-2`;
  toast.innerHTML = `
    <i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  document.getElementById('toast-container').appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ========== TAB SWITCHING ==========
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired');
  
  const tabProducts = document.getElementById('tabProducts');
  const tabCategories = document.getElementById('tabCategories');
  
  console.log('tabProducts:', tabProducts);
  console.log('tabCategories:', tabCategories);
  
  if (tabProducts) {
    tabProducts.addEventListener('click', () => {
      document.getElementById('productsTab').classList.remove('hidden');
      document.getElementById('categoriesTab').classList.add('hidden');
      tabProducts.className = 'tab-btn flex-1 py-3 rounded-lg font-semibold transition bg-gradient-to-r from-emerald-700 to-teal-700 text-white';
      tabCategories.className = 'tab-btn flex-1 py-3 rounded-lg font-semibold transition text-slate-700 hover:bg-emerald-100';
    });
  }

  if (tabCategories) {
    tabCategories.addEventListener('click', () => {
      document.getElementById('categoriesTab').classList.remove('hidden');
      document.getElementById('productsTab').classList.add('hidden');
      tabCategories.className = 'tab-btn flex-1 py-3 rounded-lg font-semibold transition bg-gradient-to-r from-emerald-700 to-teal-700 text-white';
      tabProducts.className = 'tab-btn flex-1 py-3 rounded-lg font-semibold transition text-slate-700 hover:bg-emerald-100';
      loadCategories();
    });
  }

  // Auto-generate slug from category name
  const categoryNameInput = document.getElementById('category-name');
  if (categoryNameInput) {
    categoryNameInput.addEventListener('input', (e) => {
      const slug = e.target.value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      document.getElementById('category-slug').value = slug;
    });
  }

  // Load initial data
  loadProducts();
  loadCategoryDropdowns();
});

// ========== CATEGORIES ==========

// Load categories into dropdowns
async function loadCategoryDropdowns() {
  try {
    const res = await fetch(`${API}?action=get_categories`);
    const data = await res.json();
    
    const addSelect = document.getElementById('kategori');
    const editSelect = document.getElementById('edit-kategori');
    
    if (addSelect) {
      addSelect.innerHTML = '<option value="">Pilih Kategori</option>';
      if (data.categories && data.categories.length > 0) {
        data.categories.forEach(cat => {
          addSelect.innerHTML += `<option value="${cat.slug}">${cat.name}</option>`;
        });
      }
    }
    
    if (editSelect) {
      editSelect.innerHTML = '<option value="">Pilih Kategori</option>';
      if (data.categories && data.categories.length > 0) {
        data.categories.forEach(cat => {
          editSelect.innerHTML += `<option value="${cat.slug}">${cat.name}</option>`;
        });
      }
    }
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

// Load categories table
async function loadCategories() {
  try {
    const res = await fetch(`${API}?action=get_categories`);
    const data = await res.json();
    const table = document.getElementById('categoryTable');
    
    if (!table) return;
    
    table.innerHTML = '';

    if (!data.categories || data.categories.length === 0) {
      table.innerHTML = `<tr><td colspan="5" class="p-4 text-slate-500">
        <i class="fa-solid fa-tags text-3xl mb-2"></i><br>
        Belum ada kategori. Tambahkan kategori pertama Anda!
      </td></tr>`;
      return;
    }

    data.categories.forEach(cat => {
      table.innerHTML += `
        <tr class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-colors">
          <td class="p-3 border border-emerald-200 font-semibold text-slate-700">${cat.id}</td>
          <td class="p-3 border border-emerald-200 text-left font-semibold">${cat.name}</td>
          <td class="p-3 border border-emerald-200">
            <code class="bg-slate-100 px-2 py-1 rounded text-xs">${cat.slug}</code>
          </td>
          <td class="p-3 border border-emerald-200">
            <span class="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
              ${cat.product_count || 0} produk
            </span>
          </td>
          <td class="p-3 border border-emerald-200 space-x-2">
            <button onclick="showEditCategory(${cat.id})" class="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg transition shadow">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button onclick="deleteCategory(${cat.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition shadow">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>`;
    });
  } catch (error) {
    showToast('Gagal memuat kategori', 'error');
    console.error(error);
  }
}

// Add category
document.addEventListener('DOMContentLoaded', () => {
  const addCategoryForm = document.getElementById('addCategoryForm');
  if (addCategoryForm) {
    addCategoryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const data = {
        name: document.getElementById('category-name').value,
        slug: document.getElementById('category-slug').value
      };

      try {
        const res = await fetch(`${API}?action=add_category`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        const result = await res.json();
        
        if (res.ok && result.success) {
          showToast('Kategori berhasil ditambahkan! 🌿', 'success');
          addCategoryForm.reset();
          loadCategories();
          loadCategoryDropdowns();
        } else {
          showToast(result.error || 'Gagal menambahkan kategori', 'error');
        }
      } catch (error) {
        showToast('Gagal menambahkan kategori', 'error');
        console.error(error);
      }
    });
  }
});

// Show edit category modal
async function showEditCategory(id) {
  try {
    const res = await fetch(`${API}?action=get_category&id=${id}`);
    const data = await res.json();

    document.getElementById('edit-category-id').value = data.id;
    document.getElementById('edit-category-name').value = data.name;
    document.getElementById('edit-category-slug').value = data.slug;

    document.getElementById('editCategoryModal').classList.remove('hidden');
  } catch (error) {
    showToast('Gagal memuat data kategori', 'error');
    console.error(error);
  }
}

// Edit category
document.addEventListener('DOMContentLoaded', () => {
  const editCategoryForm = document.getElementById('editCategoryForm');
  if (editCategoryForm) {
    editCategoryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        id: document.getElementById('edit-category-id').value,
        name: document.getElementById('edit-category-name').value,
        slug: document.getElementById('edit-category-slug').value
      };

      try {
        const res = await fetch(`${API}?action=update_category`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok && result.success) {
          document.getElementById('editCategoryModal').classList.add('hidden');
          loadCategories();
          loadCategoryDropdowns();
          showToast('Kategori berhasil diperbarui! ✓', 'success');
        } else {
          showToast(result.error || 'Gagal memperbarui kategori', 'error');
        }
      } catch (error) {
        showToast('Gagal memperbarui kategori', 'error');
        console.error(error);
      }
    });
  }

  // Cancel edit category
  const cancelEditCategory = document.getElementById('cancelEditCategory');
  if (cancelEditCategory) {
    cancelEditCategory.addEventListener('click', () => {
      document.getElementById('editCategoryModal').classList.add('hidden');
    });
  }
});

// Delete category
async function deleteCategory(id) {
  if (!confirm('Yakin ingin menghapus kategori ini? Produk dengan kategori ini akan tetap ada.')) return;

  try {
    const res = await fetch(`${API}?action=delete_category`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    const result = await res.json();

    if (res.ok && result.success) {
      loadCategories();
      loadCategoryDropdowns();
      showToast('Kategori berhasil dihapus', 'success');
    } else {
      showToast(result.error || 'Gagal menghapus kategori', 'error');
    }
  } catch (error) {
    showToast('Gagal menghapus kategori', 'error');
    console.error(error);
  }
}

// ========== PRODUCTS ==========

// Load products
async function loadProducts() {
  try {
    const res = await fetch(`${API}?action=get_products`);
    const data = await res.json();
    const table = document.getElementById('productTable');
    
    if (!table) return;
    
    table.innerHTML = '';

    if (!data.products || data.products.length === 0) {
      table.innerHTML = `<tr><td colspan="6" class="p-4 text-slate-500">
        <i class="fa-solid fa-box-open text-3xl mb-2"></i><br>
        Belum ada produk. Tambahkan produk pertama Anda!
      </td></tr>`;
      return;
    }

    data.products.forEach(p => {
      table.innerHTML += `
        <tr class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-colors">
          <td class="p-3 border border-emerald-200 font-semibold text-slate-700">${p.id}</td>
          <td class="p-3 border border-emerald-200 text-left">${p.nama}</td>
          <td class="p-3 border border-emerald-200 text-emerald-700 font-semibold">Rp ${Number(p.harga).toLocaleString('id-ID')}</td>
          <td class="p-3 border border-emerald-200">
            <span class="bg-gradient-to-r from-emerald-200 to-teal-200 text-emerald-900 px-2 py-1 rounded-full text-xs font-medium">
              ${p.kategori}
            </span>
          </td>
          <td class="p-3 border border-emerald-200">
            <img src="${p.image}" class="w-16 h-16 object-cover rounded-lg mx-auto border-2 border-emerald-300 shadow-sm">
          </td>
          <td class="p-3 border border-emerald-200 space-x-2">
            <button onclick="showEdit(${p.id})" class="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg transition shadow">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button onclick="deleteProduct(${p.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition shadow">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>`;
    });
  } catch (error) {
    showToast('Gagal memuat produk', 'error');
    console.error(error);
  }
}

// Add product
document.addEventListener('DOMContentLoaded', () => {
  const addForm = document.getElementById('addForm');
  if (addForm) {
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const data = {
        nama: document.getElementById('nama').value,
        harga: document.getElementById('harga').value,
        deskripsi: document.getElementById('deskripsi').value,
        kategori: document.getElementById('kategori').value,
        image: document.getElementById('image').value
      };

      try {
        const res = await fetch(`${API}?action=add_product`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        const result = await res.json();
        
        if (res.ok && result.success) {
          addForm.reset();
          loadProducts();
          showToast('Produk berhasil ditambahkan! 🌿', 'success');
        } else {
          showToast(result.error || 'Gagal menambahkan produk', 'error');
        }
      } catch (error) {
        showToast('Gagal menambahkan produk', 'error');
        console.error(error);
      }
    });
  }
});

// Show edit product modal
async function showEdit(id) {
  try {
    const res = await fetch(`${API}?action=get_product&id=${id}`);
    const data = await res.json();

    document.getElementById('edit-id').value = data.id;
    document.getElementById('edit-nama').value = data.nama;
    document.getElementById('edit-harga').value = data.harga;
    document.getElementById('edit-deskripsi').value = data.deskripsi;
    document.getElementById('edit-kategori').value = data.kategori;
    document.getElementById('edit-image').value = data.image;

    document.getElementById('editModal').classList.remove('hidden');
  } catch (error) {
    showToast('Gagal memuat data produk', 'error');
    console.error(error);
  }
}

// Edit product
document.addEventListener('DOMContentLoaded', () => {
  const editForm = document.getElementById('editForm');
  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        id: document.getElementById('edit-id').value,
        nama: document.getElementById('edit-nama').value,
        harga: document.getElementById('edit-harga').value,
        deskripsi: document.getElementById('edit-deskripsi').value,
        kategori: document.getElementById('edit-kategori').value,
        image: document.getElementById('edit-image').value
      };

      try {
        const res = await fetch(`${API}?action=update_product`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok && result.success) {
          document.getElementById('editModal').classList.add('hidden');
          loadProducts();
          showToast('Produk berhasil diperbarui! ✓', 'success');
        } else {
          showToast(result.error || 'Gagal memperbarui produk', 'error');
        }
      } catch (error) {
        showToast('Gagal memperbarui produk', 'error');
        console.error(error);
      }
    });
  }

  // Cancel edit product
  const cancelEdit = document.getElementById('cancelEdit');
  if (cancelEdit) {
    cancelEdit.addEventListener('click', () => {
      document.getElementById('editModal').classList.add('hidden');
    });
  }
});

// Delete product
async function deleteProduct(id) {
  if (!confirm('Yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.')) return;

  try {
    const res = await fetch(`${API}?action=delete_product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    const result = await res.json();

    if (res.ok && result.success) {
      loadProducts();
      showToast('Produk berhasil dihapus', 'success');
    } else {
      showToast(result.error || 'Gagal menghapus produk', 'error');
    }
  } catch (error) {
    showToast('Gagal menghapus produk', 'error');
    console.error(error);
  }
}

// Close modals on outside click
document.addEventListener('DOMContentLoaded', () => {
  const editModal = document.getElementById('editModal');
  const editCategoryModal = document.getElementById('editCategoryModal');

  if (editModal) {
    editModal.addEventListener('click', (e) => {
      if (e.target.id === 'editModal') {
        editModal.classList.add('hidden');
      }
    });
  }

  if (editCategoryModal) {
    editCategoryModal.addEventListener('click', (e) => {
      if (e.target.id === 'editCategoryModal') {
        editCategoryModal.classList.add('hidden');
      }
    });
  }

  // Close modals on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (editModal && !editModal.classList.contains('hidden')) {
        editModal.classList.add('hidden');
      }
      if (editCategoryModal && !editCategoryModal.classList.contains('hidden')) {
        editCategoryModal.classList.add('hidden');
      }
    }
  });
});