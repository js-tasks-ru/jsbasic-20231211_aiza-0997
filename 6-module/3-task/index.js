import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.counter = 0;
    let carousel = createElement(`<div class="carousel"></div>`);

    this.leftArrow = createElement(`<div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
  </div>`);

    carousel.appendChild(this.leftArrow);

    this.leftArrow.style.display = 'none';

    this.rightArrow = createElement(`<div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </div>`);

    carousel.appendChild(this.rightArrow);
      
    let carouselInner = createElement('<div class="carousel__inner"></div>');

    for (let item of this.slides) {
      let slide = createElement(`<div class="carousel__slide" data-id="${item.id}">
        <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${item.price.toFixed(2)}</span>
          <div class="carousel__title">${item.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`)

      carouselInner.appendChild(slide);
    }

    carousel.appendChild(carouselInner);

    this.elem = carousel;

    this.elem.addEventListener('click', (event) => {
      let element = event.target.closest('div');

      if (element.className === 'carousel__arrow carousel__arrow_right') {
        this.counter = this.counter + 1;
        carouselInner.style.transform = `translateX(-${carouselInner.offsetWidth * this.counter}px)`;
        if (this.counter != 0) {
          this.leftArrow.style.display = '';
        }
        if (this.counter === this.slides.length - 1) {
          this.rightArrow.style.display = 'none';
        }
      }
      
      if (element.className === 'carousel__arrow carousel__arrow_left') {
        this.counter = this.counter - 1;
        carouselInner.style.transform = `translateX(-${carouselInner.offsetWidth * this.counter}px)`;
        if (this.counter === 0) {
          this.leftArrow.style.display = 'none';
        }
        if (this.counter !== this.slides.length - 1) {
          this.rightArrow.style.display = '';
        }
      }
    })

    this.elem.addEventListener('click', (event) => {
      let button = event.target.closest('button');
      if (button && button.className === 'carousel__button') {
        let productAdd = new CustomEvent('product-add', {
          detail : button.closest('div.carousel__slide').dataset.id,
          bubbles : true
        })

        this.elem.dispatchEvent(productAdd);
      }
    })
  }
}
