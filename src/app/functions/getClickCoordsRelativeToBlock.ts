import IPosition from "../interfaces/IPosition";

export default function getClickCoordsRelativeToBlock(event: MouseEvent, base: HTMLElement): IPosition {
    const baseBox = base.getBoundingClientRect();
    return {
        left:    event.clientX - baseBox.left,
        right:  -event.clientX + baseBox.right,
        top:     event.clientY - baseBox.top,
        bottom: -event.clientY + baseBox.bottom,
    };
}