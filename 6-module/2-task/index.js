import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  #elem;
  constructor(product) {
    let div = createElement(`<div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
        <span class="card__price">€${product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div></div>`)
      
    this.#elem = div;
      
    this.#elem.addEventListener('click', (event) => {
      let button = event.target.closest('button');
      if (button.className === 'card__button') {
        let productAdd = new CustomEvent('product-add', {
          detail : product.id,
          bubbles : true
        })

        this.#elem.dispatchEvent(productAdd);
      }
    }) 
  }

  get elem()
  {
    return this.#elem;
  }
}