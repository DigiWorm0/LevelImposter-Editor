import { ControlGroup, FormGroup, NumericInput, Switch } from "@blueprintjs/core";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { DEFAULT_STARFIELD_COUNT, DEFAULT_STARFIELD_LENGTH, DEFAULT_STARFIELD_MAXSPEED, DEFAULT_STARFIELD_MINSPEED, DEFAULT_STARFIELD_HEIGHT, UNITY_SCALE } from "../../types/generic/Constants";
import PanelContainer from "./PanelContainer";

export default function StarfieldPanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();

    if (!selectedElem || selectedElem.type !== "util-starfield")
        return null;

    return (
        <PanelContainer title="Starfield">
            <FormGroup>
                <NumericInput
                    key={selectedElem.id + "-count"}
                    fill
                    placeholder="Count"
                    defaultValue={selectedElem?.properties.starfieldCount ? selectedElem.properties.starfieldCount : DEFAULT_STARFIELD_COUNT}
                    min={1}
                    minorStepSize={1}
                    stepSize={5}
                    majorStepSize={10}
                    leftIcon="layout-sorted-clusters"
                    onValueChange={(val) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, starfieldCount: val } });
                    }}
                />

                <ControlGroup fill>
                    <NumericInput
                        key={selectedElem.id + "-length"}
                        fill
                        placeholder="Length"
                        defaultValue={selectedElem?.properties.starfieldLength ? selectedElem.properties.starfieldLength : DEFAULT_STARFIELD_LENGTH}
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
                        placeholder="Height"
                        defaultValue={selectedElem?.properties.starfieldHeight ? selectedElem.properties.starfieldHeight : DEFAULT_STARFIELD_HEIGHT}
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
                        placeholder="Max Speed"
                        defaultValue={selectedElem?.properties.starfieldMaxSpeed ? selectedElem.properties.starfieldMaxSpeed : DEFAULT_STARFIELD_MAXSPEED}
                        min={selectedElem?.properties.starfieldMinSpeed ? selectedElem.properties.starfieldMinSpeed : DEFAULT_STARFIELD_MINSPEED}
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
                        placeholder="Min Speed"
                        defaultValue={selectedElem?.properties.starfieldMinSpeed ? selectedElem.properties.starfieldMinSpeed : DEFAULT_STARFIELD_MINSPEED}
                        max={selectedElem?.properties.starfieldMaxSpeed ? selectedElem.properties.starfieldMaxSpeed : DEFAULT_STARFIELD_MAXSPEED}
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
