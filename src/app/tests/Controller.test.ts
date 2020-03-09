// import Controller from '../layers/Controller';
// import Model from '../layers/Model';
// import View from '../layers/View';
// import PanelView from '../layers/PanelView';
// import { SliderType } from '../types/SliderType';
// import '@testing-library/jest-dom';
//
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// require('jsdom-global')();
//
// describe('test Controller', () => {
//   const options = {
//     min: 2,
//     max: 8,
//     scaleMin: -5,
//     scaleMax: 10,
//     scaleSteps: '1',
//     areTooltipsVisible: true,
//     isRange: true,
//     isScaleVisible: true,
//     isReverseDirection: true,
//     type: 'horizontal' as SliderType,
//   };
//   let model: Model;
//   let view: View;
//   let panelView: PanelView;
//   let controller: Controller;
//
//   beforeEach(() => {
//     document.body.innerHTML = `
//     <div class="slider"></div>
//     <div class="panel">
//       <input type="number" data-js="min" value="10">
//       <input type="number" data-js="max" value="25">
//       <input type="number" data-js="scaleMin" value="0">
//       <input type="number" data-js="scaleMax" value="50">
//       <input type="text"   data-js="scaleSteps" value="6">
//       <input type="checkbox" data-js="isRange" checked>
//       <input type="checkbox" data-js="areTooltipsVisible" checked>
//       <input type="checkbox" data-js="isScaleVisible" checked>
//       <input type="checkbox" data-js="isReverseDirection" checked>
//       <select data-js="type">
//         <option>horizontal</option>
//         <option selected>vertical</option>
//       </select>
//     </div>`;
//     const slider = document.querySelector('.slider') as HTMLElement;
//     const panel = document.querySelector('.panel') as HTMLElement;
//     model = new Model(options);
//     view = new View(slider, options);
//     panelView = new PanelView(panel);
//     // controller = new Controller(model, view, [panelView]);
//   });
//
//   it('test model change', () => {
//     model.min = -2;
//     model.max = 9;
//     expect(view.model.relRange.min).toBe(0.2);
//     expect(panelView.data).toStrictEqual({
//       min: -2,
//       max: 9,
//       scaleMin: -5,
//       scaleMax: 10,
//       scaleSteps: '1',
//       areTooltipsVisible: true,
//       isRange: true,
//       isScaleVisible: true,
//       isReverseDirection: true,
//       type: 'horizontal',
//     });
//   });
//
//   it('test view change', () => {
//     view.model.updateRelRange(1);
//     view.model.updateRelRange(0.2);
//     expect(model.range.max).toBe(10);
//     expect(model.range.min).toBe(-2);
//     expect(panelView.data).toStrictEqual({
//       min: -2,
//       max: 10,
//       scaleMin: -5,
//       scaleMax: 10,
//       scaleSteps: '1',
//       areTooltipsVisible: true,
//       isRange: true,
//       isScaleVisible: true,
//       isReverseDirection: true,
//       type: 'horizontal',
//     });
//   });
//
//   it('test panelView change', () => {
//     panelView.data = {
//       scaleMin: -100,
//       scaleMax: 200,
//       scaleSteps: '5',
//       min: -20,
//       max: 25,
//       areTooltipsVisible: false,
//       isRange: true,
//       isScaleVisible: false,
//       isReverseDirection: true,
//       type: 'vertical',
//     };
//     panelView.emit('change');
//     expect(model.min).toBe(-20);
//     expect(model.max).toBe(25);
//     expect(model.scaleMin).toBe(-100);
//     expect(model.scaleMax).toBe(200);
//     expect(model.scaleSteps).toBe('5');
//     expect(view.model.isRange).toBe(true);
//     expect(view.model.areTooltipsVisible).toBe(false);
//     expect(view.model.isScaleVisible).toBe(false);
//     expect(view.model.isReverseDirection).toBe(true);
//     expect(view.model.relRange.max).toBe(125 / 300);
//     expect(view.model.relRange.min).toBe(80 / 300);
//   });
//
//   it('test model and view without panels connection', () => {
//     controller = new Controller(model, view);
//     model.min = -2;
//     model.max = 9;
//     view.model.updateRelRange(1);
//     view.model.updateRelRange(0.2);
//     expect(view.model.relRange.min).toBe(0.2);
//     expect(panelView.data).toStrictEqual({
//       min: -2,
//       max: 10,
//       scaleMin: -5,
//       scaleMax: 10,
//       scaleSteps: '1',
//       areTooltipsVisible: true,
//       isRange: true,
//       isScaleVisible: true,
//       isReverseDirection: true,
//       type: 'horizontal',
//     });
//   });
// });
