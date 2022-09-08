import { Button, ButtonGroup, ControlGroup, InputGroup, NumericInput } from "@blueprintjs/core";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import useSelectedElem, { useRemoveElement, useSetSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import useTranslation from "../../hooks/useTranslation";
import GUID from "../../types/generic/GUID";
import DevInfo from "../DevInfo";
import PanelContainer from "./PanelContainer";

export default function TransformPanel() {
    const translation = useTranslation();
    const setSelectedID = useSetSelectedElemID();
    const removeElement = useRemoveElement();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const settings = useSettingsValue();
    const saveHistory = useSaveHistory();

    if (!selectedElem)
        return null;

    return (
        <PanelContainer title={translation.Transform}>
            <DevInfo>
                {selectedElem.id}
            </DevInfo>

            <InputGroup
                style={{ marginBottom: 5 }}
                key={selectedElem.id + "-name"}
                defaultValue={selectedElem.name}
                placeholder={translation.Name}
                large
                onChange={(e) => {
                    saveHistory();
                    setSelectedElem({ ...selectedElem, name: e.target.value });
                }}
            />
            {settings.isDevMode && (
                <InputGroup
                    style={{ marginBottom: 5 }}
                    key={selectedElem.id + "-type"}
                    defaultValue={selectedElem.type}
                    placeholder={translation.Type}
                    large
                    onChange={(e) => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, type: e.target.value });
                    }}
                />
            )}
            <ControlGroup fill>
                <NumericInput
                    key={selectedElem.id + "-x"}
                    defaultValue={selectedElem.x}
                    onValueChange={(val) => {
                        saveHistory();
                        !isNaN(val) && setSelectedElem({ ...selectedElem, x: val });
                    }}
                    fill
                    placeholder={translation.X}
                    minorStepSize={0.01}
                    stepSize={0.1}
                    majorStepSize={1}
                />
                <NumericInput
                    key={selectedElem.id + "-y"}
                    defaultValue={selectedElem.y}
                    onValueChange={(val) => {
                        saveHistory();
                        !isNaN(val) && setSelectedElem({ ...selectedElem, y: val });
                    }}
                    fill
                    placeholder={translation.Y}
                    minorStepSize={0.01}
                    stepSize={0.1}
                    majorStepSize={1}
                />
                <NumericInput
                    key={selectedElem.id + "-z"}
                    defaultValue={selectedElem.z}
                    onValueChange={(val) => {
                        saveHistory();
                        !isNaN(val) && setSelectedElem({ ...selectedElem, z: val });
                    }}
                    fill
                    placeholder={translation.Z}
                    minorStepSize={0.01}
                    stepSize={0.1}
                    majorStepSize={1}
                />
            </ControlGroup>
            <ControlGroup fill>
                <NumericInput
                    key={selectedElem.id + "-xScale"}
                    defaultValue={selectedElem.xScale}
                    onValueChange={(val) => {
                        saveHistory();
                        !isNaN(val) && setSelectedElem({ ...selectedElem, xScale: val });
                    }}
                    fill
                    leftIcon="arrows-horizontal"
                    placeholder={translation.XScale}
                    minorStepSize={0.01}
                    stepSize={0.1}
                    majorStepSize={1}
                />
                <NumericInput
                    key={selectedElem.id + "-yScale"}
                    defaultValue={selectedElem.yScale}
                    onValueChange={(val) => {
                        saveHistory();
                        !isNaN(val) && setSelectedElem({ ...selectedElem, yScale: val });
                    }}
                    fill
                    leftIcon="arrows-vertical"
                    placeholder={translation.YScale}
                    minorStepSize={0.01}
                    stepSize={0.1}
                    majorStepSize={1}
                />
            </ControlGroup>
            <ControlGroup fill>
                <NumericInput
                    key={selectedElem.id + "-rotation"}
                    defaultValue={selectedElem.rotation}
                    onValueChange={(val) => {
                        saveHistory();
                        !isNaN(val) && setSelectedElem({ ...selectedElem, rotation: val });
                    }}
                    fill
                    leftIcon="refresh"
                    placeholder={translation.Rotation}
                    minorStepSize={1}
                    stepSize={45}
                    majorStepSize={90}
                />
            </ControlGroup>
            <ButtonGroup minimal style={{ marginTop: 10 }} fill>
                <Button
                    fill
                    icon={selectedElem.properties.isLocked ? "lock" : "unlock"}
                    text={selectedElem.properties.isLocked ? "Unlock" : "Lock"}
                    onClick={() => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, isLocked: !selectedElem.properties.isLocked } });
                    }}
                />
                <Button
                    fill
                    icon="trash"
                    text={translation.Delete}
                    onClick={() => {
                        saveHistory();
                        removeElement(selectedElem.id);
                        setSelectedID("" as GUID)
                    }}
                />
            </ButtonGroup>
        </PanelContainer>
    );
}
