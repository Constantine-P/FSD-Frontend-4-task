import LinearScaleView from '../../layers/View/LinearScaleView';
import '@testing-library/jest-dom';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')();

describe('test ViewModel', () => {
  let element: LinearScaleView;

  beforeEach(() => {
    document.body.innerHTML = '<html lang="ru"><body></body></html>';
    element = new LinearScaleView({
      container: document.querySelector('body'),
      side: 'left',
      size: 'width',
    });
  });

  test('test renderValues', () => {
    const scaleValues = element.element.querySelector('.slider__scale-values') as HTMLElement;
    expect(element.element).toContainElement(scaleValues);
    element.model = {
      scaleMin: 11,
      scaleMax: 33,
      scaleStep: 11,
    };
    element.renderValues();
    const valueElements = scaleValues.querySelectorAll('.slider__scale-value');
    expect(valueElements.length).toBe(3);
    expect(valueElements[0]).toHaveTextContent('11');
    expect(valueElements[1]).toHaveTextContent('22');
    expect(valueElements[2]).toHaveTextContent('33');
  });
});
