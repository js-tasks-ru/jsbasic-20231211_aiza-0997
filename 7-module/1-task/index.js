import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
  }

  render() {
    this.elem = createElement('<div class="ribbon"></div>');

    this.leftButton = this.createButton();
    this.rightButton = this.createButton();
    this.leftButton.classList.toggle('ribbon__arrow_left')
    this.rightButton.classList.toggle('ribbon__arrow_visible');
    this.rightButton.classList.toggle('ribbon__arrow_right');
    this.elem.appendChild(this.leftButton);
    this.elem.appendChild(this.rightButton);

    this.ribbonInner = this.createRibbonInner();

    for (let category of this.categories) {
      let categoryItem = this.createRibbonItem(category);

      this.ribbonInner.appendChild(categoryItem);
    }

    this.elem.appendChild(this.ribbonInner);

    this.leftButton.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
      this.ribbonInner.addEventListener('scroll', () => {
        this.checkVisibleButtons();
      })
    })
    
    this.rightButton.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
      this.ribbonInner.addEventListener('scroll', () => {
        this.checkVisibleButtons();
      })
    })

    this.ribbonInner.addEventListener('click', (event) => {
      event.preventDefault();
      let a = event.target.closest('a');
      let oldActiveElement = document.querySelector('.ribbon__item_active');
      a.classList.add('ribbon__item_active');
      if (oldActiveElement) {
        oldActiveElement.classList.remove('ribbon__item_active');
      }
    })

    this.elem.addEventListener('click', (event) => {
      let a = event.target.closest('a');
      if (a) {
        let ribbonSelect = new CustomEvent('ribbon-select', {
          detail : a.dataset.id,
          bubbles : true
        })

        this.elem.dispatchEvent(ribbonSelect);
      }
    })
  }

  checkVisibleButtons()
  {
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;
    // видимость правой кнопки
    if (scrollLeft > 1) {
      this.leftButton.classList.add('ribbon__arrow_visible')
    } else {
      this.leftButton.classList.remove('ribbon__arrow_visible')
    }

    // видимость левой кнопки
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    if (scrollRight < 1) {
      this.rightButton.classList.remove('ribbon__arrow_visible')
    } else {
      this.rightButton.classList.add('ribbon__arrow_visible')
    }
  }

  createRibbonInner()
  {
    return createElement(`<nav class="ribbon__inner"></nav>`);
  }

  createRibbonItem(category) {
    return createElement(`<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`)
  }

  createButton() {
    return createElement(`
      <button class="ribbon__arrow">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`
    );
  }
}
