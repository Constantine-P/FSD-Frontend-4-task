import camelToKebab from './camelToKebab';

function createElement(name): HTMLDivElement {
  const element = document.createElement('div');
  element.classList.add(`slider__${camelToKebab(name)}`);
  return element;
}

export default createElement;
