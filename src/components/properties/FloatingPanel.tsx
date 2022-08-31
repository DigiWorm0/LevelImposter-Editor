import { ControlGroup, FormGroup, NumericInput, Switch } from "@blueprintjs/core";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useTranslation from "../../hooks/useTranslation";
import { DEFAULT_STARFIELD_COUNT, DEFAULT_STARFIELD_LENGTH, DEFAULT_STARFIELD_MAXSPEED, DEFAULT_STARFIELD_MINSPEED, DEFAULT_STARFIELD_HEIGHT, UNITY_SCALE, DEFAULT_FLOATING_HEIGHT, DEFAULT_FLOATING_SPEED } from "../../types/generic/Constants";
import PanelContainer from "./PanelContainer";

export default function FloatingPanel() {
    const translation = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    if (!selectedElem || selectedElem.type !== "util-blankfloat")
        return null;

    return (
        <PanelContainer title={translation.FloatingSprite}>
            <FormGroup>
                    <NumericInput
                        key={selectedElem.id + "-height"}
                        fill
                        placeholder={translation.Height}
                        defaultValue={selectedElem?.properties.floatingHeight !== undefined ? selectedElem.properties.floatingHeight : DEFAULT_FLOATING_HEIGHT}
                        minorStepSize={0.01}
                        stepSize={0.1}
                        majorStepSize={1}
                        leftIcon="arrows-vertical"
                        onValueChange={(val) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, floatingHeight: val } });
                        }}
                    />
                    <NumericInput
                        key={selectedElem.id + "-speed"}
                        fill
                        placeholder={translation.Speed}
                        defaultValue={selectedElem?.properties.floatingSpeed !== undefined ? selectedElem.properties.floatingSpeed : DEFAULT_FLOATING_SPEED}
                        min={0}
                        minorStepSize={0.01}
                        stepSize={0.1}
                        majorStepSize={1}
                        leftIcon="double-chevron-up"
                        onValueChange={(val) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, floatingSpeed: val } });
                        }}
                    />

            </FormGroup>
        </PanelContainer>
    );
}
