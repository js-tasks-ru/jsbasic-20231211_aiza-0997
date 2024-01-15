import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;
    this.render();
  }

  render() {
    this.elem = this.createSlider();
    this.elem.appendChild(this.createSliderSteps());
    this.countPercents();

    let thumb = this.elem.querySelector('.slider__thumb');
    // thumb.value = this.value;

    thumb.onpointerdown = (event) => {
      let elem = document.querySelector('.slider');
      elem.classList.add('slider_dragging');
      
      event.preventDefault(); 
      
      document.addEventListener('pointermove', onPointerMove)      

      function onPointerMove(event) {
        move(event)
      }

      function move(event) {
        console.log(event.clientX, 111);
        let left = event.clientX - elem.getBoundingClientRect().left;
        let leftRelative = left / elem.offsetWidth;
  
        if (leftRelative < 0) {
          leftRelative = 0;
        }
  
        if (leftRelative > 1) {
          leftRelative = 1;
        }
  
        let leftPercents = leftRelative * 100;
        let thumb = elem.querySelector('.slider__thumb');
        let progress = elem.querySelector('.slider__progress');
  
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
        // ??? steps, this
        let segments = 5 - 1;
        let approximateValue = leftRelative * segments;
        let sliderValue = document.querySelector('.slider__value');
        let rounded = Math.round(approximateValue)
        document.myValue = rounded;
        sliderValue.textContent = rounded;
      }

      document.addEventListener('pointerup', onPointerUp);

      function onPointerUp() {
        document.removeEventListener('pointerup', onPointerUp);
        document.removeEventListener('pointermove', onPointerMove);
        elem.classList.remove('slider_dragging');
        
        console.log(event.curentTarget.myValue);
        let left = event.clientX - elem.getBoundingClientRect().left;
        let leftRelative = left / elem.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }
  
        if (leftRelative > 1) {
          leftRelative = 1;
        }
  
        let segments = 5;
        let approximateValue = leftRelative * segments;
        let rounded = Math.round(approximateValue)

        console.log(rounded, approximateValue);
        
        let sliderChange = new CustomEvent('slider-change', {
          detail : rounded,
          bubbles : true
        })
  
        elem.dispatchEvent(sliderChange);
      }
    };

    thumb.ondragstart = () => false;

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

    console.log(this.value, this.steps);
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
