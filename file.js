const slider = document.querySelector('.slider'),
image = document.querySelectorAll('.slider img'),
prevBtn = document.querySelector('#prevBtn'),
nextBtn = document.querySelector('#nextBtn');

//counter for the amount of the transmition of the slider 
let counter = 0;

//array for the top brands
let brandsNames = ['Acer', 'Apple', 'Amazon', 'Asus', 'Google', 'Honor', 'HP', 'HTC', 'Huawei', 'Infinix', 'LG', 'Microsoft', 'Razer', 'Realme','Samsung','Sharp','Sony','Xiaomi','XOLO','Yezz','Oppo','ZTE']

const size = image[0].clientWidth;
nextBtn.addEventListener('click', () => {
    nextSlide();
    
})
prevBtn.addEventListener('click', () => {
    
    if (counter >= 1) {
        counter--;
    }
    else {
        counter = image.length - 1;
    }
    slider.style.transform = `translateX(${-size * counter}px)`
    //console.log(counter)
})
function nextSlide() {
    if (counter < image.length - 1) {
        counter++;
    } else {
        counter = 0;
    }
    slider.style.transform = `translateX(${-size * counter}px)`
}
 setInterval(nextSlide, 2000)
