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