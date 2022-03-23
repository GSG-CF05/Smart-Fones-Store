// Show or hide the Drawer when pressing Hampurger menu or X
function displayDrawer() {
  if (document.getElementById("drawer").style.display == "none") {
    document.getElementById("drawer").style.display = "block";
  } else {
    document.getElementById("drawer").style.display = "none";
  }
}
//                                splash
const splash = document.querySelector(".splash");
document.addEventListener("DOMContentLoaded", (e) => {
  setTimeout(() => {
    splash.classList.add("display-none");
  }, 3000);
});

//                             slider
const slider = document.querySelector(".slider"),
  image = document.querySelectorAll(".slider img"),
  prevBtn = document.querySelector("#prevBtn"),
  nextBtn = document.querySelector("#nextBtn");

//counter for the amount of the transmition of the slider
let counter = 0;

//array for the top brands
// let brandsNames = ['Acer', 'Apple', 'Amazon', 'Asus', 'Google', 'Honor', 'HP', 'HTC', 'Huawei', 'Infinix', 'LG', 'Microsoft', 'Razer', 'Realme','Samsung','Sharp','Sony','Xiaomi','XOLO','Yezz','Oppo','ZTE']

const size = image[0].clientWidth;
nextBtn.addEventListener("click", () => {
  nextSlide();
});
prevBtn.addEventListener("click", () => {
  if (counter >= 1) {
    counter--;
  } else {
    counter = image.length - 1;
  }
  slider.style.transform = `translateX(${-size * counter}px)`;
  //console.log(counter)
});
function nextSlide() {
  if (counter < image.length - 1) {
    counter++;
  } else {
    counter = 0;
  }
  slider.style.transform = `translateX(${-size * counter}px)`;
}
setInterval(nextSlide, 2000);



// Get the brand cards div
let brandsCards = document.getElementById("brands-cards");
// Get the products cards div
let productsCards = document.getElementsByClassName("products-cards")[0];
let productsCardsContainer = document.getElementsByClassName("top-products")[0];

// Specify What brands do you want to select form the api
let topBrands = [
  "Apple",
  "Google",
  "Huawei",
  "Samsung",
  "Sony",
  "Xiaomi",
  "Honor",
  "Toshiba",
  "Realme",
  "BlackBerry",
  "HTC",
  "Lenovo",
];

// Get the selected brands information from the api
function fetchTopBrands() {
  fetch("https://api-mobilespecs.azharimm.site/v2/brands")
    .then((res) => res.json())
    .then((brandsData) => {
      let brands = [];
      for (let i = 0; i < topBrands.length; i++) {
        brands.push(findBrandByBrandName(brandsData, topBrands[i]));
      }
      // create the brands cards
      brands.forEach((item) => {
        let brandCard = document.createElement("a");
        brandCard.setAttribute("class", "brand-card");
        brandsCards.appendChild(brandCard);
        brandCard.setAttribute(
          "href",
            "/productspage/products.html?brandSlug=" +
            item.brand_slug
        );
        let brandTitle = document.createElement("h4");
        brandTitle.textContent = item.brand_name;
        brandCard.appendChild(brandTitle);
      });
    });
}

// execute the code to get the Top brands
fetchTopBrands();
// find the brand in the fetched brands data from the api
function findBrandByBrandName(brandsData, brandName) {
  return brandsData.data.find((brand) => brand.brand_name === brandName);
}

let arrayForPrice = [
    799, 1199, 869, 999, 819, 849, 949, 709, 769, 629, 599, 689, 950, 699, 1399,
    1100, 750, 670,
  ];
  
  // Get the latest products from the api
  fetchLatestProducts();
  function fetchLatestProducts() {
    fetch("https://api-mobilespecs.azharimm.site/v2/latest")
      .then((res) => res.json())
      .then((productsData) => {
        // create the cards products
        let i = 0;
        productsData.data.phones.forEach((item) => {
          let productCardDiv = document.createElement("div");
          productCardDiv.setAttribute("class", "slide");
          productsCards.appendChild(productCardDiv);
          let productCard = document.createElement("div");
          productCardDiv.appendChild(productCard);
          productCard.setAttribute("class", "productCard");
          let productImg = document.createElement("img");
          productCard.appendChild(productImg);
          productImg.setAttribute("class", "productImg");
          productImg.setAttribute("src", item.image);
          let productTitle = document.createElement("h4");
          productCard.appendChild(productTitle);
          productTitle.setAttribute("class", "productTitle");
          productTitle.textContent = item.phone_name;
          // !  price   and cart icon  continar
  
          let priceAndCartContinar = document.createElement("div");
          priceAndCartContinar.setAttribute("class", "price-and-add-to-cartIcon");
          productCard.appendChild(priceAndCartContinar);
  
          // ! create price and add value from {"arrayForPrice " /  line  9 /    }
  
          let productPrice = document.createElement("p");
          productPrice.textContent = "$" + arrayForPrice[i]; // price();
          productPrice.setAttribute("class", "price");
          priceAndCartContinar.appendChild(productPrice);
  
          // !  "   create add to cart  "  icon
  
          let addToCartIcon = document.createElement("img");
          //  addToCartIcon.src = "image/addToCart.svg";
          addToCartIcon.src = "addToCart.png";
  
          priceAndCartContinar.appendChild(addToCartIcon);
          addToCartIcon.setAttribute("class", "add-to-cart");
  
          //?  part  ' 2 ' / addEventListener to  addToCartIcon
          addToCartIcon.setAttribute("onclick", "setItemLocal(event);");
          // addToCartIcon.addEventListener("click", setItemLocal);
          i++; //!   line  64
        });
  
        moveSlidesRight();
      });
  }
  
  
function setItemLocal(e) {
    e.preventDefault();
    //! get value from html element
    let mobileImg = e.target.parentElement.parentElement.children[0].src;
    let mobileName = e.target.parentElement.parentElement.children[1].textContent;
    let mobilePrice = e.target.parentElement.firstElementChild.textContent;
  
    //! Get the array if it exists in LocalStorage
  
    let arrayLocalStorage = JSON.parse(localStorage.getItem("arrayLocalStorage"));
  
    //! If the array actually contains elements, the elements will be added directly without creating elements
    if (arrayLocalStorage) {
      let data = { mobileImg, mobileName, mobilePrice };
      arrayLocalStorage.push(data);
      localStorage.setItem(
        "arrayLocalStorage",
        JSON.stringify(arrayLocalStorage)
      );
  
      //! If the array has no elements, the array is created and the data is added
    } else {
      let arrayLocalStorage = [];
      let data = { mobileImg, mobileName, mobilePrice };
      arrayLocalStorage.push(data);
      localStorage.setItem(
        "arrayLocalStorage",
        JSON.stringify(arrayLocalStorage)
      );
    }
  }