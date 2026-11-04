// ==========================================================================
// TRIGU'S BAKERY - CLIENT APPLICATION LOGIC
// ==========================================================================

// Global state
let currentConfig = { ...DEFAULT_CONFIG };
let currentProducts = [...INITIAL_PRODUCTS];
let cart = [];
let activeCategory = 'all';
let searchQuery = '';
let orderType = 'delivery'; // 'delivery' | 'pickup' | 'dinein'
let paymentMethod = 'pagomovil'; // 'pagomovil' | 'efectivo' | 'zelle' | 'puntoventa'
let currentSlideIndex = 0;
let slideInterval = null;
let activeModalProduct = null;
let currentTheme = localStorage.getItem('trigus_theme') || 'dark';

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadConfig();
  applyTheme(currentTheme);
  loadProducts();
  loadCart();
  renderHeroSlider();
  renderCategories();
  renderProducts();
  setupEventListeners();
  updateCartUI();
  applyDynamicTheme();
});

// Theme Management (Dark / Light mode)
function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('trigus_theme', theme);
  const icon = document.getElementById('themeToggleIcon');
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    if (icon) icon.textContent = '🌙';
  } else {
    document.body.classList.remove('light-theme');
    if (icon) icon.textContent = '☀️';
  }
}

function toggleTheme() {
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  showToast(nextTheme === 'light' ? '☀️ Modo Claro Activado' : '🌙 Modo Oscuro Activado');
}

