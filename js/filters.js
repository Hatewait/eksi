import { hideSomeElementsFromList, hideToggleButton, toggleShowAndHideElements } from './main.js';

const modal = new GraphModal();
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


  const rangeSliderInit = () => { // создаем функцию инициализации слайдера
    const range = document.getElementById('range'); // Ищем слайдер
    const inputMin = document.getElementById('min'); // Ищем input с меньшим значнием
    const inputMax = document.getElementById('max'); // Ищем input с большим значнием

    if (!range || !inputMin || !inputMax) return // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок

    const inputs = [inputMin, inputMax]; // создаем массив из меньшего и большего значения

    noUiSlider.create(range, { // инициализируем слайдер
          start: [400, 30000], // устанавливаем начальные значения
          connect: true, // указываем что нужно показывать выбранный диапазон
          range: { // устанавливаем минимальное и максимальное значения
            'min': 0,
            'max': 100000
          },
          step: 1, // шаг изменения значений
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

  }

  const init = () => {
    rangeSliderInit() // запускаем функцию инициализации слайдера
  }

  window.addEventListener('DOMContentLoaded', init) // запускаем функцию init, когда документ будет загружен и готов к взаимодействию
});

