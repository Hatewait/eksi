const switchButtons = document.querySelectorAll('[data-switch-template]');
const productsContainer = document.querySelector('[data-products-container]');
const productCards = productsContainer?.querySelectorAll('.product-card');

const removeClass = (coll, className) => coll.forEach((item) => {
  item.classList.remove(className);
});

if (switchButtons) {
  switchButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      removeClass(switchButtons, 'category__template-button_active');
      e.currentTarget.classList.add('category__template-button_active');
      if (e.currentTarget.getAttribute('data-switch-template') === 'grid') {
        productsContainer.classList.contains('category__products_line') ? productsContainer.classList.remove('category__products_line') : '';
        productCards.forEach(card => card.classList.remove('product-card_line'))
      } else if (e.currentTarget.getAttribute('data-switch-template') === 'line') {
        productsContainer.classList.add('category__products_line');
        productCards.forEach(card => card.classList.add('product-card_line'))
      }
    })
  })
}
