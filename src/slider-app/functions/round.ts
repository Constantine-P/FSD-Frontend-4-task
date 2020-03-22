function round(value: number, accuracy = 1, side: 'min' | 'max' | 'auto' = 'auto'): number {
  if (side === 'min') return (Math.floor(value / accuracy) * accuracy);
  if (side === 'max') return (Math.ceil(value / accuracy) * accuracy);
  return (Math.round(value / accuracy) * accuracy);
}

export default round;
