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
