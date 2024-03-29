import { ControlGroup } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import { DEFAULT_STARFIELD_COUNT, DEFAULT_STARFIELD_HEIGHT, DEFAULT_STARFIELD_LENGTH, DEFAULT_STARFIELD_MAXSPEED, DEFAULT_STARFIELD_MINSPEED } from "../../../types/generic/Constants";
import NumericPanelInput from "../input/NumericPanelInput";
import PanelContainer from "../util/PanelContainer";

export default function StarfieldPanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();

    if (!selectedElem || selectedElem.type !== "util-starfield")
        return null;

    return (
        <PanelContainer title={t("starfield.title") as string}>
            <NumericPanelInput
                name="starfield.count"
                prop="starfieldCount"
                defaultValue={DEFAULT_STARFIELD_COUNT}
                icon="layout-sorted-clusters"
                min={1}
                minorStepSize={1}
                stepSize={5}
                majorStepSize={10}
                max={10000}
            />
            <ControlGroup fill>
                <NumericPanelInput
                    name="starfield.length"
                    prop="starfieldLength"
                    defaultValue={DEFAULT_STARFIELD_LENGTH}
                    icon="arrows-horizontal"
                    min={0}
                    minorStepSize={0.1}
                    stepSize={1}
                    majorStepSize={10}
                    intent="warning"
                />
                <NumericPanelInput
                    name="starfield.height"
                    prop="starfieldHeight"
                    defaultValue={DEFAULT_STARFIELD_HEIGHT}
                    icon="arrows-vertical"
                    min={0}
                    minorStepSize={0.1}
                    stepSize={1}
                    majorStepSize={10}
                    intent="warning"
                />
            </ControlGroup>
            <ControlGroup fill>
                <NumericPanelInput
                    name="starfield.minSpeed"
                    prop="starfieldMinSpeed"
                    defaultValue={DEFAULT_STARFIELD_MINSPEED}
                    icon="double-chevron-down"
                    min={0}
                    minorStepSize={0.1}
                    stepSize={1}
                    majorStepSize={10}
                />
                <NumericPanelInput
                    name="starfield.maxSpeed"
                    prop="starfieldMaxSpeed"
                    defaultValue={DEFAULT_STARFIELD_MAXSPEED}
                    icon="double-chevron-up"
                    min={0}
                    minorStepSize={0.1}
                    stepSize={1}
                    majorStepSize={10}
                />
            </ControlGroup>
        </PanelContainer>
    );
}
