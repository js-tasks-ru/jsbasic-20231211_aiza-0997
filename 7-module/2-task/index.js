import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
  }

  setTitle(title) {
    this.modalTitle.textContent = title; 
  }

  setBody(node) {
    let modalBody = this.modalInner.querySelector('.modal__body');
    if (modalBody) {
      this.modalInner.removeChild(modalBody);
    }
    this.modalInner.appendChild(this.createModalBody(node));
  }

  open() {
    document.body.appendChild(this.modal);
    document.body.classList.add('is-modal-open');

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    }, {once : true})
  }

  close() {
    document.body.classList.remove('is-modal-open');
    let modal = document.querySelector('.modal');
    if (modal) {
      document.body.removeChild(modal);    
    }
  }

  render() {
    this.modal = this.createModal();
    this.modalInner = this.createModalInner();
    this.modalHeader = this.createModalHeader();
    this.modalTitle = this.createModalTitle();
    this.modalHeader.appendChild(this.modalTitle);
    this.modalInner.appendChild(this.modalHeader);
    this.modal.appendChild(this.modalInner);

    this.modal.addEventListener('click', (event) => {
      let closeButton = event.target.closest('button');
      if (closeButton && closeButton.className === 'modal__close') {
        this.close();
      }
    })
  }

  createModal() {
    return createElement(`<div class="modal"><div class="modal__overlay"></div></div>`);
  }

  createModalInner() {
    return createElement(`<div class="modal__inner"></div>`);
  }

  createModalHeader() {
    return createElement(`<div class="modal__header">
    <button type="button" class="modal__close">
      <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
    </button>
    </div>`);
  }

  createModalTitle() {
    return createElement(`<h3 class="modal__title"></h3>`);
  }

  createModalBody(node) {
    let modalBody = createElement(`<div class="modal__body"></div>`);
    modalBody.appendChild(node); 
    return modalBody;
  }
}
