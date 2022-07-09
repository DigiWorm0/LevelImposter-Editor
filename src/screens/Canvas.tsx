import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import React from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import CanvasGrid from '../components/canvas/CanvasGrid';
import MapElement from '../components/canvas/MapElement';
import useCamera from '../hooks/useCamera';
import { useElements } from '../hooks/useElement';
import useMap from '../hooks/useMap';
import useMouse from '../hooks/useMouse';
import useSelected from '../hooks/useSelected';

export default function Canvas() {
    const [map] = useMap();
    const [elements] = useElements(map.elementIDs);
    const camera = useCamera(window.innerWidth - 500, window.innerHeight - 50);
    const [, setSelectedID] = useSelected();
    const [leftMouse] = useMouse();

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
                onContextMenu={(e) => e.evt.preventDefault()}>
                <Layer
                    x={camera.width}
                    y={camera.height}
                    scale={{ x: camera.z, y: camera.z }}>

                    {map.elementIDs.map(elementID => (
                        <MapElement key={elementID} elementID={elementID} />
                    ))}

                    <CanvasGrid />

                </Layer>
            </Stage>
        </div>

    );
}