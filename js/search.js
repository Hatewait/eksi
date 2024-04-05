'use strict'

const openSearchLayoutButton = document.querySelector('[data-open-search-layout]');
const searchLayout = document.querySelector('[data-search-layout]');
const closeSearchLayoutButton = document.querySelector('[data-search-layout-close]');

openSearchLayoutButton.addEventListener('click', () => {
  searchLayout.classList.add('opened');
})

closeSearchLayoutButton.addEventListener('click', () => {
  searchLayout.classList.remove('opened');
})
