// import View from '../layers/View/View';
// import { SliderType } from '../types/SliderType';
// import '@testing-library/jest-dom';
//
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// require('jsdom-global')();
//
// describe('test View', () => {
//   const options = {
//     min: 2,
//     max: 8,
//     scaleMin: -10,
//     scaleMax: 10,
//     scaleSteps: '1',
//     type: 'horizontal' as SliderType,
//     isRange: true,
//     areTooltipsVisible: true,
//     isScaleVisible: true,
//     isReverseDirection: false,
//   };
//
//   describe('test default state', () => {
//     document.body.innerHTML = '<div class="slider"></div>';
//     const slider = document.querySelector('.slider') as HTMLElement;
//     const view = new View(slider, options);
//     // view.update();
//
//     describe('test existence of elements', () => {
//       it('scale-line in doc', () => {
//         expect(slider.querySelector('.scale-line')).not.toBeNull();
//       });
//
//       it('range-line in doc', () => {
//         expect(slider.querySelector('.range-line')).not.toBeNull();
//       });
//
//       it('min-handle in doc', () => {
//         expect(slider.querySelector('.min-handle')).not.toBeNull();
//       });
//
//       it('max-handle in doc', () => {
//         expect(slider.querySelector('.max-handle')).not.toBeNull();
//       });
//
//       it('min-value-tooltip in doc', () => {
//         expect(slider.querySelector('.min-tooltip')).not.toBeNull();
//       });
//
//       it('max-value-tooltip in doc', () => {
//         expect(slider.querySelector('.max-tooltip')).not.toBeNull();
//       });
//
//       it('scale-values in doc', () => {
//         expect(slider.querySelector('.scale-values')).not.toBeNull();
//       });
//
//       it('slider-inner in doc', () => {
//         expect(slider.querySelector('.slider-inner')).not.toBeNull();
//       });
//     });
//
//     describe('test visibility of elements', () => {
//       it('scale-line is visible', () => {
//         expect(slider.querySelector('.scale-line')).not.toHaveClass('hidden');
//       });
//
//       it('range-line is visible', () => {
//         expect(slider.querySelector('.range-line')).not.toHaveClass('hidden');
//       });
//
//       it('min-handle is visible', () => {
//         expect(slider.querySelector('.min-handle')).not.toHaveClass('hidden');
//       });
//
//       it('max-handle is visible', () => {
//         expect(slider.querySelector('.max-handle')).not.toHaveClass('hidden');
//       });
//
//       it('min-value-tooltip is visible', () => {
//         expect(slider.querySelector('.min-tooltip')).not.toHaveClass('hidden');
//       });
//
//       it('max-value-tooltip is visible', () => {
//         expect(slider.querySelector('.max-tooltip')).not.toHaveClass('hidden');
//       });
//
//       it('scale-values is visible', () => {
//         expect(slider.querySelector('.scale-values')).not.toHaveClass('hidden');
//       });
//
//       it('slider-inner is visible', () => {
//         expect(slider.querySelector('.slider-inner')).not.toHaveClass('hidden');
//       });
//     });
//
//     describe('test value-tooltips text', () => {
//       it('minValue', () => {
//         expect(slider.querySelector('.min-tooltip')).toHaveTextContent('2');
//       });
//
//       it('maxValue', () => {
//         expect(slider.querySelector('.max-tooltip')).toHaveTextContent('8');
//       });
//     });
//   });
//
//   describe('test get model', () => {
//     document.body.innerHTML = '<div class="slider"></div>';
//     const slider = document.querySelector('.slider') as HTMLElement;
//     const view = new View(slider, options);
//     view.update();
//
//     it('test get model', () => {
//       expect(view.model).toBeDefined();
//     });
//   });
//
//   describe('test render()', () => {
//     document.body.innerHTML = '<div class="slider"></div>';
//     const slider = document.querySelector('.slider') as HTMLElement;
//     const view = new View(slider, options);
//     view.model.areTooltipsVisible = false;
//     view.model.isScaleVisible = false;
//     view.model.isRange = true;
//     view.model.type = 'vertical';
//     view.model.updateRelRange(0.2);
//     view.model.updateRelRange(0.9);
//     view.render();
//
//     it('scale-line is visible', () => {
//       expect(slider.querySelector('.scale-line')).not.toHaveClass('hidden');
//     });
//
//     it('range-line is visible', () => {
//       expect(slider.querySelector('.range-line')).not.toHaveClass('hidden');
//     });
//
//     it('min-handle is visible', () => {
//       expect(slider.querySelector('.min-handle')).not.toHaveClass('hidden');
//     });
//
//     it('max-handle is visible', () => {
//       expect(slider.querySelector('.max-handle')).not.toHaveClass('hidden');
//     });
//
//     it('min-value-tooltip is visible', () => {
//       expect(slider.querySelector('.min-tooltip')).toHaveClass('hidden');
//     });
//
//     it('max-value-tooltip is visible', () => {
//       expect(slider.querySelector('.max-tooltip')).toHaveClass('hidden');
//     });
//
//     it('scale-values is visible', () => {
//       expect(slider.querySelector('.scale-values')).toHaveClass('hidden');
//     });
//
//     it('slider-inner is visible', () => {
//       expect(slider.querySelector('.slider-inner')).not.toHaveClass('hidden');
//     });
//
//     it('test handles positions ', () => {
//       expect((slider.querySelector('.min-handle') as HTMLElement).style.bottom).toBe('20%');
//       expect((slider.querySelector('.max-handle') as HTMLElement).style.bottom).toBe('90%');
//     });
//   });
// });