// Load configuration from localStorage
function loadConfig() {
  const saved = localStorage.getItem('trigus_config');
  if (saved) {
    try {
      currentConfig = { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Error loading config:', e);
    }
  }
}

// Load products from localStorage or defaults
function loadProducts() {
  const saved = localStorage.getItem('trigus_custom_products');
  if (saved) {
    try {
      currentProducts = JSON.parse(saved);
    } catch (e) {
      console.error('Error loading custom products:', e);
    }
  }
}

// Load cart from localStorage
function loadCart() {
  const saved = localStorage.getItem('trigus_cart');
  if (saved) {
    try {
      cart = JSON.parse(saved);
    } catch (e) {
      cart = [];
    }
  }
}

function saveCart() {
  localStorage.setItem('trigus_cart', JSON.stringify(cart));
}

// Apply colors from config
function applyDynamicTheme() {
  const c = currentConfig.colors;
  if (!c) return;
  const root = document.documentElement;
  if (c.primary) {
    root.style.setProperty('--primary-color', c.primary);
    root.style.setProperty('--primary-hover', adjustColorBrightness(c.primary, -20));
    // extract rgb
    const rgb = hexToRgb(c.primary);
    if (rgb) root.style.setProperty('--primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  }
  if (c.secondary) root.style.setProperty('--secondary-color', c.secondary);
  if (c.bgDark) root.style.setProperty('--bg-dark', c.bgDark);
  if (c.cardBg) root.style.setProperty('--card-bg', c.cardBg);

  // Update business name & texts
  const brandTitle = document.getElementById('brandNameTitle');
  if (brandTitle) brandTitle.innerHTML = `${currentConfig.restaurantName} <span>Bakery</span>`;
  const brandSlogan = document.getElementById('brandSloganText');
  if (brandSlogan) brandSlogan.textContent = currentConfig.slogan;
  const whatsappDisplay = document.getElementById('footerWhatsappNumber');
  if (whatsappDisplay) whatsappDisplay.textContent = currentConfig.whatsappDisplay || currentConfig.whatsappNumber;

  // Update BCV rate pill in top bar
  const bcvPill = document.getElementById('headerBcvRateValue');
  const activeBcvRate = Number(currentConfig.bcvRate || currentConfig.exchangeRateBs || 45.20);
  if (bcvPill) bcvPill.textContent = `${activeBcvRate.toFixed(2)} Bs.`;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function adjustColorBrightness(hex, percent) {
  let num = parseInt(hex.replace('#',''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

// ==========================================================================
// HERO HORIZONTAL SLIDER
// ==========================================================================
function renderHeroSlider() {
  const wrapper = document.getElementById('sliderWrapper');
  const dotsContainer = document.getElementById('sliderDots');
  if (!wrapper || !dotsContainer) return;

  const slides = currentConfig.heroSlides || [];
  wrapper.innerHTML = '';
  dotsContainer.innerHTML = '';

  slides.forEach((slide, index) => {
    // Slide element
    const slideDiv = document.createElement('div');
    slideDiv.className = 'slide';
    slideDiv.innerHTML = `
      <img src="${slide.image}" alt="${slide.title}" class="slide-img-bg" onerror="this.src='assets/img/menu-cover.jpg'" />
      <div class="slide-gradient-overlay"></div>
      <div class="slide-content">
        <span class="slide-tag">🔥 ${slide.tag}</span>
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle">${slide.subtitle}</p>
        <button class="slide-btn" onclick="scrollToCategory('${slide.categoryTarget || 'all'}')">
          <span>Ver Platos</span> ➔
        </button>
      </div>
    `;
    wrapper.appendChild(slideDiv);

    // Dot element
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
  });

  currentSlideIndex = 0;
  startSliderAutoPlay();
}

function startSliderAutoPlay() {
  stopSliderAutoPlay();
  slideInterval = setInterval(() => {
    nextSlide();
  }, 3800);
}

function stopSliderAutoPlay() {
  if (slideInterval) clearInterval(slideInterval);
}

function nextSlide() {
  const slides = currentConfig.heroSlides || [];
  if (slides.length <= 1) return;
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  updateSliderPosition();
}

function prevSlide() {
  const slides = currentConfig.heroSlides || [];
  if (slides.length <= 1) return;
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  updateSliderPosition();
}

function goToSlide(index) {
  currentSlideIndex = index;
  updateSliderPosition();
}

function updateSliderPosition() {
  const wrapper = document.getElementById('sliderWrapper');
  if (!wrapper) return;
  wrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

  const dots = document.querySelectorAll('.slider-dots .dot');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentSlideIndex);
  });
}

function scrollToCategory(catId) {
  selectCategory(catId);
  const target = document.getElementById('menu-section');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================================================
// CATEGORIES & PRODUCTS RENDERING
// ==========================================================================
function renderCategories() {
  const container = document.getElementById('categoriesScrollContainer');
  if (!container) return;
  container.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `category-pill ${activeCategory === cat.id ? 'active' : ''}`;
    btn.innerHTML = `<span>${cat.icon}</span> <span>${cat.name}</span>`;
    btn.onclick = () => selectCategory(cat.id);
    container.appendChild(btn);
  });
}

function selectCategory(catId) {
  activeCategory = catId;
  renderCategories();
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const countBadge = document.getElementById('visibleProductsCount');
  const titleEl = document.getElementById('activeCategoryTitle');
  if (!grid) return;

  grid.innerHTML = '';

  // Filter products
  let filtered = currentProducts.filter(p => p.available !== false);

  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  // Update title & counter
  if (countBadge) countBadge.textContent = `${filtered.length} productos`;
  if (titleEl) {
    const curCat = CATEGORIES.find(c => c.id === activeCategory);
    titleEl.textContent = curCat ? `${curCat.icon} ${curCat.name}` : 'Menú Completo';
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-menu-state">
        <div class="emoji">🔍</div>
        <h3>No encontramos platos que coincidan</h3>
        <p>Prueba buscando con otro término o selecciona otra categoría.</p>
        <button class="slide-btn" style="margin-top: 1rem;" onclick="resetFilters()">Ver todo el menú</button>
      </div>
    `;
    return;
  }

  // Render cards
  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'dish-card';

    // Pricing calculation in USD and automatic conversion to BCV Bolívares
    let priceHtml = '';
    let hasVariants = Array.isArray(p.variants) && p.variants.length > 0;
    let minPrice = p.price;
    const bcvRate = Number(currentConfig.bcvRate || currentConfig.exchangeRateBs || 45.20);

    if (hasVariants) {
      minPrice = Math.min(...p.variants.map(v => v.price));
      const bsAmount = (minPrice * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      priceHtml = `
        <div class="dish-price-wrap">
          <span class="dish-price-label">Desde</span>
          <div class="dish-price"><span>$</span>${minPrice.toFixed(2)}</div>
          <div class="dish-price-bs">Bs. ${bsAmount}</div>
        </div>
      `;
    } else {
      const bsAmount = (Number(p.price) * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      priceHtml = `
        <div class="dish-price-wrap">
          <span class="dish-price-label">Precio</span>
          <div class="dish-price"><span>$</span>${Number(p.price).toFixed(2)}</div>
          <div class="dish-price-bs">Bs. ${bsAmount}</div>
        </div>
      `;
    }

    const badgeHtml = p.badge ? `<span class="dish-badge">${p.badge}</span>` : '';
    const variantTag = hasVariants ? `<div class="dish-variants-tag">🍕 Tamaños disponibles</div>` : (p.options ? `<div class="dish-variants-tag">⚙️ Personalizable</div>` : '');

    card.innerHTML = `
      <div class="dish-card-media">
        <img src="${p.image || 'assets/img/menu-cover.jpg'}" alt="${p.name}" class="dish-img" onerror="this.src='assets/img/menu-cover.jpg'" />
        ${badgeHtml}
      </div>
      <div class="dish-card-body">
        <h3 class="dish-name">${p.name}</h3>
        <p class="dish-desc">${p.description || ''}</p>
        ${variantTag}
        <div class="dish-footer">
          ${priceHtml}
          <button class="btn-add-cart" onclick="handleProductClick('${p.id}')">
            <span>+</span> Agregar
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function resetFilters() {
  searchQuery = '';
  const searchInput = document.getElementById('menuSearchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('searchClearBtn');
  if (clearBtn) clearBtn.style.display = 'none';
  selectCategory('all');
}

// ==========================================================================
// ITEM CUSTOMIZATION MODAL (Variants & Options)
// ==========================================================================
function handleProductClick(productId) {
  const product = currentProducts.find(p => p.id === productId);
  if (!product) return;

  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const hasOptions = !!product.options;

  // If item has variants, options or notes, open modal
  if (hasVariants || hasOptions) {
    openItemModal(product);
  } else {
    // Direct add
    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      variantName: null,
      selectedOptions: null,
      notes: '',
      image: product.image
    });
    showToast(`✅ ${product.name} agregado al pedido`);
  }
}

function openItemModal(product) {
  activeModalProduct = product;
  const modal = document.getElementById('itemModalOverlay');
  if (!modal) return;

  document.getElementById('modalItemImg').src = product.image || 'assets/img/menu-cover.jpg';
  document.getElementById('modalItemName').textContent = product.name;
  document.getElementById('modalItemDesc').textContent = product.description || '';

  const dynamicOpts = document.getElementById('modalItemOptionsWrap');
  dynamicOpts.innerHTML = '';

  // Variants (e.g. Pizza sizes)
  if (product.variants && product.variants.length > 0) {
    const varBox = document.createElement('div');
    varBox.className = 'form-group';
    varBox.innerHTML = `
      <div class="option-group-title">Selecciona el tamaño / opción:</div>
      <div class="variant-choice-list" id="variantChoicesList"></div>
    `;
    dynamicOpts.appendChild(varBox);

    const choicesList = varBox.querySelector('#variantChoicesList');
    product.variants.forEach((v, index) => {
      const vItem = document.createElement('div');
      vItem.className = `variant-choice-item ${index === 0 ? 'selected' : ''}`;
      vItem.innerHTML = `
        <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; width:100%;">
          <input type="radio" name="modal_variant" value="${v.name}" data-price="${v.price}" ${index === 0 ? 'checked' : ''} onchange="updateModalVariantSelection(this)">
          <span style="font-weight:600;">${v.name}</span>
          <span style="margin-left:auto; color:var(--secondary-color); font-weight:800;">$${v.price.toFixed(2)}</span>
        </label>
      `;
      choicesList.appendChild(vItem);
    });
  }

  // Options (e.g. Protein choice, Sauce, Flavors)
  if (product.options) {
    const optBox = document.createElement('div');
    optBox.className = 'form-group';
    optBox.innerHTML = `
      <div class="option-group-title">${product.options.title || 'Personaliza tu plato:'}</div>
      <select class="form-control" id="modalSelectOption">
        ${product.options.choices.map(c => `<option value="${c}">${c}</option>`).join('')}
      </select>
    `;
    dynamicOpts.appendChild(optBox);
  }

  // Notes field
  const notesBox = document.createElement('div');
  notesBox.className = 'form-group';
  notesBox.innerHTML = `
    <div class="option-group-title">Notas especiales (opcional):</div>
    <input type="text" id="modalItemNotes" class="form-control" placeholder="Ej: Sin cebolla, aderezo aparte, etc.">
  `;
  dynamicOpts.appendChild(notesBox);

  updateModalTotalButton();
  modal.classList.add('open');
}

function updateModalVariantSelection(radio) {
  const items = document.querySelectorAll('#variantChoicesList .variant-choice-item');
  items.forEach(el => el.classList.remove('selected'));
  radio.closest('.variant-choice-item').classList.add('selected');
  updateModalTotalButton();
}

function updateModalTotalButton() {
  const btn = document.getElementById('btnConfirmModalAdd');
  if (!btn || !activeModalProduct) return;

  let currentPrice = activeModalProduct.price;
  const checkedVar = document.querySelector('input[name="modal_variant"]:checked');
  if (checkedVar) {
    currentPrice = parseFloat(checkedVar.dataset.price);
  }
  btn.innerHTML = `Agregar al Pedido • $${currentPrice.toFixed(2)}`;
}

function closeItemModal() {
  const modal = document.getElementById('itemModalOverlay');
  if (modal) modal.classList.remove('open');
  activeModalProduct = null;
}

function confirmModalAddToCart() {
  if (!activeModalProduct) return;

  let price = activeModalProduct.price;
  let variantName = null;
  const checkedVar = document.querySelector('input[name="modal_variant"]:checked');
  if (checkedVar) {
    price = parseFloat(checkedVar.dataset.price);
    variantName = checkedVar.value;
  }

  let selectedOption = null;
  const optSelect = document.getElementById('modalSelectOption');
  if (optSelect) selectedOption = optSelect.value;

  const notesInput = document.getElementById('modalItemNotes');
  const notes = notesInput ? notesInput.value.trim() : '';

  addToCart({
    id: `${activeModalProduct.id}-${variantName || 'std'}-${Date.now()}`,
    productId: activeModalProduct.id,
    name: activeModalProduct.name,
    price: price,
    qty: 1,
    variantName: variantName,
    selectedOptions: selectedOption,
    notes: notes,
    image: activeModalProduct.image
  });

  closeItemModal();
  showToast(`✅ ${activeModalProduct.name} agregado al pedido`);
}

// ==========================================================================
// CART OPERATIONS
// ==========================================================================
function addToCart(newItem) {
  // Check if identical item already exists (same product, variant, options, notes)
  const existing = cart.find(item => 
    item.productId === newItem.productId &&
    item.variantName === newItem.variantName &&
    item.selectedOptions === newItem.selectedOptions &&
    item.notes === newItem.notes
  );

  if (existing) {
    existing.qty += newItem.qty;
  } else {
    cart.push(newItem);
  }

  saveCart();
  updateCartUI();
}

function updateItemQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast('Plato eliminado del carrito');
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Badge updates
  const headerBadge = document.getElementById('headerCartCount');
  if (headerBadge) headerBadge.textContent = totalCount;

  const floatBtn = document.getElementById('floatingCartBtn');
  const floatBadge = document.getElementById('floatCartCount');
  const floatTotal = document.getElementById('floatCartTotal');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryCost = orderType === 'delivery' ? (currentConfig.deliveryBasePrice || 2.50) : 0;
  const grandTotal = subtotal + deliveryCost;

  if (floatBtn) {
    if (totalCount > 0) {
      floatBtn.style.display = 'flex';
      if (floatBadge) floatBadge.textContent = totalCount;
      if (floatTotal) floatTotal.textContent = `$${grandTotal.toFixed(2)}`;
    } else {
      floatBtn.style.display = 'none';
    }
  }

  renderCartDrawerItems(subtotal, deliveryCost, grandTotal);
}

function renderCartDrawerItems(subtotal, deliveryCost, grandTotal) {
  const container = document.getElementById('cartDrawerItemsList');
  const emptyState = document.getElementById('cartDrawerEmptyState');
  const contentWrap = document.getElementById('cartDrawerContent');
  const subtotalEl = document.getElementById('cartSubtotalValue');
  const deliveryEl = document.getElementById('cartDeliveryValue');
  const totalEl = document.getElementById('cartTotalValue');
  const totalBsEl = document.getElementById('cartTotalBsValue');
  const deliveryLine = document.getElementById('cartDeliveryRow');

  if (!container) return;

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (contentWrap) contentWrap.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (contentWrap) contentWrap.style.display = 'block';

  container.innerHTML = '';
  cart.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'cart-item-row';

    let extraDetails = [];
    if (item.variantName) extraDetails.push(`Tamaño: ${item.variantName}`);
    if (item.selectedOptions) extraDetails.push(`Opción: ${item.selectedOptions}`);
    if (item.notes) extraDetails.push(`Nota: "${item.notes}"`);

    row.innerHTML = `
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        ${extraDetails.length > 0 ? `<div class="cart-item-subtext">${extraDetails.join(' • ')}</div>` : ''}
        <div class="cart-item-price">$${item.price.toFixed(2)} c/u</div>
      </div>
      <div class="cart-qty-controls">
        <button class="btn-qty" onclick="updateItemQty(${index}, -1)">-</button>
        <span class="cart-qty-num">${item.qty}</span>
        <button class="btn-qty" onclick="updateItemQty(${index}, 1)">+</button>
      </div>
      <div style="font-weight:700; color:#fff; min-width:55px; text-align:right;">
        $${(item.price * item.qty).toFixed(2)}
      </div>
      <button class="btn-del-item" onclick="removeItem(${index})" title="Eliminar">🗑️</button>
    `;
    container.appendChild(row);
  });

  // Numbers update
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (deliveryEl) deliveryEl.textContent = `$${deliveryCost.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${grandTotal.toFixed(2)}`;
  if (deliveryLine) {
    deliveryLine.style.display = orderType === 'delivery' ? 'flex' : 'none';
  }

  const bcvRate = Number(currentConfig.bcvRate || currentConfig.exchangeRateBs || 45.20);
  if (totalBsEl) totalBsEl.textContent = `Bs. ${(grandTotal * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Tasa BCV: ${bcvRate.toFixed(2)})`;
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.classList.add('open');
    updateCartUI();
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }
}

