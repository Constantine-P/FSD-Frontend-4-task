import Position from '../interfaces/Position';

function getClickCoordsRelativeToBlock(event: MouseEvent, base: HTMLElement): Position {
  const baseBox = base.getBoundingClientRect();
  return {
    // left: event.clientX - baseBox.left,
    // right: -event.clientX + baseBox.right,
    // top: event.clientY - baseBox.top,
    // bottom: -event.clientY + baseBox.bottom,
    left: (event.clientX - baseBox.left) / baseBox.width,
    right: (-event.clientX + baseBox.right) / baseBox.width,
    top: (event.clientY - baseBox.top) / baseBox.height,
    bottom: (-event.clientY + baseBox.bottom) / baseBox.height,
  };
}

export default getClickCoordsRelativeToBlock;
