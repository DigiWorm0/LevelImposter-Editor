import { Provider } from 'jotai';
import React from 'react';
import { Layer, Stage } from 'react-konva';
import CanvasGrid from '../components/canvas/CanvasGrid';
import { MapSorter } from '../components/canvas/MapSorter';
import SelectedMapElement from '../components/canvas/SelectedMapElement';
import primaryStore from '../hooks/jotai/primaryStore';
import { useMapProperties } from '../hooks/jotai/useMap';
import { useMouseCursorValue } from '../hooks/jotai/useMouse';
import useCameraControl from "../hooks/canvas/useCameraControl";
import useWindowSize from "../hooks/canvas/useWindowSize";
import MapElementsRenderer from "../components/canvas/MapElementsRenderer";

export default function Canvas() {
    const { stageRef, layerRef } = useCameraControl();
    const [windowWidth, windowHeight] = useWindowSize();
    const cursor = useMouseCursorValue();
    const [properties] = useMapProperties();

    return (
        <div
            className="canvas"
            style={properties.bgColor ? { backgroundColor: properties.bgColor } : undefined}
        >
            <Stage
                id="canvas"
                width={windowWidth}
                height={windowHeight}
                ref={stageRef}
                style={{ cursor: cursor }}
                perfectDrawEnabled={false}
            >
                <Provider store={primaryStore}>
                    <Layer
                        imageSmoothingEnabled={properties.pixelArtMode !== true}
                        x={windowWidth / 2}
                        y={windowHeight / 2}
                        ref={layerRef}
                    >
                        <MapElementsRenderer />
                        <CanvasGrid />
                        <SelectedMapElement />
                        <MapSorter />
                    </Layer>
                </Provider>

            </Stage>
        </div>
    );
}