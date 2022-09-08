import { ControlGroup, FormGroup, NumericInput } from "@blueprintjs/core";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useTranslation from "../../hooks/useTranslation";
import { DEFAULT_STARFIELD_COUNT, DEFAULT_STARFIELD_HEIGHT, DEFAULT_STARFIELD_LENGTH, DEFAULT_STARFIELD_MAXSPEED, DEFAULT_STARFIELD_MINSPEED } from "../../types/generic/Constants";
import PanelContainer from "./PanelContainer";

export default function StarfieldPanel() {
    const translation = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    if (!selectedElem || selectedElem.type !== "util-starfield")
        return null;

    return (
        <PanelContainer title={translation.Starfield}>
            <FormGroup>
                <NumericInput
                    key={selectedElem.id + "-count"}
                    fill
                    placeholder={translation.Count}
                    defaultValue={selectedElem?.properties.starfieldCount !== undefined ? selectedElem.properties.starfieldCount : DEFAULT_STARFIELD_COUNT}
                    min={1}
                    minorStepSize={1}
                    stepSize={5}
                    majorStepSize={10}
                    max={10000}
                    leftIcon="layout-sorted-clusters"
                    onValueChange={(val) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, starfieldCount: val } });
                    }}
                />

                <ControlGroup fill>
                    <NumericInput
                        key={selectedElem.id + "-length"}
                        fill
                        placeholder={translation.Length}
                        defaultValue={selectedElem?.properties.starfieldLength !== undefined ? selectedElem.properties.starfieldLength : DEFAULT_STARFIELD_LENGTH}
                        min={0}
                        minorStepSize={0.1}
                        stepSize={1}
                        majorStepSize={10}
                        leftIcon="arrows-horizontal"
                        onValueChange={(val) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, starfieldLength: val } });
                        }}
                    />
                    <NumericInput
                        key={selectedElem.id + "-height"}
                        fill
                        placeholder={translation.Height}
                        defaultValue={selectedElem?.properties.starfieldHeight !== undefined ? selectedElem.properties.starfieldHeight : DEFAULT_STARFIELD_HEIGHT}
                        min={0}
                        minorStepSize={0.1}
                        stepSize={1}
                        majorStepSize={10}
                        leftIcon="arrows-vertical"
                        onValueChange={(val) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, starfieldHeight: val } });
                        }}
                    />
                </ControlGroup>

                <ControlGroup fill>
                    <NumericInput
                        key={selectedElem.id + "-maxspeed"}
                        fill
                        placeholder={translation.MaxSpeed}
                        defaultValue={selectedElem?.properties.starfieldMaxSpeed !== undefined ? selectedElem.properties.starfieldMaxSpeed : DEFAULT_STARFIELD_MAXSPEED}
                        min={selectedElem?.properties.starfieldMinSpeed !== undefined ? selectedElem.properties.starfieldMinSpeed : DEFAULT_STARFIELD_MINSPEED}
                        minorStepSize={0.1}
                        stepSize={1}
                        majorStepSize={10}
                        leftIcon="double-chevron-up"
                        onValueChange={(val) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, starfieldMaxSpeed: val } });
                        }}
                    />
                    <NumericInput
                        key={selectedElem.id + "-minspeed"}
                        fill
                        placeholder={translation.MinSpeed}
                        defaultValue={selectedElem?.properties.starfieldMinSpeed !== undefined ? selectedElem.properties.starfieldMinSpeed : DEFAULT_STARFIELD_MINSPEED}
                        max={selectedElem?.properties.starfieldMaxSpeed !== undefined ? selectedElem.properties.starfieldMaxSpeed : DEFAULT_STARFIELD_MAXSPEED}
                        minorStepSize={0.1}
                        stepSize={1}
                        majorStepSize={10}
                        leftIcon="double-chevron-down"
                        onValueChange={(val) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, starfieldMinSpeed: val } });
                        }}
                    />
                </ControlGroup>

            </FormGroup>
        </PanelContainer>
    );
}
