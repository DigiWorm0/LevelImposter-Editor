import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import React from 'react';
import { Layer, Stage } from 'react-konva';
import CanvasGrid from '../components/canvas/CanvasGrid';
import MapElement from '../components/canvas/MapElement';
import SelectedMapElement from '../components/canvas/SelectedMapElement';
import useMouse from '../hooks/input/useMouse';
import useMousePos from '../hooks/input/useMousePos';
import useCamera from '../hooks/useCamera';
import { useElements } from '../hooks/useElement';
import useMap from '../hooks/useMap';

export default function Canvas() {
    const [map] = useMap();
    const [canvasWidth, setCanvasWidth] = React.useState(window.innerWidth - 500);
    const [canvasHeight, setCanvasHeight] = React.useState(window.innerHeight - 50);
    const camera = useCamera(canvasWidth, canvasHeight);
    const [, , setMousePos] = useMousePos();
    const [leftMouse] = useMouse();

    const onWindowResize = () => {
        setCanvasWidth(window.innerWidth - 500);
        setCanvasHeight(window.innerHeight - 50);
    }

    React.useEffect(() => {
        window.addEventListener('resize', onWindowResize);
        return () => {
            window.removeEventListener('resize', onWindowResize);
        }
    }, []);

    Konva.dragButtons = [0, 1, 2];
    Konva.hitOnDragEnabled = true;

    return (
        <div className="canvas">
            <Stage
                x={camera.x}
                y={camera.y}
                width={camera.width}
                height={camera.height}
                draggable={!leftMouse}
                onDragEnd={(e: KonvaEventObject<DragEvent>) => {
                    if (e.target === e.target.getStage()) {
                        camera.setX(e.target.x());
                        camera.setY(e.target.y());
                    }
                }}
                onMouseMove={(e: KonvaEventObject<MouseEvent>) => {
                    const mousePos = e.target.getStage()?.getRelativePointerPosition();
                    if (mousePos)
                        setMousePos(
                            (mousePos.x - camera.width) / camera.z,
                            (mousePos.y - camera.height) / camera.z
                        );
                }}
                onContextMenu={(e) => e.evt.preventDefault()}>

                <Layer
                    x={camera.width}
                    y={camera.height}
                    scale={{ x: camera.z, y: camera.z }}>

                    {map.elementIDs.map(elementID => (
                        <MapElement key={elementID} elementID={elementID} />
                    ))}
                    <SelectedMapElement />

                    <CanvasGrid />

                </Layer>

            </Stage>
        </div>

    );
}