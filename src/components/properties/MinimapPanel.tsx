import { Button, NumericInput } from "@blueprintjs/core";
import React from "react";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useTranslation from "../../hooks/useTranslation";
import DownloadCanvasDialog from "../dialogs/DownloadCanvas";
import PanelContainer from "./PanelContainer";

export default function MinimapPanel() {
    const translation = useTranslation();
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
            <PanelContainer title={translation.Minimap}>
                <NumericInput
                    fill
                    leftIcon="maximize"
                    placeholder={translation.Size}
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
                    text={translation.Download}
                    disabled={isVisible}
                    onClick={() => setVisible(true)}
                />
            </PanelContainer>
        </>
    );
}
