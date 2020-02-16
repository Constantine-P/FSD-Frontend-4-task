import "../app/styles/styles.styl";
import "../app/SliderJQ";

const slider1 = $("#slider-1").rangeSlider({
    range: {
      min: -10,
      max: 10,
    },
    scale: {
      min: -20,
      max: 20,
      steps: "5"
    },
    isVisibleTooltip: true,
    isRange: true,
    isVisibleScale: true,
    isReverseDirection: false,
    type: "horizontal",
  },
  [$("#panel-11"), $("#panel-12")]
);

const slider2 = $("#slider-2").rangeSlider({
    range: {
      min: -10,
      max: 10,
    },
    scale: {
      min: -20,
      max: 20,
      steps: "5"
    },
    isVisibleTooltip: true,
    isRange: false,
    isVisibleScale: true,
    isReverseDirection: false,
    type: "vertical",
  },
  [$("#panel-21"), $("#panel-22")]
);

console.log($(".slider").get());
