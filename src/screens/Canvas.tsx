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
    const camera = useCamera();
    const [, setSelectedID] = useSelected();
    const [leftMouse] = useMouse();

    Konva.dragButtons = [0, 1, 2];
    Konva.hitOnDragEnabled = true;

    return (
        <div className="canvas">
            <Stage
                width={window.innerWidth - 500}
                height={window.innerHeight - 50}
                draggable={!leftMouse}
                onContextMenu={(e) => e.evt.preventDefault()}>
                <Layer
                    x={window.innerWidth / 2}
                    y={window.innerHeight / 2}
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