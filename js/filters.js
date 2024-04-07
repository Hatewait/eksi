'use strict'

document.addEventListener("DOMContentLoaded", () => {
  /* hide filter in modal for mobiles */
  new TransferElements(
      {
        sourceElement: document.querySelector('[data-filter-container]'),
        breakpoints: {
          1280: {
            targetElement: document.querySelector('[data-insert-filter]')
          },
        }
      }
  );

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
});

