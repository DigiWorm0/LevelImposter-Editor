import { ControlGroup } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import NumericPanelInput from "../input/NumericPanelInput";
import PanelContainer from "../util/PanelContainer";
import { DEFAULT_DISPLAY_WIDTH, DEFAULT_DISPLAY_HEIGHT } from "../../../types/generic/Constants";

export default function CamPanel() {
    const { t } = useTranslation();
    const element = useSelectedElemValue();

    if (!element || element.type !== "util-display")
        return null;

    return (
        <PanelContainer title={t("display.title") as string}>
            <ControlGroup fill>
                <NumericPanelInput
                    name="display.width"
                    prop="displayWidth"
                    defaultValue={DEFAULT_DISPLAY_WIDTH}
                    icon="arrows-horizontal"
                    minorStepSize={1}
                    stepSize={10}
                    majorStepSize={100}
                    intent={"primary"}
                />
                <NumericPanelInput
                    name="display.height"
                    prop="displayHeight"
                    defaultValue={DEFAULT_DISPLAY_HEIGHT}
                    icon="arrows-vertical"
                    minorStepSize={1}
                    stepSize={10}
                    majorStepSize={100}
                    intent={"primary"}
                />
            </ControlGroup>
        </PanelContainer>
    );
}
