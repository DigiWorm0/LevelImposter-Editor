import { Provider } from 'jotai';
import React from 'react';
import { Layer, Stage } from 'react-konva';
import CanvasGrid from '../canvas/CanvasGrid';
import { MapSorter } from '../canvas/MapSorter';
import SelectedMapElement from '../canvas/SelectedMapElement';
import primaryStore from '../../hooks/primaryStore';
import { useMapProperties } from '../../hooks/map/useMap';
import { useMouseCursorValue } from '../../hooks/input/useMouse';
import useCameraControl from "../../hooks/canvas/useCameraControl";
import useWindowSize from "../../hooks/canvas/useWindowSize";
import MapElementsRenderer from "../canvas/MapElementsRenderer";
import { useHotkeysContext } from "react-hotkeys-hook";
import { Scope } from "../../hooks/input/useHotkeysHandler";

export default function Canvas() {
    const { stageRef, layerRef } = useCameraControl();
    const [windowWidth, windowHeight] = useWindowSize();
    const cursor = useMouseCursorValue();
    const [properties] = useMapProperties();
    const { enableScope, disableScope } = useHotkeysContext();

    return (
        <div
            className="canvas"
            style={properties.bgColor ? { backgroundColor: properties.bgColor } : undefined}
            tabIndex={-1}
            onFocus={() => enableScope(Scope.Canvas)}
            onBlur={() => disableScope(Scope.Canvas)}
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