function setOrderType(type) {
  orderType = type;
  document.querySelectorAll('.order-type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });

  const deliveryFields = document.getElementById('deliveryFieldsGroup');
  const dineinFields = document.getElementById('dineinFieldsGroup');

  if (deliveryFields) {
    deliveryFields.style.display = type === 'delivery' ? 'block' : 'none';
  }
  if (dineinFields) {
    dineinFields.style.display = type === 'dinein' ? 'block' : 'none';
  }

  updateCartUI();
}

function setPaymentMethod(method) {
  paymentMethod = method;
  document.querySelectorAll('.pay-radio-label').forEach(label => {
    const input = label.querySelector('input');
    if (input && input.value === method) {
      label.classList.add('checked');
    } else {
      label.classList.remove('checked');
    }
  });
}

// ==========================================================================
// WHATSAPP CHECKOUT & PERSISTENCE
// ==========================================================================
function processWhatsAppOrder() {
  if (cart.length === 0) {
    showToast('⚠️ Tu carrito está vacío');
    return;
  }

  const nameInput = document.getElementById('orderCustomerName');
  const phoneInput = document.getElementById('orderCustomerPhone');
  const customerName = nameInput ? nameInput.value.trim() : '';
  const customerPhone = phoneInput ? phoneInput.value.trim() : '';

  if (!customerName) {
    showToast('⚠️ Por favor ingresa tu Nombre y Apellido');
    if (nameInput) nameInput.focus();
    return;
  }

  let address = '';
  let reference = '';
  let tableNumber = '';

  if (orderType === 'delivery') {
    const addrInput = document.getElementById('orderDeliveryAddress');
    const refInput = document.getElementById('orderDeliveryRef');
    address = addrInput ? addrInput.value.trim() : '';
    reference = refInput ? refInput.value.trim() : '';
    if (!address) {
      showToast('⚠️ Por favor ingresa tu Dirección de entrega');
      if (addrInput) addrInput.focus();
      return;
    }
  } else if (orderType === 'dinein') {
    const tableInput = document.getElementById('orderTableNumber');
    tableNumber = tableInput ? tableInput.value.trim() : 'Mesa sin asignar';
  }

  const notesInput = document.getElementById('orderGeneralNotes');
  const generalNotes = notesInput ? notesInput.value.trim() : '';

  // Order totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryCost = orderType === 'delivery' ? (currentConfig.deliveryBasePrice || 2.50) : 0;
  const grandTotal = subtotal + deliveryCost;
  const bcvRate = Number(currentConfig.bcvRate || currentConfig.exchangeRateBs || 45.20);
  const totalBs = (grandTotal * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Generate unique order ID
  const orderId = `TB-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', hour12: true });

  // Payment Label
  const payLabels = {
    pagomovil: 'Pago Móvil (Bs.)',
    efectivo: 'Efectivo en Dólares ($)',
    zelle: 'Zelle',
    puntoventa: 'Punto de Venta'
  };
  const payMethodLabel = payLabels[paymentMethod] || paymentMethod;

  // Type Label
  const typeLabels = {
    delivery: '🛵 Delivery a Domicilio',
    pickup: '🛍️ Para Llevar / Pick-Up',
    dinein: `🍽️ Comer en el Local (Mesa ${tableNumber})`
  };
  const orderTypeLabel = typeLabels[orderType];

  // Compose formatted WhatsApp text message
  let msg = `🛒 *NUEVO PEDIDO - ${currentConfig.restaurantName.toUpperCase()}*\n`;
  msg += `🔖 *Orden:* #${orderId}\n`;
  msg += `📅 *Fecha:* ${dateStr} - ${timeStr}\n\n`;

  msg += `👤 *Cliente:* ${customerName}\n`;
  if (customerPhone) msg += `📞 *Teléfono:* ${customerPhone}\n`;
  msg += `🛵 *Modalidad:* ${orderTypeLabel}\n`;

  if (orderType === 'delivery') {
    msg += `📍 *Dirección:* ${address}\n`;
    if (reference) msg += `🏢 *Punto de Ref.:* ${reference}\n`;
  }
  msg += `💳 *Método de Pago:* ${payMethodLabel}\n\n`;

  msg += `📋 *DETALLE DEL PEDIDO:*\n`;
  msg += `----------------------------------------\n`;

  cart.forEach(item => {
    msg += `• *${item.qty}x* ${item.name}`;
    if (item.variantName) msg += ` [${item.variantName}]`;
    msg += ` - $${(item.price * item.qty).toFixed(2)}\n`;

    if (item.selectedOptions) {
      msg += `  └ *Opción:* ${item.selectedOptions}\n`;
    }
    if (item.notes) {
      msg += `  └ *Nota:* ${item.notes}\n`;
    }
  });

  msg += `----------------------------------------\n`;
  msg += `💵 *Subtotal:* $${subtotal.toFixed(2)} USD\n`;
  if (orderType === 'delivery') {
    msg += `🛵 *Costo Delivery:* $${deliveryCost.toFixed(2)} USD\n`;
  }
  msg += `💰 *TOTAL A PAGAR:* $${grandTotal.toFixed(2)} USD\n`;
  msg += `🏛️ *Tasa Oficial BCV:* ${bcvRate.toFixed(2)} Bs./$\n`;
  msg += `🇻🇪 *TOTAL EN BOLÍVARES:* ${totalBs} Bs.\n`;

  if (generalNotes) {
    msg += `\n💬 *Observaciones:* ${generalNotes}\n`;
  }

  msg += `\n✨ *¡Muchas gracias por elegirnos!*`;

  // Save order to Local Storage Database for Admin Panel
  saveOrderToDatabase({
    id: orderId,
    timestamp: now.toISOString(),
    dateStr: dateStr,
    timeStr: timeStr,
    customerName: customerName,
    customerPhone: customerPhone,
    orderType: orderType,
    orderTypeLabel: orderTypeLabel,
    address: address,
    reference: reference,
    paymentMethod: payMethodLabel,
    items: [...cart],
    subtotal: subtotal,
    deliveryCost: deliveryCost,
    total: grandTotal,
    status: 'Pendiente' // 'Pendiente' | 'Preparando' | 'Entregado' | 'Cancelado'
  });

  // Empty cart and close drawer
  cart = [];
  saveCart();
  updateCartUI();
  closeCartDrawer();

  // Send to WhatsApp target: 584123714136
  const targetNumber = currentConfig.whatsappNumber.replace(/[^0-9]/g, '') || '584123714136';
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodeURIComponent(msg)}`;

  showToast('🚀 Redirigiendo a WhatsApp para enviar tu pedido...');
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
  }, 600);
}

function saveOrderToDatabase(orderRecord) {
  let orders = [];
  const saved = localStorage.getItem('trigus_orders');
  if (saved) {
    try {
      orders = JSON.parse(saved);
    } catch (e) {
      orders = [];
    }
  }
  orders.unshift(orderRecord);
  localStorage.setItem('trigus_orders', JSON.stringify(orders));
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(text) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================
function setupEventListeners() {
  // Search input live filtering
  const searchInput = document.getElementById('menuSearchInput');
  const clearBtn = document.getElementById('searchClearBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearBtn) clearBtn.style.display = searchQuery ? 'block' : 'none';
      renderProducts();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      resetFilters();
    });
  }

  // Slider pause on hover
  const sliderElem = document.getElementById('heroSliderSection');
  if (sliderElem) {
    sliderElem.addEventListener('mouseenter', stopSliderAutoPlay);
    sliderElem.addEventListener('mouseleave', startSliderAutoPlay);
    sliderElem.addEventListener('touchstart', stopSliderAutoPlay);
    sliderElem.addEventListener('touchend', startSliderAutoPlay);
  }
}
