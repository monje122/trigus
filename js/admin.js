// ==========================================================================
// TRIGU'S BAKERY - ADMIN PANEL LOGIC & DASHBOARD
// ==========================================================================

const ADMIN_PIN = "1234"; // Default security PIN
let isAdminAuthenticated = false;
let currentAdminTab = 'summary'; // 'summary' | 'dishes' | 'branding' | 'slider'

// Initialize Admin Modal bindings
function initAdminPanel() {
  const adminBtn = document.getElementById('btnAdminToggle');
  if (adminBtn) {
    adminBtn.addEventListener('click', handleAdminAccess);
  }
}

// Request PIN authentication
function handleAdminAccess() {
  if (isAdminAuthenticated) {
    openAdminModal();
    return;
  }

  const enteredPin = prompt("🔒 Ingrese la clave de administrador:", "");
  if (enteredPin === null) return;

  if (enteredPin === ADMIN_PIN || enteredPin === "admin") {
    isAdminAuthenticated = true;
    showToast("🔓 Sesión de Administrador iniciada");
    openAdminModal();
  } else {
    alert("❌ Clave incorrecta. Por defecto es 1234.");
  }
}

function openAdminModal() {
  const modal = document.getElementById('adminModalOverlay');
  if (modal) {
    modal.classList.add('open');
    switchAdminTab('summary');
  }
}

function closeAdminModal() {
  const modal = document.getElementById('adminModalOverlay');
  if (modal) {
    modal.classList.remove('open');
  }
}

function switchAdminTab(tabName) {
  currentAdminTab = tabName;
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  const pane = document.getElementById('adminContentPane');
  if (!pane) return;

  if (tabName === 'summary') {
    renderDailyOrdersSummary(pane);
  } else if (tabName === 'dishes') {
    renderDishesManager(pane);
  } else if (tabName === 'branding') {
    renderBrandingSettings(pane);
  } else if (tabName === 'slider') {
    renderSliderManager(pane);
  }
}

// ==========================================================================
// 1. RESUMEN DE PEDIDOS AL DÍA (ANALYTICS & ORDERS TABLE)
// ==========================================================================
function getStoredOrders() {
  const saved = localStorage.getItem('trigus_orders');
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch (e) {
    return [];
  }
}

function saveStoredOrders(orders) {
  localStorage.setItem('trigus_orders', JSON.stringify(orders));
}

