import { createElement } from './util';

const section = createElement({
  tag: 'section',
  id: 'notifications',
  children: [
    createElement({
      tag: 'div',
      className: 'notification',
      children: [createElement({ tag: 'span', className: 'notification-span' })]
    })
  ]
});

document.body.appendChild(section);

export function showNotify(message, type = 'errorBox') {
  const span = document.querySelector('.notification-span');
  const div = document.querySelector('.notification');

  span.textContent = message;
  div.id = type;
  div.style.display = 'block';
  div.style.opacity = 1;


  setTimeout(() => {
    const fadeEffect = setInterval(() => {
      if (div.style.opacity > 0) return div.style.opacity -= 0.05;

      clearInterval(fadeEffect);
      div.style.display = 'none';
    }, 30);
  }, 3000);
}