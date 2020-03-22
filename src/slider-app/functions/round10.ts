function round10(value: number, accuracy = 0, side: 'min' | 'max' | 'auto' = 'auto'): number {
  if (side === 'min') return Math.floor(value * (10 ** accuracy)) / (10 ** accuracy);
  if (side === 'max') return Math.ceil(value * (10 ** accuracy)) / (10 ** accuracy);
  return Math.round(value * (10 ** accuracy)) / (10 ** accuracy);
}

export default round10;
