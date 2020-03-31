import RangeLineView from '../../layers/View/RangeLineView';
import '@testing-library/jest-dom';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')();

describe('test ViewModel', () => {
  let element: RangeLineView;

  beforeEach(() => {
    document.body.innerHTML = '<html lang="ru"><body></body></html>';
    element = new RangeLineView({
      container: document.querySelector('body'),
      name: 'line',
      position: 0,
      side: 'left',
      size: 'width',
      length: 1,
    });
  });

  test('test length', () => {
    expect(element.length).toBe(1);
    element.length = 0.7;
    expect(element.length).toBe(0.7);
  });
});
