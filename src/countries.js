export default function selectMenuBtnAndMenu(
  menuBtnUniqueIdentifier,
  menuUniqueIdentifier,
) {
  const menuBtn = document.querySelector(menuBtnUniqueIdentifier);
  const menu = document.querySelector(menuUniqueIdentifier);

  function toggleMenu(toggleEvent) {
    function closeOnClickOutside(e) {
      if (
        e.type === 'click' &&
        e.target !== menu &&
        !menu.contains(e.target) &&
        e.target !== menuBtn
      ) {
        toggleMenu(e);
      }
    }
    if (menu.style.display === 'none') {
      toggleEvent.stopPropagation();
      menu.style.display = 'block';
      document.onclick = closeOnClickOutside;
      menu.classList.toggle('hidden');
    } else {
      toggleEvent.stopPropagation();
      menu.style.display = 'none';
      document.onclick = null;
      menuBtn.onkeydown = null;
      menuBtn.onkeyup = null;
      menu.classList.toggle('hidden');
    }
  }

  menuBtn.addEventListener('click', toggleMenu);

  Array.from(menu.children).forEach((item) => {
    item.addEventListener('click', (e) => {
      menuBtn.setAttribute('selected', item.getAttribute('name'));
      menuBtn.innerHTML = `<span class="fi fi-${item.getAttribute('name')}"></span>`;
      toggleMenu(e);
    });
  });

  // Menu button keyboard Support
  function openOnFocus() {
    function pressKey(e) {
      switch (e.key) {
        case 'ArrowDown':
          if (menu.style.display === 'none') toggleMenu(e);
          menu.firstElementChild.focus();
          break;
        case 'Enter':
          if (menu.style.display === 'none') {
            toggleMenu(e);
            menu.firstElementChild.focus();
          } else {
            toggleMenu(e);
          }
          break;
        case ' ':
          if (menu.style.display === 'none') {
            toggleMenu(e);
            menu.firstElementChild.focus();
          } else {
            toggleMenu(e);
          }
          break;
        case 'ArrowUp':
          if (menu.style.display === 'none') toggleMenu(e);
          menu.children[menu.children.length - 1].focus();
          break;
        default:
        // Do nothing
      }
    }
    menuBtn.onkeydown = (e) => {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === ' ' ||
        e.key === 'Enter'
      ) {
        e.preventDefault();
        if (!e.repeat) menuBtn.onkeyup = pressKey;
      }
    };
  }

  menuBtn.addEventListener('focus', openOnFocus);

  // When the menu button is focused, the menu is opened and the focus moves to another element that is not inside the menu, the menu closes
  menuBtn.addEventListener('blur', (e) => {
    const focusedElement = e.relatedTarget;
    if (!menu.contains(focusedElement) && menu.style.display !== 'none') {
      toggleMenu(e);
    }
  });

  // Menu keyboard support
  function navigateByKeyboard(e) {
    const firstItem = menu.firstElementChild;
    const lastItem = menu.lastElementChild;
    const items = Array.from(menu.children);
    switch (e.key) {
      case 'Enter':
        e.target.click();
        break;
      case ' ':
        e.target.click();
        break;
      case 'ArrowUp':
        if (e.target === firstItem) {
          lastItem.focus();
        } else {
          const i = items.indexOf(e.target);
          items[i - 1].focus();
        }
        break;
      case 'ArrowDown':
        if (e.target === lastItem) {
          firstItem.focus();
        } else {
          const i = items.indexOf(e.target);
          items[i + 1].focus();
        }
        break;
      case 'Home':
        firstItem.focus();
        break;
      case 'End':
        lastItem.focus();
        break;
      default:
        if (e.key.length === 1 && e.key.match(/./)) {
          for (let i = items.indexOf(e.target) + 1; i < items.length; i += 1) {
            const currentItem = items[i];
            const regExp = new RegExp(`^${e.key}`, 'i');
            if (currentItem.textContent.match(regExp)) {
              currentItem.focus();
              break;
            }
          }
        }
    }
  }

  Array.from(menu.children).forEach((item) => {
    // When the menu is focused and the focus moves to an element that is neither the menu's child element nor the menu button, the menu closes.
    item.addEventListener('blur', (e) => {
      const focusedElement = e.relatedTarget;
      if (
        !menu.contains(focusedElement) &&
        focusedElement !== menuBtn &&
        menu.style.display !== 'none'
      ) {
        toggleMenu(e);
      }
    });

    // Navigation
    item.addEventListener('keydown', navigateByKeyboard);
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && menu.style.display !== 'none') {
      toggleMenu(e);
      menuBtn.focus();
    }
  });
}
