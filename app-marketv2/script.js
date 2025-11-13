document.addEventListener('DOMContentLoaded', () => {
  // --- Elemen utama ---
  const productGrid = document.getElementById('product-grid');
  const popularCategoriesGrid = document.getElementById('popular-categories-grid'); // <-- TAMBAHAN
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
  const checkoutBtn = document.getElementById('checkoutBtn');

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
  const checkoutList = document.getElementById('checkoutList');
  const checkoutTotal = document.getElementById('checkoutTotal');

  // --- Popup Sukses ---
  const successCard = document.getElementById('successCard');
  const successCardInner = document.getElementById('successCardInner');
  const closeCard = document.getElementById('closeCard');

  // --- Data utama ---
  let products = [];
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // 🔗 Ganti endpoint API jadi lokal
  const API_URL = 'api/api.php?action=get_products';
  const CATEGORY_API_URL = 'api/api.php?action=get_categories'; // <-- TAMBAHAN
  const SELLER_WHATSAPP_NUMBER = '6281335235999';

  // --- Ambil produk dari API lokal ---
  async function fetchProducts() {
    loader.style.display = 'block';
    errorMessage.classList.add('hidden');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('HTTP error ' + response.status);
      const data = await response.json();

      // Pastikan format data sesuai
      products = data.products || data; // kalau API return array langsung
      displayProducts(products);
      // populateCategories(products); // <-- HAPUS INI
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
      card.className = 'product-card bg-white rounded-lg shadow-sm overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow';
      card.dataset.productId = product.id;
      card.innerHTML = `
        <div class="p-4 h-48 flex items-center justify-center">
          <img src="${product.image}" alt="${product.nama}" class="max-h-full object-contain">
        </div>
        <div class="p-4 border-t-2 border-emerald-200 flex flex-col flex-grow">
          <span class="text-xs text-emerald-700 capitalize font-medium">${product.kategori || 'Umum'}</span>
          <h3 class="text-md font-semibold text-gray-800 mt-1 flex-grow">${product.nama.substring(0, 40)}...</h3>
          <div class="mt-4 flex justify-between items-center">
            <p class="text-lg font-bold text-emerald-700">Rp ${Number(product.harga).toLocaleString('id-ID')}</p>
            <button class="add-to-cart-btn bg-gradient-to-r from-emerald-200 to-teal-200 text-emerald-800 hover:from-emerald-300 hover:to-teal-300 rounded-full w-9 h-9 flex items-center justify-center transition-all" data-product-id="${product.id}">
              <i class="fas fa-cart-plus"></i>
            </button>
          </div>
        </div>
      `;
      productGrid.appendChild(card);
    });
  }

  // --- HAPUS FUNGSI populateCategories ---
  // function populateCategories(products) { ... }

  // --- TAMBAH FUNGSI BARU: Ambil & Tampilkan Kategori ---
  async function fetchAndDisplayCategories() {
    // Definisikan ikon & warna (sesuaikan slug dengan database Anda)
    const categoryIcons = {
      'bumbu-dapur': 'fas fa-pepper-hot',
      'sayuran': 'fas fa-carrot',
      'buah-buahan': 'fas fa-lemon',
      'protein-hewani': 'fas fa-egg',
      'seafood': 'fas fa-fish',
      'default': 'fas fa-star' // Fallback
    };
    const categoryColors = {
      'bumbu-dapur': 'bg-red-200 text-red-600',
      'sayuran': 'bg-green-200 text-green-600',
      'buah-buahan': 'bg-yellow-200 text-yellow-600',
      'protein-hewani': 'bg-blue-200 text-blue-600',
      'seafood': 'bg-purple-200 text-purple-600',
      'default': 'bg-gray-200 text-gray-600'
    };

    try {
      const response = await fetch(CATEGORY_API_URL);
      if (!response.ok) throw new Error('Gagal memuat kategori');
      const data = await response.json();

      if (data.success && data.categories) {
        const categories = data.categories;

        // 1. Tampilkan Kategori Populer (5 teratas)
        popularCategoriesGrid.innerHTML = ''; // Hapus 'Memuat kategori...'
        categories.slice(0, 5).forEach(cat => {
          const icon = categoryIcons[cat.slug] || categoryIcons['default'];
          const color = categoryColors[cat.slug] || categoryColors['default'];
          
          const link = document.createElement('a');
          link.href = '#';
          link.className = 'category-link flex flex-col items-center p-3 rounded-lg hover:bg-emerald-100 transition w-20 cursor-pointer';
          link.dataset.categorySlug = cat.slug;
          
          link.innerHTML = `
            <div class="${color} p-3 rounded-full mb-1"><i class="${icon} fa-lg"></i></div>
            <span class="text-sm font-medium text-center">${cat.name}</span>
          `;
          popularCategoriesGrid.appendChild(link);
        });

        // 2. Isi Dropdown Filter Kategori
        categorySelect.innerHTML = '<option value="all">Semua Kategori</option>'; // Reset
        categories.forEach(cat => {
          const opt = document.createElement('option');
          opt.value = cat.slug;
          opt.textContent = `${cat.name} (${cat.product_count})`; // Tampilkan nama + jumlah produk
          categorySelect.appendChild(opt);
        });
        
      } else {
        popularCategoriesGrid.innerHTML = '<p class="text-slate-500 w-full">Gagal memuat kategori.</p>';
      }
    } catch (err) {
      console.error(err);
      popularCategoriesGrid.innerHTML = '<p class="text-red-500 w-full">Terjadi kesalahan.</p>';
    }
  }


  // --- Filter produk ---
  function filterProducts() {
    const query = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    let filtered = products.filter(p => p.nama.toLowerCase().includes(query));
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.kategori === selectedCategory);
    }
    displayProducts(filtered);
  }

  // --- Modal detail produk ---
  function showProductDetail(id) {
    const p = products.find(x => x.id == id);
    if (!p) return;
    modalImage.src = p.image;
    modalCategory.textContent = p.kategori || 'Umum';
    modalProductName.textContent = p.nama;
    modalPrice.textContent = `Rp ${Number(p.harga).toLocaleString('id-ID')}`;
    modalDescription.textContent = p.deskripsi || 'Tidak ada deskripsi.';
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
      showToast(`${product.nama.substring(0, 20)}... ditambahkan ke keranjang!`);
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
    toast.className = 'toast-notification bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-lg mt-2';
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
      const price = Number(item.harga);
      total += price;
      const div = document.createElement('div');
      div.className = 'flex justify-between items-center bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-lg border border-emerald-200';
      div.innerHTML = `
        <div class="flex items-center space-x-3">
          <img src="${item.image}" alt="${item.nama}" class="w-12 h-12 object-contain rounded">
          <div>
            <p class="font-semibold text-gray-800">${item.nama.substring(0, 30)}...</p>
            <p class="text-sm text-emerald-700">Rp ${price.toLocaleString('id-ID')}</p>
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

  // --- Buka/tutup cart modal ---
  cartBtn.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  closeCartBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });

  cartModal.addEventListener('click', e => {
    if (e.target === cartModal) {
      cartModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });

  // --- Checkout ---
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Keranjang masih kosong!');
      return;
    }
    
    // Tampilkan ringkasan di checkout modal
    checkoutList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const price = Number(item.harga);
      total += price;
      const li = document.createElement('li');
      li.className = 'flex justify-between';
      li.innerHTML = `
        <span>${item.nama.substring(0, 30)}...</span>
        <span class="text-emerald-700 font-semibold">Rp ${price.toLocaleString('id-ID')}</span>
      `;
      checkoutList.appendChild(li);
    });
    checkoutTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    
    cartModal.classList.add('hidden');
    checkoutModal.classList.remove('hidden');
  });

  cancelCheckout.addEventListener('click', () => {
    checkoutModal.classList.add('hidden');
    cartModal.classList.remove('hidden');
  });

  checkoutModal.addEventListener('click', e => {
    if (e.target === checkoutModal) {
      checkoutModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });

  // --- Submit Checkout ---
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const nohp = document.getElementById('nohp').value;
    const catatan = document.getElementById('catatan').value || '-';
    
    // Hitung total
    let total = 0;
    let itemList = '';
    cart.forEach((item, index) => {
      const price = Number(item.harga);
      total += price;
      itemList += `${index + 1}. ${item.nama} - Rp ${price.toLocaleString('id-ID')}%0A`;
    });
    
    // Kirim ke WhatsApp
    const message = `*PESANAN BARU - GALANT* 🌿%0A%0A` +
                    `*Nama:* ${nama}%0A` +
                    `*Alamat:* ${alamat}%0A` +
                    `*No. HP:* ${nohp}%0A` +
                    `*Catatan:* ${catatan}%0A%0A` +
                    `*Pesanan:*%0A${itemList}%0A` +
                    `*Total: Rp ${total.toLocaleString('id-ID')}*`;
    
    const waUrl = `https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${message}`;
    
    // Tampilkan success card
    document.getElementById('cardNama').textContent = nama;
    document.getElementById('cardAlamat').textContent = alamat;
    document.getElementById('cardNoHp').textContent = nohp;
    document.getElementById('cardCatatan').textContent = catatan;
    document.getElementById('cardTotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;
    
    checkoutModal.classList.add('hidden');
    successCard.classList.remove('hidden');
    
    // Animasi
    setTimeout(() => {
      successCardInner.classList.remove('scale-95', 'opacity-0');
      successCardInner.classList.add('scale-100', 'opacity-100');
    }, 100);
    
    // Buka WhatsApp setelah delay
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1500);
    
    // Reset form & cart
    checkoutForm.reset();
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  });

  // --- Tutup success card ---
  closeCard.addEventListener('click', () => {
    successCardInner.classList.remove('scale-100', 'opacity-100');
    successCardInner.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      successCard.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 300);
  });

  successCard.addEventListener('click', e => {
    if (e.target === successCard) {
      closeCard.click();
    }
  });

  // --- Event produk ---
  searchInput.addEventListener('input', filterProducts);
  categorySelect.addEventListener('change', filterProducts);
  productGrid.addEventListener('click', e => {
    const addBtn = e.target.closest('.add-to-cart-btn');
    if (addBtn) {
      e.stopPropagation();
      return addToCart(addBtn.dataset.productId);
    }
    const card = e.target.closest('.product-card');
    if (card) showProductDetail(card.dataset.productId);
  });

  // <-- TAMBAHAN: Event listener untuk klik kategori populer -->
  popularCategoriesGrid.addEventListener('click', e => {
    e.preventDefault();
    const categoryLink = e.target.closest('.category-link');
    if (categoryLink) {
      const slug = categoryLink.dataset.categorySlug;
      categorySelect.value = slug; // Atur nilai dropdown
      filterProducts(); // Panggil fungsi filter yang sudah ada
      
      // Scroll ke grid produk untuk UX yang lebih baik
      document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
    if (e.key === 'Escape') {
      if (!modal.classList.contains('hidden')) hideModal();
      if (!cartModal.classList.contains('hidden')) {
        cartModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
      if (!checkoutModal.classList.contains('hidden')) {
        checkoutModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    }
  });

  // --- Jalankan ---
  fetchProducts();
  fetchAndDisplayCategories(); // <-- TAMBAHAN
  updateCart();

  // ========== HERO SLIDER ==========
  console.log('Initializing hero slider...');
  
  let currentSlide = 0;
  const slider = document.getElementById('heroSlider');
  const dots = document.querySelectorAll('.slider-dot'); // <-- SEKARANG BERHASIL
  const totalSlides = 3;

  console.log('Slider element:', slider);
  console.log('Dots found:', dots.length); // <-- SEHARUSNYA 3

  function goToSlide(index) {
    currentSlide = index;
    if (slider) {
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      console.log('Moving to slide:', currentSlide);
    }
    
    // Update dots
    dots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.remove('opacity-50');
        dot.classList.add('opacity-100');
      } else {
        dot.classList.remove('opacity-100');
        dot.classList.add('opacity-50');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  }

  // Navigation buttons
  const nextBtn = document.getElementById('nextSlide');
  const prevBtn = document.getElementById('prevSlide');
  
  console.log('Next button:', nextBtn);
  console.log('Prev button:', prevBtn);
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      console.log('Next button clicked');
      nextSlide();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      console.log('Prev button clicked');
      prevSlide();
    });
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      console.log('Dot clicked:', index);
      goToSlide(index);
    });
  });

  // Auto-play slider
  if (slider) {
    console.log('Starting auto-play...');
    setInterval(nextSlide, 5000);
  }
});
