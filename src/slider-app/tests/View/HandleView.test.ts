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
      length: 1,
      side: 'left',
      size: 'width',
    });
  });

  test('test set tooltipValue', () => {
    const handle = document.querySelector('.slider__handle') as HTMLElement;
    element.tooltipValue = 123;
    expect(handle).toHaveTextContent('123');
  });

  test('test hideTooltip / showTooltip', () => {
    const tooltip = document.querySelector('.slider__tooltip') as HTMLElement;
    element.hideTooltip();
    expect(tooltip).toHaveClass('hidden');
    element.showTooltip();
    expect(tooltip).not.toHaveClass('hidden');
  });

  test('test set tooltipTranslateValue', () => {
    const tooltip = document.querySelector('.slider__tooltip') as HTMLElement;
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
