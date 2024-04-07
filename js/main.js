export const hideElement = (el) => el.classList.add('d-none');
export const showElement = (el) => el.classList.remove('d-none');
export const toggleElement = (el) => el.classList.toggle('d-none');


const modal = new GraphModal();

export const hideToggleButton = (elements, amount, button) => {
  if (elements.length <= amount) {
    hideElement(button);
  }
}

export const hideSomeElementsFromList = (elements, amount) => {
  if (elements.length > amount) {
    for (let i = amount; i < elements.length; i++) {
      hideElement(elements[i]);
    }
  }

}

export const toggleShowAndHideElements = (container, maxElementsAmount, toggleButton, elements) => {
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

//smooth-scroll
/*const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 100,
});*/

/* initialising accordions */
const accordionOne = document.querySelector('#accordion-1');
const accordionTwo = document.querySelector('#accordion-2');
const accordionThree = document.querySelector('#accordion-3')

if(accordionOne) {
  new ItcAccordion('#accordion-1');
}
if(accordionTwo ) {
  new ItcAccordion('#accordion-2');
}
if(accordionThree ) {
  new ItcAccordion('#accordion-3');
}
