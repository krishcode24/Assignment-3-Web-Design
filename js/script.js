document.addEventListener('DOMContentLoaded', function () {
  // CLOCK
  function updateClock() {
    const clock = document.getElementById("clock");
    if (clock) {
      const now = new Date();
      clock.textContent = now.toLocaleTimeString();
    }
  }

  // FLASH DEAL CLOCK
  function updateClockAndFlashDeal() {
    const clock = document.getElementById("clock");
    const flashStatus = document.getElementById("flash-status");
    const flashList = document.getElementById("flash-restaurants");

    if (clock && flashStatus && flashList) {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      clock.textContent = now.toLocaleTimeString();

      if (hours === 14) {
        flashStatus.textContent = "🔥 Flash Deal ON! Enjoy these delicious offers:";
        flashList.classList.remove("hidden");
      } else if (hours < 14) {
        flashStatus.textContent = "⏳ Flash Deal starts at 2PM!";
        flashList.classList.add("hidden");
      } else {
        flashStatus.textContent = "❌ Flash Deal ended. Come back tomorrow!";
        flashList.classList.add("hidden");
      }
    }
  }

  // Run clock updates only if the clock element exists
  if (document.getElementById("clock")) {
    setInterval(updateClockAndFlashDeal, 1000);
    updateClockAndFlashDeal();
  } else {
    setInterval(updateClock, 1000);
    updateClock();
  }

  // SCROLL TO TOP
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });

    scrollBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // SCROLL ANIMATION LEFT/RIGHT
  const left = document.querySelector('.animate-left');
  const right = document.querySelector('.animate-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.3
  });

  if (left) observer.observe(left);
  if (right) observer.observe(right);

  // CONFETTI ON HOVER CONTACT BUTTON
  const contactBtn = document.getElementById('contactBtn');
  if (contactBtn) {
    contactBtn.addEventListener('mouseenter', function () {
      if (typeof confetti === "function") {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        console.error("Confetti function is not loaded.");
      }
    });
  }

  // SWIPER INITIALIZATION
  const swiperEl = document.querySelector(".mySwiper");
  if (swiperEl && typeof Swiper !== "undefined") {
    const swiper = new Swiper(".mySwiper", {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  } else {
    console.warn("Swiper element not found or Swiper library not loaded.");
  }

  // VOUCHER SELECTION
  const voucherButtons = document.querySelectorAll('.apply-voucher');
  voucherButtons.forEach(button => {
    button.addEventListener('click', function () {
      const code = this.dataset.voucherCode;
      localStorage.setItem("appliedVoucher", code);
      alert(`Voucher ${code} applied!`);
    });
  });

  if (removeVoucherBtn) {
    removeVoucherBtn.addEventListener("click", () => {
      localStorage.removeItem("appliedVoucher");
      renderCart();
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartIcon = document.getElementById("cart-icon");
  const cartDropdown = document.getElementById("cart-dropdown");
  const cartItemsList = document.getElementById("cart-items");
  const emptyCartText = document.getElementById("empty-cart");

  // Toggle dropdown visibility
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      if (cartDropdown.style.display === "block") {
        cartDropdown.style.display = "none";
      } else {
        cartDropdown.style.display = "block";
      }
    });
  }

  // Function to add item
  window.addToCart = function (name) {
    cart.push(name);
    saveCart();
    renderCart();
  };

  // Function to remove item by index
  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  };

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Render cart UI
  function renderCart() {
    if (!cartItemsList || !emptyCartText) return;

    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
      emptyCartText.style.display = "block";
    } else {
      emptyCartText.style.display = "none";
      cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item} <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>`;
        cartItemsList.appendChild(li);
      });
    }
  }

  // Initial render
  renderCart();

  
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.question').forEach(btn => {
    btn.addEventListener('click', () => {
      const ans = btn.nextElementSibling;
      const isOpen = ans.classList.contains('open');
      ans.classList.toggle('open');
      btn.classList.toggle('active');
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Chat/Call/Email buttons behavior
  document.getElementById('chat-btn').onclick = () => {
  alert('Live chat launching soon…');
  };
  document.getElementById('email-btn').onclick = () => {
  window.location.href = 'mailto:support@dinedash.com';
  };

  // Form submission + confetti
  document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target.name.value;
  const type = e.target.type.value;
  alert(`Thanks, ${name}! Your "${type}" message has been sent.`);
  if (typeof confetti === 'function') {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }
  e.target.reset();
  });
  document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();
      alert('Thank you for your feedback!');
      this.reset();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Sample data — You can load from your product/voucher list
const data = [
  {
    title: 'JB Burger King - Whopper',
    description: 'Available in Johor Bahru',
    image: 'images/cities/jb.jpg',
    link: 'city.html#jb'
  },
  {
    title: 'Laksa House - Laksa delite',
    description: 'local favourite in Johor Bahru',
    image: 'images/cities/jb.jpg',
    link: 'city.html#jb'
  },
  {
    title: 'Chatto (Molek) - Ciabatta',
    description: 'delicious Ciabatta in Johor Bahru',
    image: 'images/cities/jb.jpg',
    link: 'city.html#jb'
  },
  {
    title: 'Udders ice cream @ Midvalley, Southkey - Vanilla Ice Cream',
    description: 'local favourite in Johor Bahru',
    image: 'images/cities/jb.jpg',
    link: 'city.html#jb'
  },
  {
    title: 'Chuckles Chicken - Chicken box',
    description: 'Johor Bahru favourite',
    image: 'images/cities/jb.jpg',
    link: 'city.html#jb'
  },
  {
    title: 'RM5 OFF Voucher',
    description: 'Min spend RM20, new users only',
    image: 'images/vouchers/rm5.png',
    link: 'vouchers.html#voucher'
  },
  {
    title: 'RM10 OFF Voucher',
    description: 'On orders above RM50, Limited time only',
    image: 'images/vouchers/rm10.png',
    link: 'vouchers.html#voucher'
  },
  {
    title: 'Free Delivery',
    description: 'Spend above RM30',
    image: 'images/vouchers/free.png',
    link: 'vouchers.html#voucher'
  },
  {
    title: 'Flash Deal 2PM',
    description: 'Promotion on selected meals 2PM Daily',
    image: 'images/vouchers/2pm.png',
    link: 'vouchers.html#voucher'
  },
  {
    title: 'Bundle Save',
    description: 'Buy 2 get 1 free',
    image: 'images/vouchers/bundle.png',
    link: 'vouchers.html#voucher'
  },
  {
    title: 'Domino\'s Pizza (Dato Keramat) - BoxKu Pizza',
    description: 'Local favourite in George Town',
    image: 'images/cities/penang.jpg',
    link: 'city.html#penang'
  },
  {
    title: 'Kakatoo Restaurant (Nu Sentral) - Signature Nasi Kerabu',
    description: 'Authentic Nasi Kerabu in Kuala Lumpur',
    image: 'images/cities/kl.jpg', 
    link: 'city.html#kl'
  },
  {
    title: 'Sherizas Food Realm - Mandi Chicken',
    description: 'Delicious Mandi Chicken in Kuala Lumpur',
    image: 'images/cities/kl.jpg',
    link: 'city.html#kl' 
  },
  {
    title: 'DIN by Din Tai Fung (NU Sentral) - Shrimp Egg Fried Rice',
    description: 'Best Egg Fried Rice in Kuala Lumpur',
    image: 'images/cities/kl.jpg',
    link: 'city.html#kl'
  },
  {
    title: 'Kailash Parbat Indian Vegetarian - Pav Bhaji',
    description: 'Vegetarian indian restaurant in Kuala Lumpur',
    image: 'images/cities/kl.jpg',
    link: 'city.html#kl'
  },
  {
    title: 'Gem Restaurant - Butter Chicken',
    description: 'Famous Butter Chicken in Kuala Lumpur',
    image: 'images/cities/kl.jpg',
    link: 'city.html#kl'
  },
  {
    title: 'Istanbul - Chicken Dum Briyani',
    description: 'Available in Penang',
    image: 'images/cities/penang.jpg',
    link: 'city.html#penang'
  },
  {
    title: 'Texas Chicken (Sunshine Square Penang) - 2pcs Chicken Meal',
    description: 'Delicious fried chicken in Penang',
    image: 'images/cities/penang.jpg',
    link: 'city.html#penang'
  },
  {
    title: 'Takoyaki Bayan Baru - Original',
    description: 'Famous Takoyaki in Penang', 
    image: 'images/cities/penang.jpg',
    link: 'city.html#penang'
  },
  {
    title: 'LX GreenLife Veggie Alma - CheeseBurger',
    description: 'Selling Vegetarian burger in Penang', 
    image: 'images/cities/penang.jpg',
    link: 'city.html#penang'
  },
  {
    title: 'Domino\'s Pizza (Inanam,Kota Kinabalu) - BoxKu Pizza',
    description: 'just like the one in Penang',
    image: 'images/cities/kk.jpg',
    link: 'city.html#kk'
  },
  {
    title: 'HWC Coffee (Imago Mall) - Caffe Latte',
    description: 'Local Latte in Kota Kinabalu',
    image: 'images/cities/kk.jpg',
    link: 'city.html#kk'
  },
  {
    title: 'Chili\'s Grill & Bar - Chicken Caesar Salad',
    description: 'Famous salad in Kota Kinabalu',
    image: 'images/cities/kk.jpg',
    link: 'city.html#kk'
  },
  {
    title: 'Secret Recipe - Chocolate Indulgence',
    description: 'Editor\'s choice in Kota Kinabalu',
    image: 'images/cities/kk.jpg',
    link: 'city.html#kk'
  },
  {
    title: 'Pizza Hut (Kota Kinabalu) - Hawaiian Chicken Pizza',
    description: 'Local favourite in Kota Kinabalu',
    image: 'images/cities/kk.jpg',
    link: 'city.html#kk'
  },
  {
    title: 'Ipoh White Coffee Café - Latte',
    description: 'Local latte in ipoh',
    image: 'images/cities/ipoh.jpg',
    link: 'city.html#ipoh'
  },
  {
    title: 'Dim Sum Street - Pau',
    description: 'Classic pau in ipoh',
    image: 'images/cities/ipoh.jpg',
    link: 'city.html#ipoh'
  },
  {
    title: 'Restoran Nasi Kandar Ayam Penyet - Nasi Kandar',
    description: 'Local favourite in ipoh',
    image: 'images/cities/ipoh.jpg',
    link: 'city.html#ipoh'
  },
  {
    title: 'KADIR PASEMBOR (Lotus\'S Ipoh Garden) - Pasembor',
    description: 'Famous Pasembor in Ipoh',
    image: 'images/cities/ipoh.jpg',
    link: 'city.html#ipoh'
  },
  {
    title: 'Restoran Nasi Kandar Subaidah - Nasi Kandar',
    description: 'popular Nasi Kandar in Ipoh',
    image: 'images/cities/ipoh.jpg',
    link: 'city.html#ipoh'
  },
  {
    title: 'Burger King - Whopper',
    description: 'Available in all cities',
    image: 'images/burgerking.jpg',
    link: 'restaurant.html#restaurant'
  },
  {
    title: 'Sushi King - Classic',
    description: 'Available in all cities',
    image: 'images/sushi.png',
    link: 'restaurant.html#restaurant'
  },
  {
    title: 'KC\'s Kitchen - Nasi Lemak',
    description: 'Malaysian\'s favourite',
    image: 'images/kc.png',
    link: 'restaurant.html#restaurant'
  },
  {
    title: 'Secret Recipe - Chocolate Cake',
    description: 'Available in all cities',
    image: 'images/restaurant/SR.jpg',
    link: 'restaurant.html#restaurant'
  },
  {
    title: 'Pizza Hut - Pepperoni Pizza',
    description: 'Available in all cities',
    image: 'images/restaurant/pizza.jpg',
    link: 'restaurant.html#restaurant'
  },
  {
    title: 'KFC - Original Recipe Chicken',
    description: 'Available in all cities',
    image: 'images/restaurant/kfc.jpeg',
    link: 'restaurant.html#restaurant'
  },
  {
    title: 'Texas Chicken - Spicy Chicken',
    description: 'Available in all cities',
    image: 'images/restaurant/texas.jpg',
    link: 'restaurant.html#restaurant'
  },
  {
    title: 'Old Town White Coffee - Kopi O',
    description: 'classic Malaysian coffee',
    image: 'images/restaurant/oldtown.png',
    link: 'restaurant.html#restaurant'
  },
];


function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name)?.toLowerCase() || '';
}

function createCard(item) {
  return `
    <div class="product-card">
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `;
}

window.onload = () => {
  const query = getQueryParam('query');
  const resultsContainer = document.getElementById('search-results');
  const resultsCount = document.getElementById('results-count');
  const noResults = document.getElementById('no-results');

  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(query) || 
    item.description.toLowerCase().includes(query)
  );

  if (filtered.length > 0) {
    resultsContainer.innerHTML = filtered.map(createCard).join('');
    resultsCount.textContent = `Found ${filtered.length} result(s) for: "${query}"`;
    noResults.style.display = 'none';
  } else {
    resultsContainer.innerHTML = '';
    resultsCount.textContent = '';
    noResults.style.display = 'block';
  }
  };

function createCard(item) {
  return `
    <div class="product-card">
      <a href="${item.link}">
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
      </a>
      <p>${item.description}</p>
    </div>
  `;
}

});