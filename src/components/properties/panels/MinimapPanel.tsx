import { CloudDownload } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import DownloadCanvasDialog from "../../modals/DownloadCanvas";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import { useSelectedElemPropValue } from "../../../hooks/elements/useSelectedElemProperty";

export default function MinimapPanel() {
    const { t } = useTranslation();
    const [isVisible, setVisible] = React.useState(false);
    const isMinimap = useIsSelectedElemType("util-minimap");
    const spriteID = useSelectedElemPropValue("spriteID");

    if (!isMinimap)
        return null;

    return (
        <>
            <DownloadCanvasDialog
                isVisible={isVisible}
                setVisible={setVisible}
            />

            <PanelContainer title={t("minimap.title") as string}>
                <ElementPropNumericInput
                    name={t("minimap.scale")}
                    prop="minimapScale"
                    defaultValue={1}
                    icon="AspectRatio"
                    min={0.1}
                    stepSize={0.1}
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
                isVisible={spriteID === undefined}
                icon="PlayArrow"
            >
                {t("minimap.errorNoSprite") as string}
            </MapError>
        </>
    );
}
