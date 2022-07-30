import { FormGroup, NumericInput } from "@blueprintjs/core";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { DEFAULT_CONSOLE_RANGE, DEFAULT_LADDER_HEIGHTS } from "../../types/generic/Constants";
import PanelContainer from "./PanelContainer";

export default function LadderPanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();

    if (!selectedElem || !selectedElem.type.startsWith("util-ladder"))
        return null;

    return (
        <PanelContainer title="Ladder">
            <FormGroup>
                <NumericInput
                    key={selectedElem.id + "-ladderheight"}
                    fill
                    placeholder="Ladder Height"
                    defaultValue={selectedElem?.properties.ladderHeight ? selectedElem.properties.ladderHeight : DEFAULT_LADDER_HEIGHTS[selectedElem.type]}
                    min={0}
                    minorStepSize={0.05}
                    stepSize={0.1}
                    majorStepSize={0.5}
                    leftIcon="arrows-vertical"
                    onValueChange={(val) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, ladderHeight: val } });
                    }}
                />
            </FormGroup>
        </PanelContainer>
    );
}
