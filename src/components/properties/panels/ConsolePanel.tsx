import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/map/elements/useSelectedElem";
import { DEFAULT_CONSOLE_RANGE } from "../../../types/generic/Constants";
import ColorPanelInput from "../input/ColorPanelInput";
import NumericPanelInput from "../input/NumericPanelInput";
import SwitchPanelInput from "../input/SwitchPanelInput";
import PanelContainer from "../util/PanelContainer";

export default function ConsolePanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();

    const isConsole = selectedElem?.type.startsWith("task-")
        || (selectedElem?.type.startsWith("sab-") && !selectedElem?.type.startsWith("sab-btn") && !selectedElem?.type.startsWith("sab-door"))
        || selectedElem?.type.startsWith("util-button")
        || selectedElem?.type.startsWith("util-cams")
        || selectedElem?.type === "util-admin"
        || selectedElem?.type === "util-vitals"
        || selectedElem?.type === "util-computer"
        || selectedElem?.type === "util-triggerconsole";

    if (!selectedElem || !isConsole)
        return null;

    return (
        <>
            <PanelContainer title={t("console.title") as string}>
                <NumericPanelInput
                    name="console.range"
                    prop="range"
                    defaultValue={DEFAULT_CONSOLE_RANGE}
                    icon="TripOrigin"
                    min={0}
                    minorStepSize={0.05}
                    stepSize={0.1}
                    majorStepSize={0.5}
                    color="warning"
                />
                {selectedElem.type === "util-triggerconsole" && (
                    <ColorPanelInput
                        name={t("console.highlightColor") as string}
                        prop="highlightColor"
                        defaultValue={{ r: 255, g: 255, b: 0, a: 1 }} // Yellow
                    />
                )}
                <SwitchPanelInput
                    name="console.onlyFromBelow"
                    prop="onlyFromBelow"
                    defaultValue={false}
                />
                <SwitchPanelInput
                    name="console.checkCollision"
                    prop="checkCollision"
                    defaultValue={false}
                />
            </PanelContainer>
        </>
    );
}
