import './style.css';
import 'flag-icons/css/flag-icons.min.css';
import selectMenuBtnAndMenu from './countries';

selectMenuBtnAndMenu('.select-country', '.country-list');

const form = document.querySelector('form');
const emailError = document
  .querySelector('label[for="email"]')
  .querySelector('.error');
const email = document.querySelector('#email');
const postalError = document
  .querySelector('label[for="postal"]')
  .querySelector('.error');
const postal = document.querySelector('#postal');
const pwdError = document
  .querySelector('label[for="password"]')
  .querySelector('.error');
const pwd = document.querySelector('#password');
const confirmError = document
  .querySelector('label[for="confirm-pwd"]')
  .querySelector('.error');
const confirmPwd = document.querySelector('#confirm-pwd');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fields = [email, postal, pwd, confirmPwd];
  fields.forEach((field) => {
    const fieldLabel = document.querySelector(`label[for="${field.id}"]`);
    const fieldError = fieldLabel.querySelector('.error');
    if (field.validity.valueMissing) {
      fieldError.textContent = '(required)';
    }
  });
  if (!confirmPwd.validity.valueMissing && confirmPwd.value !== pwd.value) {
    confirmError.textContent = '(passwords differ)';
    confirmPwd.setCustomValidity('Should match the provided password.');
  }
  for (let i = 0; i < fields.length; i += 1) {
    if (!fields[i].checkValidity()) {
      fields[i].focus();
      break;
    }
  }
});

email.addEventListener('input', () => {
  if (email.validity.patternMismatch) {
    emailError.textContent = '(invalid email address)';
  } else {
    emailError.textContent = '';
  }
});

postal.addEventListener('input', () => {
  if (postal.validity.patternMismatch) {
    postalError.textContent = '(invalid postcode)';
  } else {
    postalError.textContent = '';
  }
});

pwd.addEventListener('input', () => {
  if (pwd.validity.patternMismatch) {
    pwdError.textContent = '(too simple)';
  } else if (pwd.validity.tooShort) {
    pwdError.textContent = '(too short)';
  } else if (pwd.validity.tooLong) {
    pwdError.textContent = '(too long)';
  } else {
    pwdError.textContent = '';
    pwd.setCustomValidity('');
  }
});

confirmPwd.addEventListener('input', () => {
  if (confirmPwd.value !== pwd.value) {
    confirmError.textContent = '(passwords differ)';
    confirmPwd.setCustomValidity('Should match the provided password.');
  } else {
    confirmError.textContent = '';
    confirmPwd.setCustomValidity('');
  }
});
