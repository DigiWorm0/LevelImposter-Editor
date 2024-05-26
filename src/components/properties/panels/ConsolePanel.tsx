import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/elements/useSelectedElem";
import { DEFAULT_CONSOLE_RANGE } from "../../../types/generic/Constants";
import ElementPropColorInput from "../input/elementProps/ElementPropColorInput";
import PanelContainer from "../util/PanelContainer";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";

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
                <ElementPropNumericInput
                    name={t("console.range")}
                    prop="range"
                    defaultValue={DEFAULT_CONSOLE_RANGE}
                    icon="TripOrigin"
                    min={0}
                    stepSize={0.2}
                    color="warning"
                />
                {selectedElem.type === "util-triggerconsole" && (
                    <ElementPropColorInput
                        name={t("console.highlightColor") as string}
                        prop="highlightColor"
                        defaultValue={{ r: 255, g: 255, b: 0, a: 1 }} // Yellow
                    />
                )}
                <ElementPropSwitch
                    name={t("console.onlyFromBelow")}
                    prop="onlyFromBelow"
                    defaultValue={false}
                />
                <ElementPropSwitch
                    name={t("console.checkCollision")}
                    prop="checkCollision"
                    defaultValue={false}
                />
            </PanelContainer>
        </>
    );
}
