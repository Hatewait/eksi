'use strict'

const openSearchLayoutButton = document.querySelector('[data-open-search-layout]');
const searchLayout = document.querySelector('[data-search-layout]');
const searchLayoutResult = document.querySelector('[data-search-result]');
const closeSearchLayoutButton = document.querySelector('[data-search-layout-close]');

const inputSearch = document.querySelector("[data-search-input]");
const clearButton = document.querySelector("[data-clear-search]");

openSearchLayoutButton.addEventListener('click', () => {
  searchLayout.classList.add('opened');
})

closeSearchLayoutButton.addEventListener('click', (e) => {
  e.stopPropagation();
  searchLayout.classList.remove('opened');
})

if (inputSearch.value === "") {
  clearButton.classList.add("d-none");
}

inputSearch.addEventListener("input", (evt) => evt.target.value === ""
    ? clearButton.classList.add("d-none")
    : clearButton.classList.remove("d-none"));

const clearSearch = () => {
  inputSearch.value = "";
  clearButton.classList.add("d-none");
  //searchLayoutResult.classList.add("d-none");
}

clearButton.addEventListener('click', clearSearch)
