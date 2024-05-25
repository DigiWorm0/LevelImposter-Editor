import React from "react";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/elements/useSelectedElem";
import { DEFAULT_DISPLAY_HEIGHT, DEFAULT_DISPLAY_WIDTH } from "../../../types/generic/Constants";
import InputGroup from "../input/InputGroup";
import NumericPanelInput from "../input/NumericPanelInput";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";

const MAX_PIXELS = 1920 * 1080;

export default function CamPanel() {
    const { t } = useTranslation();
    const element = useSelectedElemValue();

    const pixelCount = React.useMemo(() => {
        const width = element?.properties.displayWidth ?? DEFAULT_DISPLAY_WIDTH;
        const height = element?.properties.displayHeight ?? DEFAULT_DISPLAY_HEIGHT;
        return width * height;
    }, [element]);

    if (!element || element.type !== "util-display")
        return null;

    return (
        <>
            <PanelContainer title={t("display.title") as string}>
                <InputGroup>
                    <NumericPanelInput
                        name="display.width"
                        prop="displayWidth"
                        defaultValue={DEFAULT_DISPLAY_WIDTH}
                        icon="SwapHoriz"
                        minorStepSize={1}
                        stepSize={10}
                        majorStepSize={100}
                        color={"primary"}
                    />
                    <NumericPanelInput
                        name="display.height"
                        prop="displayHeight"
                        defaultValue={DEFAULT_DISPLAY_HEIGHT}
                        icon="SwapVert"
                        minorStepSize={1}
                        stepSize={10}
                        majorStepSize={100}
                        color={"primary"}
                    />
                </InputGroup>
            </PanelContainer>
            <MapError
                isVisible={pixelCount > MAX_PIXELS}
                icon="ViewCompact"
            >
                {t("display.errorResolution") as string}
            </MapError>
        </>
    );
}
