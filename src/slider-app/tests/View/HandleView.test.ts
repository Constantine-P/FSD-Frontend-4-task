import HandleView from '../../layers/View/HandleView';
import '@testing-library/jest-dom';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')();

describe('test ViewModel', () => {
  let element: HandleView;

  beforeEach(() => {
    document.body.innerHTML = '<html lang="ru"><body></body></html>';
    element = new HandleView({
      container: document.querySelector('body'),
      name: 'handle',
      position: 0,
      side: 'left',
      size: 'width',
    });
  });

  test('test set tooltipValue', () => {
    const handle: HTMLElement = document.querySelector('.slider__handle');
    element.tooltipValue = 123;
    expect(handle).toHaveTextContent('123');
  });

  test('test hideTooltip / showTooltip', () => {
    const tooltip: HTMLElement = document.querySelector('.slider__tooltip');
    element.hideTooltip();
    expect(tooltip).toHaveClass('slider__tooltip_hidden');
    element.showTooltip();
    expect(tooltip).not.toHaveClass('slider__tooltip_hidden');
  });

  test('test set tooltipTranslateValue', () => {
    const tooltip: HTMLElement = document.querySelector('.slider__tooltip');
    element.tooltipTranslateValue = 0.25;
    expect(tooltip.style.transform).toBe('translateX(-25%)');
    element.tooltipTranslateValue = -0.25;
    expect(tooltip.style.transform).toBe('translateX(-75%)');
    element.tooltipTranslateValue = 0;
    expect(tooltip.style.transform).toBe('translateX(-50%)');
    element.tooltipTranslateValue = 1;
    expect(tooltip.style.transform).toBe('translateX(50%)');
  });
});
