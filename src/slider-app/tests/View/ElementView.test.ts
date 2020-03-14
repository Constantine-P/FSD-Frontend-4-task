import ElementView from '../../layers/View/ElementView';
import '@testing-library/jest-dom';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')();

describe('test ViewModel', () => {
  let element: ElementView;

  beforeEach(() => {
    document.body.innerHTML = `<html lang="ru"><body></body></html>`;
    element = new ElementView({
      container: document.querySelector('body'),
      name: 'line',
      position: 0,
      length: 1,
      side: this.side,
      size: this.size,
    });
  });

  test('test position', () => {
    expect(element.position).toBe(0);
    element.position = 0.5;
    expect(element.position).toBe(0.5);
  });

  test('test length', () => {
    expect(element.length).toBe(1);
    element.length = 0.7;
    expect(element.length).toBe(0.7);
  });

  test('test transitionOn / transitionOff', () => {
    const line = document.querySelector('.slider__line') as HTMLElement;
    expect(line.style.transitionDuration).toBe('');
    element.transitionOff();
    expect(line.style.transitionDuration).toBe('0s');
    element.transitionOn();
    expect(line.style.transitionDuration).toBe('');
  });

  test('test hide / show', () => {
    const line = document.querySelector('.slider__line') as HTMLElement;
    element.hide();
    expect(line).toHaveClass('hidden');
    expect(element.position).toBe(0);
    element.show();
    expect(line).not.toHaveClass('hidden');
  });

});
