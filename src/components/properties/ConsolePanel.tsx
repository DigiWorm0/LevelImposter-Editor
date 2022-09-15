import { FormGroup, NumericInput, Switch } from "@blueprintjs/core";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useTranslation from "../../hooks/useTranslation";
import { DEFAULT_CONSOLE_RANGE } from "../../types/generic/Constants";
import PanelContainer from "./PanelContainer";

export default function ConsolePanel() {
    const translation = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const saveHistory = useSaveHistory();

    const isConsole = selectedElem?.type.startsWith("task-")
        || (selectedElem?.type.startsWith("sab-") && !selectedElem?.type.startsWith("sab-btn"))
        || selectedElem?.type.startsWith("util-button")
        || selectedElem?.type.startsWith("util-cams")
        || selectedElem?.type === "util-admin"
        || selectedElem?.type === "util-vitals"
        || selectedElem?.type === "util-computer";

    if (!selectedElem || !isConsole)
        return null;

    return (
        <PanelContainer title={translation.Console}>
            <FormGroup>
                <NumericInput
                    key={selectedElem.id + "-range"}
                    fill
                    placeholder={translation.Range}
                    defaultValue={selectedElem?.properties.range ? selectedElem.properties.range : DEFAULT_CONSOLE_RANGE}
                    min={0}
                    minorStepSize={0.05}
                    stepSize={0.1}
                    majorStepSize={0.5}
                    leftIcon="ring"
                    onValueChange={(val) => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, range: val } });
                    }}
                />
                <Switch
                    key={selectedElem.id + "-onlyfrombelow"}
                    checked={selectedElem.properties.onlyFromBelow === undefined ? false : selectedElem.properties.onlyFromBelow}
                    label={translation.OnlyFromBelow}
                    onChange={(e) => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, onlyFromBelow: e.currentTarget.checked } });
                    }}
                />
            </FormGroup>
        </PanelContainer>
    );
}
