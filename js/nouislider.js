'use strict';

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
