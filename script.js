document.addEventListener("DOMContentLoaded", () => {
  const cars = [
    {
      name: "Mercedes",
      model: "Mercedes-Benz Classe E",
      pricePerDay: 250,
      image:"https://www.autoscout24.fr/cms-content-assets/1EHZuEKDtjl5gFeuobzpel-7e9eace5aa0a18caefe727647cea5817-mercedes-benz-e-klasse-l-01-1100.jpg",
      caractéristiques: "Confort,Cuir,Automatique,GPS",
    },

    {
      name: "BMW",
      model: "BMW Série 5",
      pricePerDay: 300,
      image:"https://www.auto-infos.fr/mediatheque/4/4/7/000181744_896x598_c.jpg",
      caractéristiques: "Puissance, Luxe, technologie",
    },
    {
      name: "BMW",
      model: "BMW Série 3",
      pricePerDay: 180,
      image:"https://cdn.motor1.com/images/mgl/40KrEA/s3/bmw-3er-limousine-2024-und-bmw-3er-touring-2024.jpg",
      caractéristiques: "Puissance, Luxe, technologie",
    },

    {
      name: "Audi",
      model: "Audi A4",
      pricePerDay: 150,
      image:"https://hips.hearstapps.com/hmg-prod/images/2021-audi-a4-45-tfsi-quattro-104-1607927016.jpg?crop=0.450xw:0.380xh;0.226xw,0.399xh&resize=1200:*",
      caractéristiques: "Design moderne, silencieuse",
    },
    {
      name: "Audi",
      model: "Audi A6",
      pricePerDay: 250,
      image:"https://www.steveny.be/wp-content/uploads/2024/08/Audi-A6-e-tron-2025-3.jpg",
      caractéristiques: "Design moderne, silencieuse",
    },
    {
      name: "Land Rover",
      model: "Range Rover Sport",
      pricePerDay: 500,
      image:"https://voldt.fr/cdn/shop/collections/Tesla_Models_2f8cf45a-7d10-4d42-b342-e57bddac05a0.webp?v=1686041249",
      caractéristiques: "SUV de luxe, 4x4, presstige",
    },
    {
      name: "Land Rover",
      model: "Range Rover Evoque",
      pricePerDay: 300,
      image:"https://images.caradisiac.com/logos-ref/modele/modele--land-rover-range-rover-evoque/S0-modele--land-rover-range-rover-evoque.jpg",
      caractéristiques: "SUV de luxe, 4x4, presstige",
    },

    {
      name: "Porshe",
      model: "Porshe Cayenne",
      pricePerDay: 700,
      image:"https://editorial.pxcrush.net/carsales/general/editorial/porsche-cayenne-gts-2-cfhy.jpg?width=1024&height=682",
      caractéristiques: "Sportivité+élégence",
    },
    {
      name: "Porshe",
      model: "Macan",
      pricePerDay: 500,
      image:"https://www.turbo.fr/sites/default/files/2025-01/%40Nass%20M.%20-%20Porsche%20Macan%20Electric%201.jpg",
      caractéristiques: "Sportivité+élégence",
    },
    {
      name: "Mercedes",
      model: "Mercedes SUV",
      pricePerDay: 400 - 800,
      image:"https://lescape.pl/media/cache/bb/3b/bb3b70190e422e32ba3ed893b22ab6da.webp",
      caractéristiques: "SUV premuim haut de gamme",
    },
    {
      name: "Jaguar",
      model: "Jaguar XE ",
      pricePerDay:450,
      image:"https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1702920993/autoexpress/2023/12/2023%20Jaugar%20XE%20-%20front%20tracking_pfjkvs.jpg",
      caractéristiques: "élégance britannique",
    },
    {
      name: "Tesla",
      model: "Tesla Model 3 (rare)",
      pricePerDay:600,
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwHkEmmLDd9Z_S9irwMM9PzOMI9k9VmIONEA&s",
      caractéristiques: "électrique,moderne,silence",
    },
  ];

  const carGrid = document.getElementById("car-grid");
  const cartButton = document.getElementById("cart-button");
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartTotalPriceEl = document.getElementById("cart-total-price");
  const cartCountEl = document.getElementById("cart-count");
  const cartOverlay = document.getElementById("cart-overlay");
  const emptyCartMessage = document.querySelector(".cart-empty-message");

  let cart = [];

  function populateCarGrid() {
    if (!carGrid) return;

    let carHtml = "";
    cars.forEach((car, index) => {
      carHtml += `
                <div class="car-card animate-on-scroll" style="transition-delay: ${
                  index * 100
                }ms">
                    <img src="${car.image}" alt="${car.name}">
                    <div class="car-card-content">
                        <h3>${car.name}</h3>
                        <p class="car-model">${car.model}</p>
                        <div class="car-price">TND${
                          car.pricePerDay
                        }<span>/day</span></div>
                        <button class="rent-button" data-index="${index}">Rent Now</button>
                    </div>
                </div>
            `;
    });
    carGrid.innerHTML = carHtml;
  }

  function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    if (!("IntersectionObserver" in window)) {
      animatedElements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }

  function toggleCart() {
    cartSidebar.classList.toggle("open");
    cartOverlay.classList.toggle("open");
  }

  function updateCartUI() {
    if (cart.length === 0) {
      emptyCartMessage.style.display = "block";
      cartItemsContainer.innerHTML = "";
      cartItemsContainer.appendChild(emptyCartMessage);
    } else {
      emptyCartMessage.style.display = "none";
      cartItemsContainer.innerHTML = cart
        .map(
          (item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.pricePerDay}/day</p>
                    </div>
                    <button class="cart-item-remove" data-index="${index}" aria-label="Remove ${item.name} from cart">&times;</button>
                </div>
            `
        )
        .join("");
    }

    const total = cart.reduce((sum, item) => sum + item.pricePerDay, 0);
    cartTotalPriceEl.textContent = `$${total}/day`;
    cartCountEl.textContent = cart.length;
    cartCountEl.classList.toggle("visible", cart.length > 0);
  }

  function addToCart(carIndex) {
    const car = cars[carIndex];
    if (cart.some((item) => item.name === car.name)) {
      alert(`${car.name} is already in your cart.`);
      return;
    }
    cart.push(car);
    updateCartUI();
    cartSidebar.classList.add("open");
    cartOverlay.classList.add("open");
  }

  function removeFromCart(itemIndex) {
    cart.splice(itemIndex, 1);
    updateCartUI();
  }

  function setupEventListeners() {
    cartButton.addEventListener("click", toggleCart);
    closeCartBtn.addEventListener("click", toggleCart);
    cartOverlay.addEventListener("click", toggleCart);

    carGrid.addEventListener("click", (e) => {
      if (e.target.classList.contains("rent-button")) {
        const carIndex = e.target.dataset.index;
        addToCart(carIndex);
      }
    });

    cartItemsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("cart-item-remove")) {
        const itemIndex = e.target.dataset.index;
        removeFromCart(itemIndex);
      }
    });
  }

  populateCarGrid();
  setupScrollAnimations();
  setupEventListeners();
  updateCartUI();
});