function renderDailyOrdersSummary(container) {
  const allOrders = getStoredOrders();
  const today = new Date().toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // Filter orders by today
  const todayOrders = allOrders.filter(o => o.dateStr === today);

  // Statistics calculation
  const totalSales = todayOrders.reduce((sum, o) => o.status !== 'Cancelado' ? sum + Number(o.total) : sum, 0);
  const totalCount = todayOrders.length;
  const avgTicket = totalCount > 0 ? (totalSales / (todayOrders.filter(o => o.status !== 'Cancelado').length || 1)) : 0;
  const deliveryCount = todayOrders.filter(o => o.orderType === 'delivery').length;
  const pickupCount = todayOrders.filter(o => o.orderType === 'pickup').length;

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
      <div>
        <h3 style="margin:0; color:#fff; font-size:1.3rem;">📊 Resumen de Ventas y Pedidos del Día</h3>
        <p style="margin:0.2rem 0 0 0; color:var(--text-muted); font-size:0.85rem;">Fecha: <strong>${today}</strong> (Actualizado en tiempo real)</p>
      </div>
      <div style="display:flex; gap:0.5rem;">
        <button class="slide-btn" style="padding:0.5rem 1rem; font-size:0.85rem;" onclick="exportOrdersToCSV()">📥 Exportar Reporte CSV</button>
        <button class="slide-btn" style="padding:0.5rem 1rem; font-size:0.85rem; background:#374151;" onclick="addSimulatedOrder()">🧪 Simular Pedido Demo</button>
      </div>
    </div>

    <!-- Quick BCV Rate Update Banner -->
    <div class="bcv-admin-banner">
      <div class="bcv-banner-info">
        <span class="bcv-icon">🏛️</span>
        <div>
          <h4 style="margin:0; color:#fff; font-size:1.15rem;">Tasa Oficial del Día (BCV)</h4>
          <p style="margin:0.25rem 0 0 0; font-size:0.82rem; color:var(--text-muted);">
            Los platos se cotizan en <strong>Dólares ($ USD)</strong> y se calculan en Bolívares usando esta tasa oficial.
          </p>
        </div>
      </div>
      <div class="bcv-banner-action">
        <div class="bcv-input-wrap">
          <span class="bcv-currency-tag">Bs.</span>
          <input type="number" step="0.01" id="quickBcvRateInput" value="${Number(currentConfig.bcvRate || currentConfig.exchangeRateBs || 45.20).toFixed(2)}" class="bcv-rate-input" />
        </div>
        <button class="btn-save-bcv" onclick="saveQuickBcvRate()">Guardar Tasa BCV</button>
      </div>
    </div>

    <!-- Stats KPI Cards -->
    <div class="stats-grid">
      <div class="stat-card green">
        <div class="stat-label">Ventas Totales Hoy</div>
        <div class="stat-value">$${totalSales.toFixed(2)}</div>
        <div style="font-size:0.75rem; color:var(--secondary-color); margin-top:0.2rem;">
          Bs. ${(totalSales * (currentConfig.bcvRate || currentConfig.exchangeRateBs || 45.20)).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Tasa BCV)
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-label">Pedidos Registrados</div>
        <div class="stat-value">${totalCount}</div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.2rem;">
          🛵 ${deliveryCount} Delivery • 🛍️ ${pickupCount} Para Llevar
        </div>
      </div>

      <div class="stat-card gold">
        <div class="stat-label">Ticket Promedio</div>
        <div class="stat-value">$${avgTicket.toFixed(2)}</div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.2rem;">Por pedido completado</div>
      </div>
    </div>

    <!-- Orders Table -->
    <div style="margin-top:2rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
        <h4 style="margin:0; color:#fff;">Detalle de Pedidos (${todayOrders.length})</h4>
        <span style="font-size:0.8rem; color:var(--text-muted);">Haz clic en el estado para actualizarlo</span>
      </div>

      <div class="orders-table-wrap">
        <table class="orders-table">
          <thead>
            <tr>
              <th>ID Orden</th>
              <th>Hora</th>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Total ($)</th>
              <th>Pago</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            ${todayOrders.length === 0 ? `
              <tr>
                <td colspan="8" style="text-align:center; padding:2.5rem; color:var(--text-muted);">
                  Aún no se han registrado pedidos hoy.<br>Los nuevos pedidos enviados por WhatsApp aparecerán aquí automáticamente.
                </td>
              </tr>
            ` : todayOrders.map(order => `
              <tr>
                <td><strong>#${order.id}</strong></td>
                <td>${order.timeStr}</td>
                <td>
                  <strong>${order.customerName}</strong><br>
                  <span style="font-size:0.75rem; color:var(--text-muted);">${order.customerPhone || 'Sin tel.'}</span>
                </td>
                <td>${order.orderType === 'delivery' ? '🛵 Delivery' : (order.orderType === 'pickup' ? '🛍️ Llevar' : '🍽️ Local')}</td>
                <td><strong style="color:var(--secondary-color);">$${Number(order.total).toFixed(2)}</strong></td>
                <td><span style="font-size:0.75rem;">${order.paymentMethod}</span></td>
                <td>
                  <select onchange="updateOrderStatus('${order.id}', this.value)" style="background:#16161d; color:#fff; border:1px solid #333; padding:4px 8px; border-radius:4px; font-size:0.78rem;">
                    <option value="Pendiente" ${order.status === 'Pendiente' ? 'selected' : ''}>⏳ Pendiente</option>
                    <option value="Preparando" ${order.status === 'Preparando' ? 'selected' : ''}>🍳 Preparando</option>
                    <option value="Entregado" ${order.status === 'Entregado' ? 'selected' : ''}>✅ Entregado</option>
                    <option value="Cancelado" ${order.status === 'Cancelado' ? 'selected' : ''}>❌ Cancelado</option>
                  </select>
                </td>
                <td>
                  <button onclick="viewOrderDetails('${order.id}')" style="background:#2d2d38; color:#fff; padding:4px 8px; border-radius:4px; font-size:0.75rem;">Ver</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function saveQuickBcvRate() {
  const input = document.getElementById('quickBcvRateInput');
  if (!input) return;
  const newRate = parseFloat(input.value);
  if (isNaN(newRate) || newRate <= 0) {
    alert("Por favor ingrese un valor de tasa válido en Bolívares (ej: 45.20).");
    return;
  }

  currentConfig.bcvRate = newRate;
  currentConfig.exchangeRateBs = newRate;
  localStorage.setItem('trigus_config', JSON.stringify(currentConfig));

  if (typeof applyDynamicTheme === 'function') applyDynamicTheme();
  if (typeof renderProducts === 'function') renderProducts();
  if (typeof updateCartUI === 'function') updateCartUI();

  showToast(`🏛️ Tasa BCV actualizada a ${newRate.toFixed(2)} Bs. / $ USD`);

  const pane = document.getElementById('adminContentPane');
  if (pane && currentAdminTab === 'summary') renderDailyOrdersSummary(pane);
}

function updateOrderStatus(orderId, newStatus) {
  const orders = getStoredOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    saveStoredOrders(orders);
    showToast(`Estado de orden #${orderId} actualizado a "${newStatus}"`);
    const pane = document.getElementById('adminContentPane');
    if (pane && currentAdminTab === 'summary') renderDailyOrdersSummary(pane);
  }
}

function viewOrderDetails(orderId) {
  const orders = getStoredOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  let itemsDetail = order.items.map(i => `• ${i.qty}x ${i.name} ${i.variantName ? `[${i.variantName}]` : ''} ($${(i.price * i.qty).toFixed(2)})`).join('\n');

  alert(
    `DETALLE DE LA ORDEN #${order.id}\n\n` +
    `Cliente: ${order.customerName}\n` +
    `Teléfono: ${order.customerPhone || 'N/A'}\n` +
    `Tipo: ${order.orderTypeLabel}\n` +
    (order.address ? `Dirección: ${order.address}\nRef: ${order.reference}\n` : '') +
    `Pago: ${order.paymentMethod}\n\n` +
    `PLATOS:\n${itemsDetail}\n\n` +
    `Subtotal: $${Number(order.subtotal).toFixed(2)}\n` +
    `Delivery: $${Number(order.deliveryCost).toFixed(2)}\n` +
    `TOTAL: $${Number(order.total).toFixed(2)} USD\n` +
    `Estado: ${order.status}`
  );
}

function exportOrdersToCSV() {
  const orders = getStoredOrders();
  if (orders.length === 0) {
    alert("No hay pedidos registrados para exportar.");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "ID,Fecha,Hora,Cliente,Telefono,Tipo,Total_USD,Metodo_Pago,Estado,Direccion\n";

  orders.forEach(o => {
    const cleanAddress = (o.address || '').replace(/,/g, ' ');
    csvContent += `"${o.id}","${o.dateStr}","${o.timeStr}","${o.customerName}","${o.customerPhone}","${o.orderType}","${o.total}","${o.paymentMethod}","${o.status}","${cleanAddress}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `reporte_pedidos_trigus_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("📥 Reporte CSV descargado con éxito");
}

function addSimulatedOrder() {
  const demoId = `DEMO-${Math.floor(100 + Math.random() * 900)}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', hour12: true });

  const demoOrder = {
    id: demoId,
    timestamp: now.toISOString(),
    dateStr: dateStr,
    timeStr: timeStr,
    customerName: "Cliente Prueba",
    customerPhone: "0412-5551234",
    orderType: "delivery",
    orderTypeLabel: "🛵 Delivery a Domicilio",
    address: "Urb. Las Chimeneas, Calle 4, Casa 12",
    reference: "Portón blanco",
    paymentMethod: "Pago Móvil (Bs.)",
    items: [
      { name: "Hamburguesa Trigu's Sweet & Pepper BBQ", qty: 2, price: 7.00 },
      { name: "Malteada Oreo", qty: 1, price: 5.00 }
    ],
    subtotal: 19.00,
    deliveryCost: 2.50,
    total: 21.50,
    status: "Pendiente"
  };

  const orders = getStoredOrders();
  orders.unshift(demoOrder);
  saveStoredOrders(orders);
  showToast("🧪 Pedido simulado creado para testing");
  const pane = document.getElementById('adminContentPane');
  if (pane && currentAdminTab === 'summary') renderDailyOrdersSummary(pane);
}

// ==========================================================================
// 2. GESTIÓN DE PLATOS (CRUD MENÚ & FOTOS)
// ==========================================================================
function renderDishesManager(container) {
  container.innerHTML = `
    <div class="admin-actions-bar">
      <div>
        <h3 style="margin:0; color:#fff; font-size:1.2rem;">🍽️ Catálogo de Platos & Precios</h3>
        <p style="margin:0.2rem 0 0 0; color:var(--text-muted); font-size:0.8rem;">Puedes editar precios, fotos, descripciones o crear platos nuevos.</p>
      </div>
      <div style="display:flex; gap:0.5rem;">
        <button class="btn-primary-action" onclick="openDishEditorModal(null)">+ Nuevo Plato</button>
        <button class="slide-btn" style="background:#374151; font-size:0.8rem;" onclick="resetDishesToDefault()">Restablecer por defecto</button>
      </div>
    </div>

    <!-- Search in dishes -->
    <div style="margin-bottom:1rem;">
      <input type="text" id="adminDishSearchInput" class="form-control" placeholder="Buscar plato por nombre o categoría..." oninput="filterAdminDishesTable(this.value)">
    </div>

    <div class="orders-table-wrap">
      <table class="orders-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre del Plato</th>
            <th>Categoría</th>
            <th>Precio ($)</th>
            <th>Estado</th>
            <th style="text-align:right;">Acciones</th>
          </tr>
        </thead>
        <tbody id="adminDishesTbody">
          ${renderAdminDishesRows(currentProducts)}
        </tbody>
      </table>
    </div>
  `;
}

function renderAdminDishesRows(list) {
  if (list.length === 0) {
    return `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">No hay platos que coincidan.</td></tr>`;
  }

  return list.map(p => `
    <tr>
      <td style="width:50px;">
        <img src="${p.image || 'assets/img/menu-cover.jpg'}" alt="${p.name}" style="width:40px; height:40px; object-fit:cover; border-radius:6px;" onerror="this.src='assets/img/menu-cover.jpg'">
      </td>
      <td>
        <strong>${p.name}</strong><br>
        <span style="font-size:0.75rem; color:var(--text-muted); display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden;">${p.description || ''}</span>
      </td>
      <td><span style="text-transform:capitalize; font-size:0.8rem;">${p.category}</span></td>
      <td><strong style="color:var(--secondary-color);">$${Number(p.price).toFixed(2)}</strong></td>
      <td>
        <span class="badge-status ${p.available !== false ? 'entregado' : 'cancelado'}">
          ${p.available !== false ? 'Activo' : 'Agotado'}
        </span>
      </td>
      <td style="text-align:right;">
        <button onclick="openDishEditorModal('${p.id}')" style="background:#2563eb; color:#fff; padding:4px 10px; border-radius:4px; font-size:0.75rem; margin-right:4px;">Editar</button>
        <button onclick="toggleDishAvailability('${p.id}')" style="background:#4b5563; color:#fff; padding:4px 8px; border-radius:4px; font-size:0.75rem; margin-right:4px;">${p.available !== false ? 'Agotar' : 'Activar'}</button>
        <button onclick="deleteDish('${p.id}')" style="background:#dc2626; color:#fff; padding:4px 8px; border-radius:4px; font-size:0.75rem;">🗑️</button>
      </td>
    </tr>
  `).join('');
}

function filterAdminDishesTable(q) {
  const tbody = document.getElementById('adminDishesTbody');
  if (!tbody) return;
  const filtered = currentProducts.filter(p => 
    p.name.toLowerCase().includes(q.toLowerCase()) || 
    p.category.toLowerCase().includes(q.toLowerCase())
  );
  tbody.innerHTML = renderAdminDishesRows(filtered);
}

function openDishEditorModal(dishId) {
  const dish = dishId ? currentProducts.find(p => p.id === dishId) : null;
  const isEditing = !!dish;

  const title = isEditing ? `Editar: ${dish.name}` : 'Crear Nuevo Plato';
  const name = isEditing ? dish.name : '';
  const category = isEditing ? dish.category : 'hamburguesas';
  const price = isEditing ? dish.price : '';
  const desc = isEditing ? (dish.description || '') : '';
  const img = isEditing ? (dish.image || '') : 'assets/img/food-burger.jpg';
  const badge = isEditing ? (dish.badge || '') : '';

  const photoOptions = [
    { label: 'Hamburguesa', val: 'assets/img/food-burger.jpg' },
    { label: 'Parrilla Mixta', val: 'assets/img/food-grill.jpg' },
    { label: 'Parrilla Ricci', val: 'assets/img/food-parrilla-combo.jpg' },
    { label: 'Pollo Asado', val: 'assets/img/food-pollo.jpg' },
    { label: 'Pizza Tradicional', val: 'assets/img/food-pizza.jpg' },
    { label: 'Big Slice Box', val: 'assets/img/food-pizza-box.jpg' },
    { label: 'Panini / Sandwich', val: 'assets/img/food-panini.jpg' },
    { label: 'Cachapa Criolla', val: 'assets/img/food-cachapa.jpg' },
    { label: 'Waffles Desayuno', val: 'assets/img/food-waffles.jpg' },
    { label: 'Tenders de Pollo', val: 'assets/img/food-tenders.jpg' },
    { label: 'Nachos Fundidos', val: 'assets/img/food-nachos.jpg' },
    { label: 'Pastas & Fetuccinis', val: 'assets/img/food-pasta.jpg' },
    { label: 'Ensalada César', val: 'assets/img/food-salad.jpg' },
    { label: 'Parrilla Proteica', val: 'assets/img/food-proteica.jpg' },
    { label: 'Malteadas', val: 'assets/img/food-malteada.jpg' },
    { label: 'Smoothies & Frapé', val: 'assets/img/food-smoothie.jpg' },
    { label: 'Café', val: 'assets/img/food-cafe.jpg' },
    { label: 'Jugos Naturales', val: 'assets/img/food-jugos.jpg' }
  ];

  const modalHtml = `
    <div id="dishEditorModal" class="modal-overlay open" style="z-index:1100;">
      <div class="item-modal-card" style="padding:1.5rem; max-width:550px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <h3 style="margin:0; color:#fff;">${title}</h3>
          <button class="btn-close-modal" onclick="document.getElementById('dishEditorModal').remove()">✕</button>
        </div>

        <form id="dishEditorForm" onsubmit="saveDishForm(event, '${dishId || ''}')">
          <div class="form-group">
            <label class="form-label">Nombre del Plato *</label>
            <input type="text" id="editDishName" class="form-control" value="${name}" required>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Categoría *</label>
              <select id="editDishCategory" class="form-control">
                ${CATEGORIES.filter(c => c.id !== 'all').map(c => `
                  <option value="${c.id}" ${category === c.id ? 'selected' : ''}>${c.icon} ${c.name}</option>
                `).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Precio en Dólares ($ USD) *</label>
              <div style="position:relative; display:flex; align-items:center;">
                <span style="position:absolute; left:12px; color:var(--secondary-color); font-weight:800; font-size:1.1rem;">$</span>
                <input type="number" step="0.01" id="editDishPrice" class="form-control" style="padding-left:28px;" value="${price}" placeholder="0.00" required oninput="updateLivePriceBs(this.value)">
              </div>
              <div id="dishBsPreviewText" style="margin-top:0.35rem; font-size:0.75rem; color:var(--text-muted);">
                Equivale a: <strong style="color:var(--secondary-color);">Bs. ${(Number(price || 0) * (currentConfig.bcvRate || currentConfig.exchangeRateBs || 45.20)).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> (Tasa BCV: ${Number(currentConfig.bcvRate || currentConfig.exchangeRateBs || 45.20).toFixed(2)})
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Descripción & Ingredientes</label>
            <textarea id="editDishDesc" class="form-control" rows="3">${desc}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Seleccionar Foto del Menú</label>
            <select id="editDishPresetImg" class="form-control" onchange="document.getElementById('editDishImg').value = this.value">
              <option value="">-- Elige una foto del menú oficial --</option>
              ${photoOptions.map(opt => `<option value="${opt.val}" ${img === opt.val ? 'selected' : ''}>${opt.label}</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">O ingresa URL personalizada de imagen</label>
            <input type="text" id="editDishImg" class="form-control" value="${img}">
          </div>

          <div class="form-group">
            <label class="form-label">Etiqueta Destacada (Opcional, ej: 'Popular', 'Gourmet')</label>
            <input type="text" id="editDishBadge" class="form-control" value="${badge}">
          </div>

          <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:1.5rem;">
            <button type="button" class="slide-btn" style="background:#374151;" onclick="document.getElementById('dishEditorModal').remove()">Cancelar</button>
            <button type="submit" class="btn-primary-action">Guardar Plato</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function updateLivePriceBs(val) {
  const preview = document.getElementById('dishBsPreviewText');
  if (!preview) return;
  const rate = Number(currentConfig.bcvRate || currentConfig.exchangeRateBs || 45.20);
  const num = parseFloat(val) || 0;
  const bs = (num * rate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  preview.innerHTML = `Equivale a: <strong style="color:var(--secondary-color);">Bs. ${bs}</strong> (Tasa BCV: ${rate.toFixed(2)})`;
}

function saveDishForm(e, dishId) {
  e.preventDefault();
  const name = document.getElementById('editDishName').value.trim();
  const category = document.getElementById('editDishCategory').value;
  const price = parseFloat(document.getElementById('editDishPrice').value) || 0;
  const desc = document.getElementById('editDishDesc').value.trim();
  const image = document.getElementById('editDishImg').value.trim() || 'assets/img/menu-cover.jpg';
  const badge = document.getElementById('editDishBadge').value.trim();

  if (dishId) {
    // Edit existing
    const idx = currentProducts.findIndex(p => p.id === dishId);
    if (idx !== -1) {
      currentProducts[idx] = {
        ...currentProducts[idx],
        name,
        category,
        price,
        description: desc,
        image,
        badge: badge || null
      };
      showToast(`Plato "${name}" actualizado con éxito`);
    }
  } else {
    // Create new
    const newId = `custom-${Date.now()}`;
    currentProducts.unshift({
      id: newId,
      name,
      category,
      price,
      description: desc,
      image,
      badge: badge || null,
      available: true
    });
    showToast(`Nuevo plato "${name}" creado con éxito`);
  }

  // Persist to localStorage
  localStorage.setItem('trigus_custom_products', JSON.stringify(currentProducts));

  // Close modal
  const m = document.getElementById('dishEditorModal');
  if (m) m.remove();

  // Refresh client and admin views
  renderProducts();
  const pane = document.getElementById('adminContentPane');
  if (pane && currentAdminTab === 'dishes') renderDishesManager(pane);
}

function toggleDishAvailability(dishId) {
  const p = currentProducts.find(item => item.id === dishId);
  if (p) {
    p.available = p.available === false ? true : false;
    localStorage.setItem('trigus_custom_products', JSON.stringify(currentProducts));
    showToast(`"${p.name}" ahora está ${p.available ? 'Activo' : 'Agotado'}`);
    renderProducts();
    const pane = document.getElementById('adminContentPane');
    if (pane && currentAdminTab === 'dishes') renderDishesManager(pane);
  }
}

function deleteDish(dishId) {
  const p = currentProducts.find(item => item.id === dishId);
  if (!p) return;

  if (confirm(`¿Estás seguro de eliminar "${p.name}" del menú?`)) {
    currentProducts = currentProducts.filter(item => item.id !== dishId);
    localStorage.setItem('trigus_custom_products', JSON.stringify(currentProducts));
    showToast(`Plato "${p.name}" eliminado`);
    renderProducts();
    const pane = document.getElementById('adminContentPane');
    if (pane && currentAdminTab === 'dishes') renderDishesManager(pane);
  }
}

function resetDishesToDefault() {
  if (confirm("¿Deseas restaurar todo el menú original con todos los precios oficiales de la lista?")) {
    localStorage.removeItem('trigus_custom_products');
    currentProducts = [...INITIAL_PRODUCTS];
    showToast("Menú restaurado al valor oficial");
    renderProducts();
    const pane = document.getElementById('adminContentPane');
    if (pane && currentAdminTab === 'dishes') renderDishesManager(pane);
  }
}

// ==========================================================================
// 3. PERSONALIZACIÓN DE COLORES Y MARCA (BRANDING & THEME)
// ==========================================================================
function renderBrandingSettings(container) {
  const c = currentConfig.colors;

  container.innerHTML = `
    <div style="margin-bottom:1.5rem;">
      <h3 style="margin:0; color:#fff; font-size:1.3rem;">🎨 Personalización de Colores & Configuración</h3>
      <p style="margin:0.2rem 0 0 0; color:var(--text-muted); font-size:0.85rem;">Cambia en vivo los colores de la página, el número de WhatsApp para pedidos y la tasa de cambio.</p>
    </div>

    <form onsubmit="saveBrandingSettings(event)">
      <div class="color-settings-grid">
        <div class="color-input-card">
          <label class="form-label">Color Primario (Rojo institucional)</label>
          <div class="color-picker-flex">
            <input type="color" id="cfgColorPrimary" class="color-picker-input" value="${c.primary || '#c81d25'}" oninput="previewLiveColor('--primary-color', this.value)">
            <input type="text" id="cfgColorPrimaryText" class="form-control" value="${c.primary || '#c81d25'}" oninput="syncColorPicker('cfgColorPrimary', this.value)">
          </div>
        </div>

        <div class="color-input-card">
          <label class="form-label">Color Secundario / Acento (Oro)</label>
          <div class="color-picker-flex">
            <input type="color" id="cfgColorSecondary" class="color-picker-input" value="${c.secondary || '#e6b800'}" oninput="previewLiveColor('--secondary-color', this.value)">
            <input type="text" id="cfgColorSecondaryText" class="form-control" value="${c.secondary || '#e6b800'}" oninput="syncColorPicker('cfgColorSecondary', this.value)">
          </div>
        </div>

        <div class="color-input-card">
          <label class="form-label">Color de Fondo Principal</label>
          <div class="color-picker-flex">
            <input type="color" id="cfgColorBgDark" class="color-picker-input" value="${c.bgDark || '#111115'}" oninput="previewLiveColor('--bg-dark', this.value)">
            <input type="text" id="cfgColorBgDarkText" class="form-control" value="${c.bgDark || '#111115'}" oninput="syncColorPicker('cfgColorBgDark', this.value)">
          </div>
        </div>

        <div class="color-input-card">
          <label class="form-label">Color de Tarjetas</label>
          <div class="color-picker-flex">
            <input type="color" id="cfgColorCardBg" class="color-picker-input" value="${c.cardBg || '#1c1c23'}" oninput="previewLiveColor('--card-bg', this.value)">
            <input type="text" id="cfgColorCardBgText" class="form-control" value="${c.cardBg || '#1c1c23'}" oninput="syncColorPicker('cfgColorCardBg', this.value)">
          </div>
        </div>
      </div>

      <div style="background:#1e1e26; border:1px solid #2e2e3c; border-radius:var(--radius-md); padding:1.25rem; margin-bottom:1.5rem;">
        <h4 style="margin:0 0 1rem 0; color:#fff;">⚙️ Configuración del Negocio & Delivery</h4>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:1rem;">
          <div class="form-group">
            <label class="form-label">Nombre del Negocio</label>
            <input type="text" id="cfgRestaurantName" class="form-control" value="${currentConfig.restaurantName}">
          </div>

          <div class="form-group">
            <label class="form-label">Eslogan</label>
            <input type="text" id="cfgSlogan" class="form-control" value="${currentConfig.slogan}">
          </div>

          <div class="form-group">
            <label class="form-label">Número de WhatsApp (con código país)</label>
            <input type="text" id="cfgWhatsappNumber" class="form-control" value="${currentConfig.whatsappNumber}" required>
            <span style="font-size:0.75rem; color:var(--text-muted);">Ej: 584123714136</span>
          </div>

          <div class="form-group">
            <label class="form-label">Costo Base de Delivery ($ USD)</label>
            <input type="number" step="0.25" id="cfgDeliveryBase" class="form-control" value="${currentConfig.deliveryBasePrice || 2.50}">
          </div>

          <div class="form-group">
            <label class="form-label">Tasa Oficial del Día BCV (Bs. / USD) *</label>
            <div style="position:relative; display:flex; align-items:center;">
              <span style="position:absolute; left:12px; font-weight:800; color:var(--secondary-color);">Bs.</span>
              <input type="number" step="0.01" id="cfgExchangeRate" class="form-control" style="padding-left:42px;" value="${Number(currentConfig.bcvRate || currentConfig.exchangeRateBs || 45.20).toFixed(2)}" required>
            </div>
            <span style="font-size:0.75rem; color:var(--text-muted);">Tasa oficial del Banco Central de Venezuela para convertir los precios de $ a Bs.</span>
          </div>

          <div class="form-group">
            <label class="form-label">Modo Visual de la Página</label>
            <select id="cfgDefaultTheme" class="form-control">
              <option value="dark" ${currentTheme === 'dark' ? 'selected' : ''}>🌙 Modo Oscuro (Predeterminado)</option>
              <option value="light" ${currentTheme === 'light' ? 'selected' : ''}>☀️ Modo Claro</option>
            </select>
          </div>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center;">
        <button type="button" class="slide-btn" style="background:#374151;" onclick="resetThemeDefaults()">Restablecer Colores</button>
        <button type="submit" class="btn-primary-action">💾 Guardar Cambios</button>
      </div>
    </form>
  `;
}

function previewLiveColor(cssVar, hex) {
  document.documentElement.style.setProperty(cssVar, hex);
}

function syncColorPicker(pickerId, hex) {
  const p = document.getElementById(pickerId);
  if (p && /^#[0-9A-F]{6}$/i.test(hex)) {
    p.value = hex;
  }
}

function saveBrandingSettings(e) {
  e.preventDefault();

  const primary = document.getElementById('cfgColorPrimary').value;
  const secondary = document.getElementById('cfgColorSecondary').value;
  const bgDark = document.getElementById('cfgColorBgDark').value;
  const cardBg = document.getElementById('cfgColorCardBg').value;

  const restName = document.getElementById('cfgRestaurantName').value.trim();
  const slogan = document.getElementById('cfgSlogan').value.trim();
  const whatsapp = document.getElementById('cfgWhatsappNumber').value.trim().replace(/[^0-9]/g, '');
  const delivery = parseFloat(document.getElementById('cfgDeliveryBase').value) || 2.50;
  const rate = parseFloat(document.getElementById('cfgExchangeRate').value) || 45.0;
  const chosenTheme = document.getElementById('cfgDefaultTheme').value || 'dark';

  if (typeof applyTheme === 'function') {
    applyTheme(chosenTheme);
  }

  currentConfig.colors = {
    primary,
    primaryHover: adjustColorBrightness(primary, -20),
    secondary,
    bgDark,
    cardBg,
    textLight: '#f5f5f7'
  };

  currentConfig.restaurantName = restName || "Trigu's Bakery";
  currentConfig.slogan = slogan || "¡Date un gusto!";
  currentConfig.whatsappNumber = whatsapp || "584123714136";
  currentConfig.whatsappDisplay = formatWhatsappDisplay(currentConfig.whatsappNumber);
  currentConfig.deliveryBasePrice = delivery;
  currentConfig.bcvRate = rate;
  currentConfig.exchangeRateBs = rate;

  localStorage.setItem('trigus_config', JSON.stringify(currentConfig));

  applyDynamicTheme();
  renderProducts();
  showToast("✅ Cambios de colores y configuración guardados");
}

function formatWhatsappDisplay(raw) {
  if (raw.startsWith('58') && raw.length === 12) {
    return `+58 ${raw.slice(2, 5)}-${raw.slice(5)}`;
  }
  return `+${raw}`;
}

function resetThemeDefaults() {
  if (confirm("¿Restablecer los colores oficiales de Trigu's Bakery?")) {
    currentConfig.colors = { ...DEFAULT_CONFIG.colors };
    localStorage.setItem('trigus_config', JSON.stringify(currentConfig));
    applyDynamicTheme();
    const pane = document.getElementById('adminContentPane');
    if (pane && currentAdminTab === 'branding') renderBrandingSettings(pane);
    showToast("Colores restablecidos por defecto");
  }
}

// ==========================================================================
// 4. CARRUSEL DE FOTOS MANAGER
// ==========================================================================
function renderSliderManager(container) {
  const slides = currentConfig.heroSlides || [];

  container.innerHTML = `
    <div class="admin-actions-bar">
      <div>
        <h3 style="margin:0; color:#fff; font-size:1.2rem;">📸 Carrusel Horizontal de Comidas</h3>
        <p style="margin:0.2rem 0 0 0; color:var(--text-muted); font-size:0.8rem;">Estas son las fotos que se desplazan automáticamente en la portada.</p>
      </div>
      <button class="btn-primary-action" onclick="addNewHeroSlide()">+ Agregar Diapositiva</button>
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
      ${slides.map((s, idx) => `
        <div style="background:#1e1e26; border:1px solid #2e2e3c; border-radius:var(--radius-md); overflow:hidden; display:flex; flex-direction:column;">
          <img src="${s.image}" style="width:100%; height:140px; object-fit:cover;" onerror="this.src='assets/img/menu-cover.jpg'">
          <div style="padding:1rem; flex:1; display:flex; flex-direction:column;">
            <strong style="color:#fff; font-size:1rem; margin-bottom:0.3rem;">${s.title}</strong>
            <p style="color:var(--text-muted); font-size:0.8rem; margin:0 0 0.8rem 0; flex:1;">${s.subtitle}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:0.5rem; border-top:1px solid #2e2e3c;">
              <span style="font-size:0.75rem; color:var(--secondary-color); font-weight:700;">${s.tag}</span>
              <div>
                <button onclick="removeHeroSlide(${idx})" style="background:#dc2626; color:#fff; padding:4px 8px; border-radius:4px; font-size:0.75rem;">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function addNewHeroSlide() {
  const title = prompt("Título para la diapositiva:", "Nuevas Especialidades");
  if (!title) return;
  const subtitle = prompt("Subtítulo:", "Pídelo hoy con delivery directo");
  const tag = prompt("Etiqueta corta:", "Imperdible");

  currentConfig.heroSlides.push({
    title,
    subtitle: subtitle || '',
    tag: tag || 'Especial',
    image: 'assets/img/food-burger.jpg',
    categoryTarget: 'all'
  });

  localStorage.setItem('trigus_config', JSON.stringify(currentConfig));
  renderHeroSlider();
  const pane = document.getElementById('adminContentPane');
  if (pane && currentAdminTab === 'slider') renderSliderManager(pane);
  showToast("Diapositiva agregada al carrusel");
}

function removeHeroSlide(idx) {
  if (currentConfig.heroSlides.length <= 1) {
    alert("Debe haber al menos 1 imagen en el carrusel.");
    return;
  }
  currentConfig.heroSlides.splice(idx, 1);
  localStorage.setItem('trigus_config', JSON.stringify(currentConfig));
  renderHeroSlider();
  const pane = document.getElementById('adminContentPane');
  if (pane && currentAdminTab === 'slider') renderSliderManager(pane);
  showToast("Diapositiva eliminada");
}

// Bind initialization on script load
document.addEventListener('DOMContentLoaded', () => {
  initAdminPanel();
});
