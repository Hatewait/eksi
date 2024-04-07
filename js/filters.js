import { hideSomeElementsFromList, hideToggleButton, toggleShowAndHideElements } from './main.js';

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

