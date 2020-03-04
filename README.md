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

![uml](https://www.draw.io/?lightbox=1&target=blank&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#R7V1bc5u6Fv41nmkfzCDE9bG5dO%2F0JLs9SdrTnpcOsXHMKQYXk%2BuvPxIIEJLAsg3YbvBkWiMkLZn1aUnrW5IYwdPF81%2Bxu5xfRVMvGGnq9HkEz0aapluWjv7DKS9ZCtR0J0u5j%2F1plgbKhBv%2F1SOJKkl98KfeqpIxiaIg8ZfVxEkUht4kqaS5cRw9VbPNoqAqdenee1zCzcQN%2BNT%2F%2BNNknqXamlWm%2F%2B359%2FNcMjDJ71u4eWbyS1Zzdxo9UUnwfARP4yhKsm%2BL51MvwE8vfy5ZuY81d4uGxV6YyBT4%2FLqwfn4fe6uXj8Zs5f7z%2FXJ5PoZZLY9u8EB%2BMNFh2uLkJX8Mqyd%2FEbghujqZRWFyQ%2B4AdO0G%2Fn2Ivk9QO7wYJTx6ceKjJ%2FiB3EiiJUqdzP1geum%2BRA%2B4tavEnfzKr07mUey%2FomrdgNSJbscJAYNmVnLc4JIoWUWpsbdCeb7kjwAwSVfucyXjpbtKSMIkCgJ3ufLvip%2BxcON7PzyJkiRakEwzPwhOoyCK02cAp4ZnT%2FW0dXH0y6Pu2NodNHEzeZ0QNeFn4j1TSURHf3nRwkviF5SF3B1DVVUAgRfpNWMDEhA9lRgsusicwp9hkkSX4P6%2BEFBCA30h6NgAKTqHlDG6%2FLnwkYo%2FoG%2Fhw%2BIOqR9pS4PPH9CzyG5jFdTfXuGOdtVcRZansR5%2Fde2GuB%2FjHHfIPHhuSGXZ%2BivTCZAGE079YZT1CgorJCnvGIE3S2q7xWrpTvzw%2FjLNc6aXKddEqTgpQmVnQWo85v506oUY0lHiJm6GXwzWZeSHSap04wT9IRicqooxMlDDT9E1KK%2FRH84eJ6dRiH6L66dY9VDnePJwBxGguNF2rIc2gTF%2BtDIgtvWOMGxwGOZ0HPip7jId5xYfbKXgBVJV4JUavcUKPxsDTuuQ1zoUaDhw77zgS7TyEz%2FC9cdZXkbz%2B1IuAJImyt5duedfZ%2BCfxeeLxey%2F%2F%2FK%2BPr2eame%2Fx7ZAuebvBzy8InOPH8bDJIniMrGt%2Fl078LEAeBOdHABbDge5NWgdCBYHBEr976Il7j6rbKy4CdDsMv6cJb0fDH7bWND1PWPBbDAKPu62M3fiDSahYxhYkkNDGzAQNlkEgxPsXXoJdtX88N37mulllm9V5CNVlHnf100eqfrdZ7n6Ub5t6s9n0VJCiszbS5L8OUXmrSXdJN5ylctCkEXdo0lWlp2SlhWRkDZFXSqXcxu7IZpjnaGkGmFpbkoMVUJCVoxdlVxY5reIxWQZKTlpZhkJXnDNCfmW1lMjKS%2FACksLyWorF5exJy24X3%2Fy1zc60%2BCYns7GHEfS2YRmC96mcO7hcIMOeipIwUGATeZAsO2LYLNyRraJXYO6ACtAb4FdE2IF8E4LJrYWKRmbWlXCy1Z4r0ffe8rufsPfqjeXCE0B8XO%2B4O9pnowiGIxS87y3sT%2FvwncJYWV0ZYEA4FA1EF5tadeWNBpd8V2Aj90MhNc%2BcMDzXUIcdMZxAD40QxNe%2FBhyKhg6TqkR46Nw0BjosbaRAwBPj%2FUMHZ40xwofYsB7nqICIDVH1QRYMduIAIvBwjs0aYA2LmOvQqYhy0QohnX5VtnSi9wwsVxCmid5WXo0f3%2BLr5k8a0LCaR6koluyluSbT3DQkN1fpa2Ry3rtIXWvvDM%2F9ibZ9EUiNj3Y1yb7WhirnSbgoj4DYFcz8FzaMAPvQr%2FAlDSKXc3Bc20Oc%2FA993RgCmbhIiR0NpXSeHdsCDvvCw2OYGLdLxp4n2wIPO9hAqBJDhDdAUG05qwpGNgYp2svSCeaXHMBVVpUUeAgA5DYJSjijyKngJaWZqYklQUkJBHHIhcmmtGXkvLMlDBSQEIS757ICRWU20p%2B1d%2BR%2FcGVMlvKZZ0n6YfNlttKfj%2BLAR6WqKR3LQB%2BvkYivXiMkHkZgsxtB5nbGl90SQ9TBy14mK%2B%2FPi3O%2FC9X305eQttdXkzBLBrzIZ6M0B3Iu72RdwVXtzF5p6ktkHdCmPCOaka3pUNfZmr%2Bvr26PA%2B8Bf7pDJ%2FlZckV9%2BU8TyvzUqGGehqZWKGjtS48RBr7ZetkVRvRYmGLRfHEgapqR7miYHFHRJWwwSIvZCue6k9zNFtSb4%2Fsk7DF%2FAJnmnyqtfI46tvITK2dTA5mXCaoK8IC7Gqo55eSbUU9DT1ddktLv11dtM%2FtJOVQQtR139XSyUfbUyXcuZZ0K9in0l3X%2FXT1e%2B4sfqrex4v%2FOU%2Bf9eX1QrBkmNMm0vIHfK4BuoqW6aNHKR99LCd98PNkkT8nb3rv5Y4eer7z6D4K3eC8TJXDRK1PtIoe4glpVuOKAeQMYmqlISOxWbjFcj5Wlj%2F2AjfxH71Ks0RaITV9waikqrEtxlMD7Grw7DeScqV2%2BapM1umDrC%2BXPQWuKqRN94XKRnpOfaMtnZGkm2pz29aVQF%2ByVpTILZ759mDOV9s3oTn16ymzQaF3DTbviKOfTfxP3Mmv%2Bzh6CKeUVz9LPznjkZERQBUbkIbeSI4WIa0cFTGFTSiBDeG6kxERrvo1A%2FwQp%2F4j%2BnqPv%2F4TJf7sJb%2BBBFH36oYQgXbWzw5YFfMOmYQGN9MYp5k6JdZrTFV0W2VO4WjH6ACHO95DU1StWk00m6X0MgOFFnqlxrsKhzzG9D0iWJqq5B2osJaaoziOXXycLYcIW9247rbGDKFoWKR1Og5oIofkmMaBvMsc20Cg8a7C1zTqdLT2vTBeh2zgi2lvD8b8uByGvo05tLBxpT46YwENfN8sP9aWll1zdhPUlpmHYE07TFWBGnW%2F%2BWftVF03gwk8dqdCO1KvAr5dr0I7UrcCKCrsaySC2jASNRlmPP%2Bm7H%2B%2BbqTqBrQwEkF7N0GtjUS4HUAtPww2sfOh69R9o4exQyLCfdBjR97J9jB21Boduz8Tw6%2BpPnJ3pjCahzywIHdGUU2qp%2FbHVUF%2B2UK5KZlV%2BrDCbX8nqECgKXnkZO0hKk5X0TPIU5t49Vp18VoKIMHaNea4lcpCiGFRrbxJM6TRtOEpKW3s0RQ3WYKffIsL39pRr2iLZkfHpIhbPJwLfBj9XLRDs6vDLsRN5slSepFcevqJYI2cOmzQbB0Lov2ZvWJBF9GIw%2F7MvnFQHHOyPyCIaM1u9oK9USMis3yvJTSJdmOJ0KR3NZXUD5IFRc85fvmOq1csI7%2F%2BQcSlF2fPlauX%2FOrZT0g53SHXuBwmlnVyXRbFF3TJL17so8eKzd2ZmOTaExlrQMyBWkDXbAP%2FS%2BYFFWcWlrdtxvZIc7GGjvqISSpB%2F0JGju0oFjPtbYt%2BxaIBE62DhprLa2zy%2BnLd0LP6sdOzee8%2FttCezhOrRx%2FaSwe0zCEeO1vo8LApWWSgzEpg3mDE2Ipauc%2BYme4oW13kbg8j4KGNgDg6p5cfJkgIHVVRVVB%2Bth0ALUcxuLWN9DhrWZ0vfcSNYHohtFTF7mGxis4zDkc2otnHOaIZQveeHdHy6OEfPqLVnWpxUCOaqkCjMmKZ1SENOAq06SBkb2Fng2cIsuAQB5EhAtnfGRuqw4QgARAcsmEYIu%2Ff7ioAafDu%2F65vcZiUrwxJs9CvEJF%2F3cMbpZ4kLaQhj7%2F6mKUQalZXRJMxHNbRoXqBKmlKugpaGkKPfAha7gEJfNRSiITOAhQGvwZqu6M9LpglLYI3PtAVkJFDHVmn1TtvN5LRHcogHw%2FtGWWiXaFDPLR3IAhWy%2FQMBNFiqJozZC82OkD2Qvr0WPp81YuN3pB5IfuKzD%2FxvFg%2FP%2B6VnP4qK5IptZvsGxogkpJvWKgc%2Blmxw2rQbYP6W5hEW9LXKhYVtW8TN4tpTH13EYXT27nPhzbQVc7Y6FU2sYw0GKMyzlCEFcQxhiKsMaJjGkoR4qiJatQyMPSJPk1nKtEH%2BjQOI2sDG5RWi8Fv5w0LxdE73AGsG4cwBHV1GLYHkD2QyHIsBr9dxCl6xbeqAhrhimVacigHm6F8owjcVmdZNR3FuB%2FkA4PBj65uG7xzWCgWr09eg%2FrWiPfNDjfYh9lVDL0STgYK3h21Bpb4ShqXh21pDXwAgMktM9jd7Noma3XZXUOthYfrJNWfpsaGHpgS3djovJmH2xs2NM9HCvnCCu4McoiHQmpXpcZEVotQa9uQ535C25OMk3%2F%2F%2BL26W74%2B3v0AV%2B7lz08%2FP%2FwSvKjg%2FBGp%2FnzhJ8kQTN0tmCqI7XMdqz6Yym3n1HkWSrwqv42DUIVg0TiwZO8heCw3co6sk5F1xr6pYOKGGFHD6zbXsZdrIFPfhTcJina2%2Bl7YvCEm2p1yRUcjd7SNU9i6ISB6EH3c6nETp7B5zdHQtx6bbF%2FhQO1xq6awfUNk8hBgIHqDVa8wqItLRuE775HM99AjQY8%2FW9oQ%2BKvEC%2FOlEamrcUmS3nNBIQ9NGcXVoDk6Xh8hKBJiDabeC8r8js8w9Vdsjjdqm2qCRR2g1JCcgraxLk%2FYPj5SdP6MMDddccqnuJq7IMIOJsXLAJMjbQQszRgTCJAmahTVsZvJmlpOnCFTNnIgVUWz8r0OXXAu%2BFBuB7LnjOZaxywsvTQcMHNQadLRwqe4atXCNZxLWbjVBehCTPE0eIeYUhXdsaqQyhjtjSBFM%2BQsP17QhJvz4%2BsxWg3kNPFQa1lGfc%2BgNwxVgbWgH2vbUuu43twzLhbPs7UdAOwFrw8ZbGk7Z2Ize3g0JBJa0LQMXYf4jUemNwZwS3jhk07VJgOtab3aWHQZR9gzKLPH7nKebcSA5%2F8H)
