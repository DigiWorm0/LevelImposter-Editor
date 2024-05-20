import { Provider } from 'jotai';
import Konva from 'konva';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layer, Stage } from 'react-konva';
import primaryStore from '../../hooks/primaryStore';
import { useElementIDs } from '../../hooks/map/useMap';
import { useSelectedElemValue } from '../../hooks/map/elements/useSelectedElem';
import { MINIMAP_HEIGHT, MINIMAP_WIDTH, UNITY_SCALE } from '../../types/generic/Constants';
import MapElement from '../canvas/MapElement';
import { Button } from "@mui/material";
import { CloudDownload } from "@mui/icons-material";
import GenericModal from "./GenericModal";

export default function DownloadCanvasDialog(props: { isVisible: boolean, setVisible: (isVisible: boolean) => void }) {
    const minimap = useSelectedElemValue();
    const elementIDs = useElementIDs();
    const stageRef = React.useRef() as React.MutableRefObject<Konva.Stage>;
    const { t } = useTranslation();

    const scale = minimap?.properties.minimapScale ?? 1;

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
        <GenericModal
            open={props.isVisible}
            onClose={() => props.setVisible(false)}
            title={t("minimap.download")}
            actions={
                <Button
                    style={{ margin: 10 }}
                    onClick={onDownload}
                    startIcon={<CloudDownload />}
                    disabled={!props.isVisible}
                    size={"large"}
                >
                    {t("minimap.download")}
                </Button>
            }
        >
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

                    <Provider store={primaryStore}>
                        <Layer>
                            {elementIDs.map(elementID => (
                                <MapElement key={elementID} elementID={elementID} />
                            ))}
                        </Layer>
                    </Provider>
                </Stage>
            )}
        </GenericModal>
    );
}