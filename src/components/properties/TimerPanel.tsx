import { Button, FormGroup, NumericInput } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import PanelContainer from "./PanelContainer";

export default function TimerPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const saveHistory = useSaveHistory();

    if (!selectedElem || selectedElem.type !== "util-triggertimer")
        return null;

    return (
        <PanelContainer title={t("timer.title") as string}>
            <FormGroup>
                <NumericInput
                    key={selectedElem.id + "-duration"}
                    fill
                    placeholder={t("timer.duration") as string}
                    defaultValue={selectedElem?.properties.triggerTime !== undefined ? selectedElem.properties.triggerTime : 1}
                    min={0}
                    minorStepSize={0.1}
                    stepSize={1}
                    majorStepSize={10}
                    leftIcon="time"
                    rightElement={<Button minimal disabled>seconds</Button>}
                    onValueChange={(val) => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, triggerTime: val } });
                    }}
                />
            </FormGroup>
        </PanelContainer>
    );
}
