document.addEventListener('DOMContentLoaded', () => {
  // --- Elemen utama ---
  const productGrid = document.getElementById('product-grid');
  const loader = document.getElementById('loader');
  const errorMessage = document.getElementById('error-message');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const cartBtn = document.getElementById('cartBtn');
  const cartModal = document.getElementById('cartModal');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  const toastContainer = document.getElementById('toast-container');

  // --- Modal Produk ---
  const modal = document.getElementById('productModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalImage = document.getElementById('modal-image');
  const modalCategory = document.getElementById('modal-category');
  const modalProductName = document.getElementById('modal-product-name');
  const modalPrice = document.getElementById('modal-price');
  const modalDescription = document.getElementById('modal-description');
  const modalAddToCartBtn = document.getElementById('modal-add-to-cart');

  // --- Modal Checkout ---
  const checkoutModal = document.getElementById('checkoutModal');
  const checkoutForm = document.getElementById('checkoutForm');
  const cancelCheckout = document.getElementById('cancelCheckout');

  // --- Popup Sukses ---
  const successCard = document.getElementById('successCard');
  const successCardInner = document.getElementById('successCardInner');
  const closeCard = document.getElementById('closeCard');

  // --- Data utama ---
  let products = [];
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const API_URL = 'https://fakestoreapi.com/products';

  // --- Ambil produk ---
  async function fetchProducts() {
    loader.style.display = 'block';
    errorMessage.classList.add('hidden');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('HTTP error ' + response.status);
      products = await response.json();
      displayProducts(products);
      populateCategories(products);
    } catch (err) {
      console.error(err);
      errorMessage.classList.remove('hidden');
    } finally {
      loader.style.display = 'none';
    }
  }

  // --- Tampilkan produk ---
  function displayProducts(list) {
    productGrid.innerHTML = '';
    if (list.length === 0) {
      productGrid.innerHTML = `<p class="text-center text-gray-500 col-span-full">Tidak ada produk ditemukan.</p>`;
      return;
    }
    list.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card bg-white rounded-lg shadow-sm overflow-hidden flex flex-col cursor-pointer';
      card.dataset.productId = product.id;
      card.innerHTML = `
        <div class="p-4 h-48 flex items-center justify-center">
          <img src="${product.image}" alt="${product.title}" class="max-h-full object-contain">
        </div>
        <div class="p-4 border-t border-gray-200 flex flex-col flex-grow">
          <span class="text-xs text-gray-500 capitalize">${product.category}</span>
          <h3 class="text-md font-semibold text-gray-800 mt-1 flex-grow">${product.title.substring(0, 40)}...</h3>
          <div class="mt-4 flex justify-between items-center">
            <p class="text-lg font-bold text-[#0096C7]">Rp ${Math.round(product.price * 15000).toLocaleString('id-ID')}</p>
            <button class="add-to-cart-btn bg-[#CAF0F8] text-[#0096C7] hover:bg-[#ADE8F4] rounded-full w-9 h-9 flex items-center justify-center transition-colors" data-product-id="${product.id}">
              <i class="fas fa-cart-plus"></i>
            </button>
          </div>
        </div>
      `;
      productGrid.appendChild(card);
    });
  }

  // --- Isi kategori ---
  function populateCategories(products) {
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      categorySelect.appendChild(opt);
    });
  }

  // --- Filter produk ---
  function filterProducts() {
    const query = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    let filtered = products.filter(p => p.title.toLowerCase().includes(query));
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    displayProducts(filtered);
  }

  // --- Modal detail produk ---
  function showProductDetail(id) {
    const p = products.find(x => x.id == id);
    if (!p) return;
    modalImage.src = p.image;
    modalCategory.textContent = p.category;
    modalProductName.textContent = p.title;
    modalPrice.textContent = `Rp ${Math.round(p.price * 15000).toLocaleString('id-ID')}`;
    modalDescription.textContent = p.description;
    modalAddToCartBtn.dataset.productId = p.id;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function hideModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  // --- Tambah ke keranjang ---
  function addToCart(id) {
    const product = products.find(p => p.id == id);
    if (product) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
      showToast(`${product.title.substring(0, 20)}... ditambahkan ke keranjang!`);
    }
  }

  // --- Update tampilan keranjang ---
  function updateCart() {
    cartCount.textContent = cart.length;
    renderCart();
  }

  // --- Tampilkan toast ---
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification bg-[#0096C7] text-white px-4 py-2 rounded-lg shadow-lg mt-2';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // --- Render isi keranjang ---
  function renderCart() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center">Keranjang kosong.</p>';
      cartTotal.textContent = 'Rp 0';
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      const price = Math.round(item.price * 15000);
      total += price;
      const div = document.createElement('div');
      div.className = 'flex justify-between items-center bg-[#EAF7F0] p-3 rounded-lg';
      div.innerHTML = `
        <div class="flex items-center space-x-3">
          <img src="${item.image}" alt="${item.title}" class="w-12 h-12 object-contain rounded">
          <div>
            <p class="font-semibold text-gray-800">${item.title.substring(0, 30)}...</p>
            <p class="text-sm text-[#0096C7]">Rp ${price.toLocaleString('id-ID')}</p>
          </div>
        </div>
        <button class="text-red-500 hover:text-red-700 remove-btn" data-index="${index}">
          <i class="fas fa-trash"></i>
        </button>
      `;
      cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
  }

  // --- Hapus item dari keranjang ---
  cartItemsContainer.addEventListener('click', e => {
    const removeBtn = e.target.closest('.remove-btn');
    if (removeBtn) {
      const index = removeBtn.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
      showToast('Item dihapus dari keranjang.');
    }
  });

  // --- Buka/Tutup modal keranjang ---
  cartBtn.addEventListener('click', () => {
    renderCart();
    cartModal.classList.remove('hidden');
  });
  closeCartBtn.addEventListener('click', () => cartModal.classList.add('hidden'));
  cartModal.addEventListener('click', e => {
    if (e.target === cartModal) cartModal.classList.add('hidden');
  });

  // === Modal Form Checkout ===
  function renderCheckoutItems() {
    const checkoutList = document.getElementById('checkoutList');
    const checkoutTotal = document.getElementById('checkoutTotal');
    checkoutList.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
      const harga = Math.round(item.price * 15000);
      total += harga;

      const div = document.createElement('div');
      div.className = 'flex items-center justify-between bg-[#e6fff4] p-2 rounded-md';
      div.innerHTML = `
        <div class="flex items-center gap-2">
          <img src="${item.image}" class="w-10 h-10 object-contain rounded">
          <span class="text-sm font-medium text-gray-800">${item.title.substring(0, 28)}...</span>
        </div>
        <span class="text-sm font-semibold text-[#0096C7]">Rp ${harga.toLocaleString('id-ID')}</span>
      `;
      checkoutList.appendChild(div);
    });

    checkoutTotal.textContent = 'Rp ' + total.toLocaleString('id-ID');
  }

  // Saat klik tombol checkout
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) return showToast('Keranjang masih kosong!');
    renderCheckoutItems();
    cartModal.classList.add('hidden');
    checkoutModal.classList.remove('hidden');
  });

  // Tutup checkout modal
  cancelCheckout.addEventListener('click', () => {
    checkoutModal.classList.add('hidden');
  });

  // Saat kirim form checkout
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('nama').value.trim();
    const alamat = document.getElementById('alamat').value.trim();
    const nohp = document.getElementById('nohp').value.trim();
    const catatan = document.getElementById('catatan').value.trim();
    const total = document.getElementById('checkoutTotal').textContent;

    if (!nama || !alamat || !nohp) {
      showToast('Harap isi semua data wajib!');
      return;
    }

    // 🧾 Tampilkan popup sukses
    document.getElementById('cardNama').textContent = nama;
    document.getElementById('cardAlamat').textContent = alamat;
    document.getElementById('cardNoHp').textContent = nohp;
    document.getElementById('cardCatatan').textContent = catatan || '-';
    document.getElementById('cardTotal').textContent = total;

    checkoutModal.classList.add('hidden');
    successCard.classList.remove('hidden');

    // animasi muncul
    setTimeout(() => {
      successCardInner.classList.remove('opacity-0', 'scale-95');
      successCardInner.classList.add('opacity-100', 'scale-100');
    }, 100);

    // reset cart
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
  });

  // Tutup popup sukses
  closeCard.addEventListener('click', () => {
    successCard.classList.add('hidden');
  });

  // --- Event tambahan ---
  searchInput.addEventListener('input', filterProducts);
  categorySelect.addEventListener('change', filterProducts);
  productGrid.addEventListener('click', e => {
    const addBtn = e.target.closest('.add-to-cart-btn');
    if (addBtn) return addToCart(addBtn.dataset.productId);
    const card = e.target.closest('.product-card');
    if (card) showProductDetail(card.dataset.productId);
  });
  modalAddToCartBtn.addEventListener('click', () => {
    addToCart(modalAddToCartBtn.dataset.productId);
    hideModal();
  });
  closeModalBtn.addEventListener('click', hideModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) hideModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hideModal();
  });

  // --- Jalankan ---
  fetchProducts();
  updateCart();
});
