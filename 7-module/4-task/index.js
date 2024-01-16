import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;
    this.render();
  }

  onPointerDown = (event) => {
    this.elem.classList.add('slider_dragging');
    event.preventDefault(); 
    document.addEventListener('pointermove', this.onPointerMove)      
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerUp = () => {
    document.removeEventListener('pointerup', this.onPointerUp);
    document.removeEventListener('pointermove', this.onPointerMove);
    this.elem.classList.remove('slider_dragging');
    
    let sliderChange = new CustomEvent('slider-change', {
      detail : this.value,
      bubbles : true
    })

    this.elem.dispatchEvent(sliderChange);
  }

  onPointerMove = (event) => {
    event.preventDefault();
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let sliderValue = document.querySelector('.slider__value');
    let rounded = Math.round(approximateValue)
    this.value = rounded;
    sliderValue.textContent = rounded;
  }

  render() {
    this.elem = this.createSlider();
    this.elem.appendChild(this.createSliderSteps());
    this.countPercents();

    let thumb = this.elem.querySelector('.slider__thumb');

    thumb.ondragstart = () => false;
    thumb.onpointerdown = this.onPointerDown;

    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);
      this.elem.querySelector('.slider__value').textContent = this.value;
      this.countPercents();
      let sliderChange = new CustomEvent('slider-change', {
        detail : this.value,
        bubbles : true
      })

      this.elem.dispatchEvent(sliderChange);
    })
  }

  countPercents() {
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    let leftPercents = this.value / (this.steps - 1) * 100;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }

  createSlider() {
    return createElement(`<div class="slider"><div class="slider__thumb">
    <span class="slider__value">${this.value}</span>
  </div><div class="slider__progress"></div></div>`)
  }

  createSliderSteps() {
    let sliderSteps = createElement(`<div class="slider__steps"></div>`);
    for (let i = 0; i < this.steps; i++) {
      let sliderStep = createElement(`<span></span>`);
      if (i === this.value) {
        sliderStep.classList.add('slider__step-active');
      }
      sliderSteps.appendChild(sliderStep);
    }
    return sliderSteps;
  }
}
