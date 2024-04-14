'use strict'

/* dropdown */
const dropdowns = document.querySelectorAll('[data-dropdown]');
const listOfOptions = document.querySelectorAll('[data-sort-option]');
const body = document.body;

const toggleDropdown = (e, dropdown) => {
  e.stopPropagation();
  dropdown.classList.toggle('opened');
};

const selectOption = (e, input) => {
  input.value = e.currentTarget.textContent.trim();
};

const closeDropdownFromOutside = (dropdown) => {
  if (dropdown.classList.contains('opened')) {
    dropdown.classList.remove('opened');
  }
};

if (listOfOptions) {
  listOfOptions.forEach((option) => {
    const currentSortBlock = option.closest('[data-sort-block]');
    const currentInput = currentSortBlock.querySelector('[data-sort-input]');
    option.addEventListener('click', (e) => selectOption(e, currentInput));
  });
}

if (dropdowns) {
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', (e)  => toggleDropdown(e, dropdown));
    body.addEventListener('click', () => closeDropdownFromOutside(dropdown));
  })
}

/* switch templates in categories */
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


/* filters */

/* hide filter in modal for mobiles */
const filterContainer = document.querySelector('[data-filter-container]');
if (filterContainer) {
  new TransferElements(
      {
        sourceElement: filterContainer,
        breakpoints: {
          1280: {
            targetElement: document.querySelector('[data-insert-filter]')
          },
        }
      }
  );
}


/* initialising accordions */
const accordionOne = document.querySelector('#accordion-1');
const accordionTwo = document.querySelector('#accordion-2');
const accordionThree = document.querySelector('#accordion-3')

if (accordionOne) {
  new ItcAccordion('#accordion-1');
}
if (accordionTwo) {
  new ItcAccordion('#accordion-2');
}
if (accordionThree) {
  new ItcAccordion('#accordion-3');
}

/* show more inputs */
const hideElement = (el) => el.classList.add('d-none');
const toggleElement = (el) => el.classList.toggle('d-none');

const hideToggleButton = (elements, amount, button) => {
  if (elements.length <= amount) {
    hideElement(button);
  }
}

const hideSomeElementsFromList = (elements, amount) => {
  if (elements.length > amount) {
    for (let i = amount; i < elements.length; i++) {
      hideElement(elements[i]);
    }
  }

}

const toggleShowAndHideElements = (container, maxElementsAmount, toggleButton, elements) => {
  toggleButton.textContent = toggleButton.getAttribute('data-closed');
  container.classList.toggle('opened');
  if (container.classList.contains('opened')) {
    toggleButton.textContent = toggleButton.getAttribute('data-opened');
  } else {
    toggleButton.textContent = toggleButton.getAttribute('data-closed');
  }
  elements.forEach((element, i) => {
    if (i >= maxElementsAmount) {
      toggleElement(element);
    }
  })
}

const inputsGroupContainer = document.querySelectorAll('[data-items-group]');
const MAX_INPUTS_AMOUNT = 5;

if (inputsGroupContainer) {
  inputsGroupContainer.forEach((container) => {
    const inputs = container.querySelectorAll('[data-filter-item]');
    const toggleButton = container.querySelector('[data-res-toggle]');

    hideToggleButton(inputs, MAX_INPUTS_AMOUNT, toggleButton);
    hideSomeElementsFromList(inputs, MAX_INPUTS_AMOUNT);

    toggleButton.addEventListener('click', (e) => {
      e.preventDefault();
      toggleShowAndHideElements(container, MAX_INPUTS_AMOUNT, toggleButton, inputs);
    })
  })
}

/* nouislider */

const rangeSliderInit = () => {
  const range = document.getElementById('range');
  const inputMin = document.getElementById('min');
  const inputMax = document.getElementById('max');

  if (!range || !inputMin || !inputMax) return;

  const inputs = [inputMin, inputMax];

  noUiSlider.create(range, {
        start: [400, 30000],
        connect: true,
        range: {
          'min': 0,
          'max': 100000
        },
        step: 1,
      }
  )

  range.noUiSlider.on('update', function (values, handle) { // при изменений положения элементов управления слайдера изменяем соответствующие значения
    inputs[handle].value = parseInt(values[handle]);
  });

  inputMin.addEventListener('change', function () { // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([this.value, null]);
  });

  inputMax.addEventListener('change', function () { // при изменении большего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([null, this.value]);
  });

  range.noUiSlider.on('start', function () {
    this.target.classList.add('active');
  });

  range.noUiSlider.on('end', function () {
    this.target.classList.remove('active');
  })
}

const init = () => {
  rangeSliderInit()
}

window.addEventListener('DOMContentLoaded', init);
