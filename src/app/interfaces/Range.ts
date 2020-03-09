interface Range {
  min: number | {rel: number; abs: number};
  max: number | {rel: number; abs: number};
}

export default Range;
