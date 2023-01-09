import { createElement } from './util';

const aOk = createElement({
  tag: 'a',
  textContent: 'ДА',
  className: 'btn-info',
  href: 'javascript:void(0)'
});
const aCancel = createElement({
  tag: 'a',
  textContent: 'ОТКАЗ',
  className: 'btn-danger',
  href: 'javascript:void(0)'
});

const overlay = createElement({
  tag: 'div',
  className: 'overlay',
  children: [
    createElement({
      tag: 'div',
      className: 'modal',
      children: [
        createElement({ tag: 'p', className: 'modal-message' }),
        createElement({
          tag: 'div',
          className: 'actions',
          children: [
            createElement({ tag: 'div', children: [aOk] }),
            createElement({ tag: 'div', children: [aCancel] })
          ]
        })
      ]
    })
  ]
});

let onChoice;
aOk.addEventListener('click', () => onChoice(true));
aCancel.addEventListener('click', () => onChoice(false));

/**
 * @description It creates a modal dialog with a message, waits for the user to click on one of the buttons, and then returns the user's choice.
 * @param {string} message - The message to display in the modal.
 * @returns {Promise<boolean>} A promise that resolves to the user's choice.
 */
export function showModal(message) {
  document.body.appendChild(overlay);
  document.querySelector('.modal-message').textContent = message;

  return new Promise(resolve => {
    onChoice = (choice) => {
      overlay.remove();
      resolve(choice);
    };
  });
}