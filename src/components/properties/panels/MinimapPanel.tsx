import { Button } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/map/elements/useSelectedElem";
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
                    fill
                    minimal
                    icon="download"
                    text={t("minimap.download") as string}
                    disabled={isVisible}
                    onClick={() => setVisible(true)}
                />
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
