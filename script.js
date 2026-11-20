const products = [
  {
    id: 1,
    name: "Don't Be Late",
    style: "(Semi-Ringer Tee)",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Maroon"],
    price: 399,
    image: "images/shirt1.png",
    description: "Maroon semi-ringer tee featuring a classic coffee cup graphic inspired by early-morning UP Diliman classes. Made with breathable cotton blend for everyday campus wear."
  },
  {
    id: 2,
    name: "Everyday Comfort",
    style: "(Crew Neck T-Shirt)",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sunset Tie-Dye"],
    price: 349,
    image: "images/shirt2.png",
    description: "Soft sunset-gradient crew neck t-shirt built for maximum comfort during long library study sessions and casual campus walks."
  },
  {
    id: 3,
    name: "Do Good Work",
    style: "(Baggy T-Shirt)",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Pastel Yellow"],
    price: 449,
    image: "images/shirt3.png",
    description: "Relaxed oversized pastel yellow t-shirt with a cheerful mascot reminder to keep doing good work every day."
  }
];

const quantities = { 1: 1, 2: 1, 3: 1 };
let currentOrder = "";

function cardHTML(item, isClickable) {
  const click = isClickable ? `onclick="openProductDetail(${item.id})"` : "";
  return `
    <div class="product-card-wrapper" ${click}>
      <div class="arch-card">
        <div class="arch-inner">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <h3>${item.name}</h3>
        <p>${item.style}</p>
      </div>
      <div class="card-pills">
        <div class="pill">Size: ${item.sizes.join(", ")}</div>
        <div class="pill">Price: ₱${item.price}</div>
      </div>
    </div>
  `;
}

function rowHTML(item, prefix) {
  const sizeOptions = item.sizes.map(s => `<option value="${s}">${s}</option>`).join("");
  const colorOptions = item.colors.map(c => `<option value="${c}">${c}</option>`).join("");

  return `
    <div class="shop-item-row">
      ${cardHTML(item, false)}
      <div class="shop-right-panel">
        <div class="desc-box">
          <strong>Product description:</strong><br>
          ${item.description}
        </div>
        <div class="options-bar-row">
          <div class="options-teal-box">
            <span>Select size and color:</span>
            <div class="select-group">
              <select id="${prefix}-size-${item.id}">${sizeOptions}</select>
              <select id="${prefix}-color-${item.id}">${colorOptions}</select>
            </div>
          </div>
          <div class="qty-control">
            <button type="button" class="qty-btn" onclick="updateItemQty(${item.id}, -1, '${prefix}')">−</button>
            <span class="qty-display" id="${prefix}-qty-${item.id}">${quantities[item.id]}</span>
            <button type="button" class="qty-btn" onclick="updateItemQty(${item.id}, 1, '${prefix}')">+</button>
          </div>
        </div>
        <button type="button" class="order-action-btn" onclick="triggerOrderModal(${item.id}, '${prefix}')">
          Order Button
        </button>
      </div>
    </div>
  `;
}

function renderAllViews(list = products) {
  document.getElementById("homeProductGrid").innerHTML = list.map(item => cardHTML(item, true)).join("");
  document.getElementById("shopVerticalList").innerHTML = list.map(item => rowHTML(item, "shop")).join("");
}

function openProductDetail(id) {
  const item = products.find(p => p.id === id);
  document.getElementById("singleProductContainer").innerHTML = rowHTML(item, "detail");
  navigateTo("detail");
}

function updateItemQty(id, change, prefix) {
  if (quantities[id] + change >= 1) {
    quantities[id] += change;
    document.getElementById(`${prefix}-qty-${id}`).textContent = quantities[id]; } }  function triggerOrderModal(id, prefix) { const item = products.find(p => p.id === id); const size = document.getElementById(`${
