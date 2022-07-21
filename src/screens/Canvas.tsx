import { Provider } from 'jotai';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import React from 'react';
import { Layer, Stage } from 'react-konva';
import CanvasGrid from '../components/canvas/CanvasGrid';
import MapElement from '../components/canvas/MapElement';
import { MapSorter } from '../components/canvas/MapSorter';
import SelectedMapElement from '../components/canvas/SelectedMapElement';
import useMouse from '../hooks/input/useMouse';
import useMousePos from '../hooks/input/useMousePos';
import { PROVIDER_SCOPE } from '../hooks/jotai/Jotai';
import { useElementIDs } from '../hooks/jotai/useMap';
import useCamera from '../hooks/useCamera';

export default function Canvas() {
    const elementIDs = useElementIDs();
    const [canvasWidth, setCanvasWidth] = React.useState(window.innerWidth);
    const [canvasHeight, setCanvasHeight] = React.useState(window.innerHeight);
    const camera = useCamera(canvasWidth, canvasHeight);
    const [, , setMousePos] = useMousePos();
    const [leftMouse] = useMouse();

    const onWindowResize = () => {
        setCanvasWidth(window.innerWidth);
        setCanvasHeight(window.innerHeight);
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

                <Provider scope={PROVIDER_SCOPE}>

                    <Layer
                        x={camera.width}
                        y={camera.height}
                        scale={{ x: camera.z, y: camera.z }}>

                        {elementIDs.map(elementID => (
                            <MapElement key={elementID} elementID={elementID} />
                        ))}
                        <SelectedMapElement />

                        <CanvasGrid />
                        <MapSorter />

                    </Layer>
                </Provider>

            </Stage>
        </div>

    );
}