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
const closeMenuLevel1Button = document.querySelector('[data-close-level-1]');
const mobileButtonOpenMenu = menuLevel0?.querySelector('[data-open-menu-mobile]');
const desktopWidthMediaQuery = window.matchMedia('(min-width: 728px)');

const openBlock = (block) => block.classList.remove('d-none');
const hideBlock = (block) => block.classList.add('d-none');

const resetToMenuLevel1 = () => {
  menuLevel2Coll.forEach(menu => hideBlock(menu));
  openBlock(menuLevel1);
  hideBlock(menuLevel0);
}

const resetToMenuLevel0 = () => {
  menuLevel2Coll.forEach(menu => hideBlock(menu));
  hideBlock(menuLevel1);
  openBlock(menuLevel0);
}

const handleMenuChange = (e) => {
  if (e.matches) {
    hideBlock(menuLevel0);
    openBlock(menuLevel1);
    menuLevel2Coll.forEach((menu) => {
      hideBlock(menu);
    });
    buttonClose.addEventListener('click', () => {
      menu.classList.remove('opened');
      resetToMenuLevel1();
    })
  } else {
    hideBlock(menuLevel1);
    menuLevel2Coll.forEach(menu => hideBlock(menu));
    openBlock(menuLevel0);

    mobileButtonOpenMenu.addEventListener('click', () => {
      openBlock(menuLevel1);
      hideBlock(menuLevel0);
    });

    closeMenuLevel1Button.addEventListener('click', (e) => {
      const closestParent = e.currentTarget.closest('[data-level-1]');
      hideBlock(closestParent);
      openBlock(menuLevel0);
    });

    buttonClose.addEventListener('click', () => {
      menu.classList.remove('opened');
      resetToMenuLevel0();
    })
  }
}
desktopWidthMediaQuery.addEventListener('change', handleMenuChange)
handleMenuChange(desktopWidthMediaQuery)

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

linksLevel1.forEach((link, i) => {
  link.addEventListener('click', (e) => {
    const currentLink = e.currentTarget;
    const linkId = currentLink.getAttribute('data-menu-id');

    const menuLevel2 = findMenu(menuLevel2Coll, linkId);
    hideBlock(menuLevel1);
    openBlock(menuLevel2);
  })
})




