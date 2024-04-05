'use strict'

const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');
const buttonClose = document.querySelector('[data-menu-close]');
const menuLinks = document.querySelectorAll('[data-menu-link]');

menuButton.addEventListener('click', () => {
  menu.classList.add('opened');
})


menuLinks.forEach((link) => {
  link.addEventListener('click', () => menu.classList.remove('opened'));
})

document.addEventListener('click', e => {
  const target = e.target;
  if (!target.closest('[data-menu]') && !target.closest('[data-menu-button]')) {
    menu.classList.remove('opened');
  }
});


const menuLevel0 = document.querySelector('[data-level-0]');
const menuLevel1 = document.querySelector('[data-level-1]');
const menuLevel2Coll = document.querySelectorAll('[data-level-2]');
const linksLevel1 = menuLevel1?.querySelectorAll('[data-menu-id]');
const closeMenuLevel2Buttons = document.querySelectorAll('[data-close-level-2]');

closeMenuLevel2Buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const closestParent = e.currentTarget.closest('[data-level-2]');
    hideBlock(closestParent);
    openBlock(menuLevel1);
  })
})

const findMenu = (coll, id) => {
  return [...coll].find(menu => menu.getAttribute('id') === id);
}

const openBlock = (block) => block.classList.remove('d-none');
const hideBlock = (block) => block.classList.add('d-none');

linksLevel1.forEach((link, i) => {
  link.addEventListener('click', (e) => {
    const currentLink = e.currentTarget;
    const linkId = currentLink.getAttribute('data-menu-id');

    const menuLevel2 = findMenu(menuLevel2Coll, linkId);
    hideBlock(menuLevel1);
    openBlock(menuLevel2);
  })
})

const resetToMenuLevel1 = () => {
  menuLevel2Coll.forEach(menu => hideBlock(menu));
  openBlock(menuLevel1);
}

buttonClose.addEventListener('click', () => {
  menu.classList.remove('opened');
  resetToMenuLevel1();
})

