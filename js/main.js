'use strict'

// modals init
const modal = new GraphModal();

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


