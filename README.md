# Range slider

[Demo](https://constantine-p.github.io/FSD-Frontend-4-task/index.html)

Простой такой jquery слайдер, ничего особенного.
  
## Clone repository
``` 
git clone https://github.com/Constantine-P/FSD-Frontend-4-task.git
```

## Run development server
``` 
npm start
```

## Building
``` 
npm run build
```  

## Testing
``` 
npm t
```  

## Application layers:

  - Model
  - View
    - ViewModel
  - Controller
  - PanelView

## Model
  
  1. Содержит, так называемые, бизнес-данные и логику работы с ними, а именно:
     - минимальное и максимальное значение слайдера;
     - минимальное и максимальное значение шкалы слайдера;
     - шаг шкалы (либо последовательность шагов);
  2. Предоставляет интерфейс для работы с данными в виде get / set методов;
  3. Наследуется от класса EventEmitter: позволяет подписываться на собственные изменения;
     
## View

  1. Отвечает за отрисовку слайдера;
  2. Предоставляет один публичный метод render(), который перерисовывает слайдер в соответствии с моделью отображения.
  3. Предоставляет публичное свойство model - экземпляр класса ViewModel;
  
### ViewModel
  1. Хранит данные о состоянии представления и логику работы с ними;
  2. Предоставляет интерфейс для работы с данными в виде get / set методов и метод updateRelRange(value: number): void, принимающий относительную координату клика (от 0 до 1) по шкале слайдера и соответственно меняющий данные представления;
  3. Наследуется от класса EventEmitter: позволяет подписываться на собственные изменения;
 
## PanelView
  1. Отвечает за работу панели управления слайдером;
  2. Предоставляет интерфейс в виде методов get / set data;
   
## Controller
  1. Подписывается на изменения Model, ViewModel и PanelView;
  2. Осуществляет взаимодействие между слоями;
  
# Usage
Простой пример:
```html
<div class='slider'></div>
```

``` js
$('.slider').rangeSlider();
```

С опциями:
```html
<div class='slider'></div>
```

``` js
$('.slider').rangeSlider({
  min: 40,
  max: 80,
  scaleMin: 0,
  scaleMax: 100,
  scaleSteps: '20',
  areTooltipsVisible: true,
  isRange: true,
  isScaleVisible: true,
  isReverseDirection: false,
  type: 'horizontal',
});
```

С подключенными панелями:
```html
<div class="slider" id="slider-1"></div>
<div class="panel" id="panel-11">
    <input type="number" class="data-input" step="any" data-js="min">
    <input type="number" class="data-input" step="any" data-js="max">
</div>
<div class="panel" id="panel-12">
    <input type="number" class="data-input" data-js="scaleMin">
    <input type="number" class="data-input" data-js="scaleMax">
    <input type="text" class="data-input" data-js="scaleSteps">
    <input type="number" class="data-input" data-js="min" step="1">
    <input type="number" class="data-input" data-js="max" step="1">
    <select class="data-input" data-js="type">
      <option value="horizontal">horizontal</option>
      <option value="vertical">vertical</option>
    </select>
    <input type="checkbox" class="data-input" data-js="areTooltipsVisible">
    <input type="checkbox" class="data-input" data-js="isScaleVisible">
    <input type="checkbox" class="data-input" data-js="isRange">
    <input type="checkbox" class="data-input" data-js="isReverseDirection">
</div>
```

``` js
$('#slider-1').rangeSlider({
  min: 40,
  max: 80,
  scaleMin: 0,
  scaleMax: 100,
  scaleSteps: '5*10 10*5',
  areTooltipsVisible: true,
  isRange: true,
  isScaleVisible: true,
  isReverseDirection: false,
  type: 'horizontal',
},
[$('#panel-11'), $('#panel-12')]);
```

## Options

| Опции | Тип | По-умолчанию | Описание |
| ------ | ------ | ------ | ------ |
| scaleMin | number | 0 | Минимум шкалы |
| scaleMax | number | 100 | Максимум шкалы |
| scaleStep | string | "10" | Шаг шкалы (либо последовательность шагов). Например: "10", "10 20 30", "3\*10 5\*20 2\*30" |
| min | number | 0 | Минимальное значение |
| max | number | 100 | Максимальное значение |
| type | string | 'horizontal' | Тип ориентации слайдера: 'vertical' или 'horizontal' |
| isRange | boolean | true | Диапазон либо единичное значение |
| isScaleVisible | boolean | true | Отображение значений шкалы |
| areTooltipsVisible | boolean | true | Отображение значений над ползунком |
| isReverseDirection | boolean | false | Обращает направление слайдера (снизу-вверх, слева-направо) |

## Methods
| Метод | Аргумент  | Описание |
| ------ | ------ | ------ |
| get / set scaleMin | number | Минимум шкалы |
| get / set scaleMax | number | Максимум шкалы |
| get / set scaleStep | string | Шаг шкалы (либо последовательность шагов). Например: "10", "10 20 30", "3\*10 5\*20 2\*30" |
| get / set min | number | Минимальное значение |
| get / set max | number | Максимальное значение |
| get / set type | string | Тип ориентации слайдера: 'vertical' или 'horizontal' |
| get / set isRange | boolean | Диапазон либо единичное значение |
| get / set isScaleVisible | true | Отображение значений шкалы |
| get / set areTooltipsVisible | true | Отображение значений над ползунком |
| get / set isReverseDirection | true | Обращает направление слайдера (снизу-вверх, слева-направо) |
| get / set range | { min: number, max: number } | Сразу min и max значения |

## UML 

![uml](UML-chart.jpg)
