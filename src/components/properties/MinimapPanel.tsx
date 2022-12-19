import { Button, NumericInput } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import DownloadCanvasDialog from "../dialogs/DownloadCanvas";
import MapError from "./MapError";
import PanelContainer from "./PanelContainer";

export default function MinimapPanel() {
    const { t } = useTranslation();
    const [isVisible, setVisible] = React.useState(false);
    const [element, setElement] = useSelectedElem();

    if (!element
        || element.type !== "util-minimap")
        return null;

    return (
        <>
            <DownloadCanvasDialog
                isVisible={isVisible}
                setVisible={setVisible}
            />
            <PanelContainer title={t("minimap.title") as string}>
                <NumericInput
                    fill
                    leftIcon="maximize"
                    placeholder={t("minimap.scale") as string}
                    value={element.properties.minimapScale === undefined ? 1 : element.properties.minimapScale}
                    onValueChange={(value) => {
                        setElement({
                            ...element,
                            properties: {
                                ...element.properties,
                                minimapScale: value
                            }
                        });
                    }}
                    minorStepSize={0.01}
                    stepSize={0.1}
                    majorStepSize={1}
                    min={0.1}
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
            <MapError isVisible={element.properties.spriteData === undefined}>
                {t("minimap.errorNoSprite") as string}
            </MapError>
        </>
    );
}
