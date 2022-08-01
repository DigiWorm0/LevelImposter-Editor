import { Provider } from 'jotai';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import React from 'react';
import { Layer, Stage } from 'react-konva';
import CanvasGrid from '../components/canvas/CanvasGrid';
import MapElement from '../components/canvas/MapElement';
import { MapSorter } from '../components/canvas/MapSorter';
import SelectedMapElement from '../components/canvas/SelectedMapElement';
import useMouseButtons from '../hooks/input/useMouse';
import { useMouseCursorValue } from '../hooks/input/useMouseCursor';
import { PROVIDER_SCOPE } from '../hooks/jotai/Jotai';
import { useElementIDs, useMapProperties } from '../hooks/jotai/useMap';
import useCamera from '../hooks/useCamera';
import useCombos from '../hooks/useCombos';

export default function Canvas() {
    const [canvasWidth, setCanvasWidth] = React.useState(window.innerWidth);
    const [canvasHeight, setCanvasHeight] = React.useState(window.innerHeight);
    const cursor = useMouseCursorValue();
    const [properties] = useMapProperties();
    const elementIDs = useElementIDs();
    const camera = useCamera(canvasWidth, canvasHeight);
    const [leftMouse] = useMouseButtons();
    const { handleKeyDown, handleKeyUp } = useCombos();

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
        <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            className="canvas"
            style={properties.bgColor ? { backgroundColor: properties.bgColor } : undefined}>

            <Stage
                id="canvas"
                style={{ cursor: cursor }}
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
                onContextMenu={(e) => e.evt.preventDefault()}>

                <Provider scope={PROVIDER_SCOPE}>

                    <Layer
                        x={camera.width}
                        y={camera.height}
                        scale={{ x: camera.z, y: camera.z }}>

                        {elementIDs.map(elementID => (
                            <MapElement key={elementID} elementID={elementID} />
                        ))}

                        <CanvasGrid />
                        <SelectedMapElement />

                        <MapSorter />

                    </Layer>
                </Provider>

            </Stage>
        </div>
    );
}