import { Button, Dialog } from '@blueprintjs/core';
import { Provider } from 'jotai';
import Konva from 'konva';
import React from 'react';
import { Layer, Stage } from 'react-konva';
import { useElementIDs } from '../../hooks/jotai/useMap';
import { useSelectedElemValue } from '../../hooks/jotai/useSelectedElem';
import { useSettingsValue } from '../../hooks/jotai/useSettings';
import { MINIMAP_HEIGHT, MINIMAP_WIDTH, PROVIDER_SCOPE, UNITY_SCALE } from '../../types/generic/Constants';
import MapElement from '../canvas/MapElement';

export default function DownloadCanvasDialog(props: { isVisible: boolean, setVisible: (isVisible: boolean) => void }) {
    const minimap = useSelectedElemValue();
    const settings = useSettingsValue();
    const elementIDs = useElementIDs();
    const stageRef = React.useRef() as React.MutableRefObject<Konva.Stage>;

    const scale = minimap?.properties.minimapScale === undefined ? 1 : minimap.properties.minimapScale;

    const onDownload = () => {
        const stage = stageRef.current;
        if (!stage)
            return;
        const link = document.createElement('a');
        link.download = 'map.png';
        link.href = stage.toDataURL();
        link.click();
    };

    return (
        <>
            <Dialog
                isOpen={props.isVisible}
                onClose={() => props.setVisible(false)}
                title="Download Map Image"
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                {(props.isVisible && minimap !== undefined) && (
                    <Stage
                        ref={stageRef}
                        id="download-canvas"
                        x={-(minimap.x - MINIMAP_WIDTH * scale * 0.5) * UNITY_SCALE}
                        y={(minimap.y + MINIMAP_HEIGHT * scale * 0.5) * UNITY_SCALE}
                        width={MINIMAP_WIDTH * scale * UNITY_SCALE}
                        height={MINIMAP_HEIGHT * scale * UNITY_SCALE}
                        className="download-canvas"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: 10
                        }}
                        listening={false}>

                        <Provider scope={PROVIDER_SCOPE}>
                            <Layer>
                                {elementIDs.map(elementID => (
                                    <MapElement key={elementID} elementID={elementID} />
                                ))}
                            </Layer>
                        </Provider>
                    </Stage>
                )}

                <Button
                    style={{ margin: 10 }}
                    onClick={onDownload}
                    text="Download"
                    icon="download"
                    disabled={!props.isVisible}
                    large
                />

            </Dialog>


        </>
    );
}