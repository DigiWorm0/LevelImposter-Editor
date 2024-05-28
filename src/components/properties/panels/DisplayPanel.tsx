import React from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_DISPLAY_HEIGHT, DEFAULT_DISPLAY_WIDTH } from "../../../types/generic/Constants";
import InputGroup from "../input/InputGroup";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import { useSelectedElemPropValue } from "../../../hooks/elements/useSelectedElemProperty";
import { SwapHoriz, SwapVert } from "@mui/icons-material";

const MAX_PIXELS = 1920 * 1080;

export default function CamPanel() {
    const { t } = useTranslation();

    const displayWidth = useSelectedElemPropValue("displayWidth") ?? DEFAULT_DISPLAY_WIDTH;
    const displayHeight = useSelectedElemPropValue("displayHeight") ?? DEFAULT_DISPLAY_HEIGHT;
    const isDisplay = useIsSelectedElemType("util-display");

    const pixelCount = displayWidth * displayHeight;

    if (!isDisplay)
        return null;
    return (
        <>
            <PanelContainer title={t("display.title") as string}>
                <InputGroup>
                    <ElementPropNumericInput
                        name={t("display.width")}
                        prop="displayWidth"
                        defaultValue={DEFAULT_DISPLAY_WIDTH}
                        icon={<SwapHoriz />}
                        stepSize={10}
                        color={"primary"}
                    />
                    <ElementPropNumericInput
                        name={t("display.height")}
                        prop="displayHeight"
                        defaultValue={DEFAULT_DISPLAY_HEIGHT}
                        icon={<SwapVert />}
                        stepSize={10}
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
