import { KonvaEventObject } from 'konva/lib/Node';
import React from 'react';
import { Layer, Stage } from 'react-konva';
import CanvasGrid from '../components/canvas/CanvasGrid';
import MapElement from '../components/canvas/MapElement';
import useCamera from '../hooks/useCamera';
import useMap from '../hooks/useMap';
import useSelected from '../hooks/useSelected';

export default function Canvas() {
    const [map] = useMap();
    const camera = useCamera();
    const [, setSelectedID] = useSelected();


    const checkDeselect = (e: KonvaEventObject<MouseEvent>) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedID(undefined);
        }
    };

    return (
        <div className="canvas">
            <Stage
                width={window.innerWidth}
                height={window.innerHeight - 50}
                onMouseDown={checkDeselect}>
                <Layer
                    x={-camera.x + (window.innerWidth / 2)}
                    y={camera.y + (window.innerHeight / 2)}
                    scale={{ x: camera.z, y: camera.z }}>

                    <CanvasGrid />

                    {map.elementIDs.map(elementID => (
                        <MapElement key={elementID} elementID={elementID} />
                    ))}
                </Layer>
            </Stage>
        </div>

    );
}