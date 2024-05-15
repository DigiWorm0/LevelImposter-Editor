import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/map/elements/useSelectedElem";
import NumericPanelInput from "../input/NumericPanelInput";
import PanelContainer from "../util/PanelContainer";
import SwitchPanelInput from "../input/SwitchPanelInput";

export default function TimerPanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();

    if (!selectedElem || selectedElem.type !== "util-triggertimer")
        return null;

    return (
        <PanelContainer title={t("timer.title") as string}>
            <NumericPanelInput
                key="duration"
                name="timer.duration"
                prop="triggerTime"
                defaultValue={1}
                icon="Timer"
                label="seconds"
                min={0}
                minorStepSize={0.1}
                stepSize={1}
                majorStepSize={10}
            />
            <SwitchPanelInput
                prop={"triggerLoop"}
                name={"timer.isRepeat"}
                defaultValue={false}
                tooltip={"timer.isRepeatTooltip"}
            />
        </PanelContainer>
    );
}
