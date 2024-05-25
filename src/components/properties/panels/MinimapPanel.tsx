import { CloudDownload } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/elements/useSelectedElem";
import DownloadCanvasDialog from "../../modals/DownloadCanvas";
import NumericPanelInput from "../input/NumericPanelInput";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";

export default function MinimapPanel() {
    const { t } = useTranslation();
    const [isVisible, setVisible] = React.useState(false);
    const element = useSelectedElemValue();

    if (!element || element.type !== "util-minimap")
        return null;

    return (
        <>
            <DownloadCanvasDialog
                isVisible={isVisible}
                setVisible={setVisible}
            />

            <PanelContainer title={t("minimap.title") as string}>
                <NumericPanelInput
                    name="minimap.scale"
                    prop="minimapScale"
                    defaultValue={1}
                    icon="AspectRatio"
                    min={0.1}
                    minorStepSize={0.01}
                    stepSize={0.1}
                    majorStepSize={1}
                    color="warning"
                />
                <Button
                    fullWidth
                    startIcon={<CloudDownload />}
                    disabled={isVisible}
                    onClick={() => setVisible(true)}
                >
                    {t("minimap.download") as string}
                </Button>
            </PanelContainer>

            <MapError
                info
                icon="Image"
            >
                {t("minimap.infoSprite") as string}
            </MapError>
            <MapError
                isVisible={element.properties.spriteID === undefined}
                icon="PlayArrow"
            >
                {t("minimap.errorNoSprite") as string}
            </MapError>
        </>
    );
}
