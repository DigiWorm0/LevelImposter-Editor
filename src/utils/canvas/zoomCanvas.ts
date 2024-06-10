import Point from "../../types/generic/Point";
import Konva from "konva";

const ZOOM_SPEED = 1.002;

export default function zoomCanvas(stage: Konva.Stage, delta: number, mousePos?: Point) {

    // Get Mouse Position
    const realMousePos = mousePos ?? stage.getPointerPosition();
    if (!realMousePos)
        return;

    // Calculate New Scale
    const currentScale = stage.scaleX();
    const scaleBy = Math.pow(ZOOM_SPEED, delta);
    const newScale = currentScale * scaleBy;

    // Calculate New Position
    const mousePointTo = {
        x: realMousePos.x / currentScale - stage.x() / currentScale,
        y: realMousePos.y / currentScale - stage.y() / currentScale,
    };
    const newPos = {
        x: realMousePos.x - mousePointTo.x * newScale,
        y: realMousePos.y - mousePointTo.y * newScale,
    };

    // Set New Camera Position
    stage.scale({ x: newScale, y: newScale });
    stage.position(newPos);
}