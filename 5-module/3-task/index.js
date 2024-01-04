function initCarousel() {
  let counter = 0;
    
  let leftArrow = document.querySelector(".carousel__arrow_left");
  let rightArrow = document.querySelector(".carousel__arrow_right");
  let carouselInner = document.querySelector(".carousel__inner");

  leftArrow.style.display = 'none';

  let carousel = document.querySelector(".carousel");

  carousel.addEventListener('click', event => {
    element = event.target.closest('div');

    if (element.className === 'carousel__arrow carousel__arrow_right') {
      counter = counter + 1;
      carouselInner.style.transform = `translateX(-${carouselInner.offsetWidth * counter}px)`;
      if (counter != 0) {
        leftArrow.style.display = '';
      }
      if (counter === 3) {
        rightArrow.style.display = 'none';
      }
    }
    
    if (element.className === 'carousel__arrow carousel__arrow_left') {
      counter = counter - 1;
      carouselInner.style.transform = `translateX(-${carouselInner.offsetWidth * counter}px)`;
      if (counter === 0) {
        leftArrow.style.display = 'none';
      }
      if (counter !== 3) {
        rightArrow.style.display = '';
      }
    }
  })
}
