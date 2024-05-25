import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/elements/useSelectedElem";
import {
    DEFAULT_STARFIELD_COUNT,
    DEFAULT_STARFIELD_HEIGHT,
    DEFAULT_STARFIELD_LENGTH,
    DEFAULT_STARFIELD_MAXSPEED,
    DEFAULT_STARFIELD_MINSPEED
} from "../../../types/generic/Constants";
import InputGroup from "../input/InputGroup";
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
                icon="Workspaces"
                min={1}
                minorStepSize={1}
                stepSize={5}
                majorStepSize={10}
                max={10000}
            />
            <InputGroup>
                <NumericPanelInput
                    name="starfield.length"
                    prop="starfieldLength"
                    defaultValue={DEFAULT_STARFIELD_LENGTH}
                    icon="SwapHoriz"
                    min={0}
                    minorStepSize={0.1}
                    stepSize={1}
                    majorStepSize={10}
                    color="warning"
                />
                <NumericPanelInput
                    name="starfield.height"
                    prop="starfieldHeight"
                    defaultValue={DEFAULT_STARFIELD_HEIGHT}
                    icon="SwapVert"
                    min={0}
                    minorStepSize={0.1}
                    stepSize={1}
                    majorStepSize={10}
                    color="warning"
                />
            </InputGroup>
            <InputGroup>
                <NumericPanelInput
                    name="starfield.minSpeed"
                    prop="starfieldMinSpeed"
                    defaultValue={DEFAULT_STARFIELD_MINSPEED}
                    icon="FastRewind"
                    min={0}
                    minorStepSize={0.1}
                    stepSize={1}
                    majorStepSize={10}
                />
                <NumericPanelInput
                    name="starfield.maxSpeed"
                    prop="starfieldMaxSpeed"
                    defaultValue={DEFAULT_STARFIELD_MAXSPEED}
                    icon="FastForward"
                    min={0}
                    minorStepSize={0.1}
                    stepSize={1}
                    majorStepSize={10}
                />
            </InputGroup>
        </PanelContainer>
    );
}
