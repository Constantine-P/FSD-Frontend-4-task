import round from './round';
import round10 from './round10';

interface IOptions {
  base: number;
  baseStep: number;
  size: number;
}

function getPositions(options: IOptions): number[] {
  const { base = 1, baseStep = 0.1 } = options;

  const size = round(options.size, baseStep, 'max');
  const number = Math.min(Math.floor(base / size), Math.round(base / baseStep));
  const freeSpace = base - size * number;
  const freeBaseSteps = round(freeSpace / baseStep);
  const inBetweenStepsNumber = Math.floor(freeBaseSteps / number);
  const inBetweenSpace = inBetweenStepsNumber * baseStep;
  const step = round10(round(size + inBetweenSpace, baseStep), 8, 'min');
  const positions = [];

  for (let i = 0; i <= base / step; i += 1) {
    if (i + 1 > base / step) {
      positions.push(base);
    } else {
      positions.push(i * step);
    }
  }
  return positions;
}

export default getPositions;
