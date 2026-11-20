const products = [
  {
    id: 1,
    name: "Don't Be Late",
    style: "(Semi-Ringer Tee)",
    sizes: "S, M, L, XL",
    price: "₱399",
    image: "images/shirt1.png"
  },
  {
    id: 2,
    name: "Everyday Comfort",
    style: "(Crew Neck T-Shirt)",
    sizes: "S, M, L, XL",
    price: "₱349",
    image: "images/shirt2.png"
  },
  {
    id: 3,
    name: "Do Good Work",
    style: "(Baggy T-Shirt)",
    sizes: "S, M, L, XL",
    price: "₱449",
    image: "images/shirt3.png"
  }
];

function renderHomeProducts(list) {
  const grid = document.getElementById("homeProductGrid");
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; font-weight: 600;">No shirts match your search.</p>`;
    return;
  }

  grid.innerHTML = list.map(item => `
    <div class="product-card-wrapper" onclick="openProductSlide(${item.id})">
      <div class="arch-card">
        <div class="arch-inner">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <h3>${item.name}</h3>
        <p>${item.style}</p>
      </div>
      <div class="card-pills">
        <div class="pill">Size: ${item.sizes}</div>
        <div class="pill">Price: ${item.price}</div>
      </div>
    </div>
  `).join("");
}

function filterProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.style.toLowerCase().includes(query)
  );
  renderHomeProducts(filtered);
}

// Opens the individual shirt slide when clicked
function openProductSlide(productId) {
  window.location.href = `product.html?id=${productId}`;
}

// Render cards on page load
renderHomeProducts(products);
