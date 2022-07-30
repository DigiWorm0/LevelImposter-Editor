import { Button, Dialog } from '@blueprintjs/core';
import { Provider, useAtom } from 'jotai';
import Konva from 'konva';
import React from 'react';
import { Layer, Stage } from 'react-konva';
import MapElement from '../canvas/MapElement';
import { PROVIDER_SCOPE } from '../../hooks/jotai/Jotai';
import { useElementIDs } from '../../hooks/jotai/useMap';
import { useSettingsValue } from '../../hooks/jotai/useSettings';

const DOWNLOAD_SIZE = {
    width: 5000,
    height: 5000
};

export default function DownloadCanvasDialog(props: { isVisible: boolean, setVisible: (isVisible: boolean) => void }) {
    const settings = useSettingsValue();
    const elementIDs = useElementIDs();
    const stageRef = React.useRef() as React.MutableRefObject<Konva.Stage>;

    const onDownload = () => {
        const stage = stageRef.current;
        if (!stage)
            return;
        const link = document.createElement('a');
        link.download = 'map.png';
        link.href = stage.toDataURL();
        link.click();
    }

    return (
        <>
            <Dialog
                isOpen={props.isVisible}
                onClose={() => props.setVisible(false)}
                title="Download Map Image"
                portalClassName={settings.isDarkMode ? "bp4-dark" : ""}>

                {props.isVisible && (
                    <Stage
                        ref={stageRef}
                        id="download-canvas"
                        width={DOWNLOAD_SIZE.width}
                        height={DOWNLOAD_SIZE.height}
                        x={DOWNLOAD_SIZE.width / 2}
                        y={DOWNLOAD_SIZE.height / 2}
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