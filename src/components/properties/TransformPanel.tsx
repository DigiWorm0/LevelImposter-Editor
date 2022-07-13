import { Button, ButtonGroup, ControlGroup, Divider, H5, InputGroup, NumericInput } from "@blueprintjs/core";
import React from "react";
import useKeyboard from "../../hooks/input/useKeyboard";
import useElement, { removeElement } from "../../hooks/useElement";
import useSelected from "../../hooks/useSelected";
import GUID from "../../types/generic/GUID";

export default function TransformPanel() {
    const [selectedID, setSelectedID] = useSelected();
    const [element, setElement] = useElement(selectedID);
    const keys = useKeyboard();

    React.useEffect(() => {
        if (keys["Delete"] && selectedID !== "") {
            removeElement(selectedID);
            setSelectedID("" as GUID);
        }
    }, [keys, selectedID, setElement]);

    const onInput = () => {
        setElement(element);
    }

    if (selectedID === "")
        return null;

    return (
        <div className="transform-panel">
            <H5>Properties</H5>
            <Divider />
            <InputGroup
                placeholder="Name"
                large
                onChange={(e) => { element.name = e.target.value; onInput() }}
                value={element.name}
            />
            <ControlGroup fill style={{ marginTop: 15 }}>
                <NumericInput
                    fill
                    placeholder="X"
                    onValueChange={(value) => { element.x = value; onInput() }}
                    minorStepSize={0.001}
                    value={element.x}
                />
                <NumericInput
                    fill
                    placeholder="Y"
                    onValueChange={(value) => { element.y = value; onInput() }}
                    minorStepSize={0.001}
                    value={element.y}
                />
                <NumericInput
                    fill
                    placeholder="Z"
                    onValueChange={(value) => { element.z = value; onInput() }}
                    minorStepSize={0.001}
                    value={element.z}
                />
            </ControlGroup>
            <ControlGroup fill>
                <NumericInput
                    fill
                    placeholder="X Scale"
                    onValueChange={(value) => { element.xScale = value; onInput() }}
                    minorStepSize={0.001}
                    value={element.xScale}
                />
                <NumericInput
                    fill
                    placeholder="Y Scale"
                    onValueChange={(value) => { element.yScale = value; onInput() }}
                    minorStepSize={0.001}
                    value={element.yScale}
                />
            </ControlGroup>
            <ControlGroup fill>
                <NumericInput
                    fill
                    placeholder="Rotation"
                    onValueChange={(value) => { element.rotation = value; onInput() }}
                    minorStepSize={0.001}
                    value={element.rotation}
                />
            </ControlGroup>
            <ButtonGroup minimal style={{ marginTop: 10 }} fill>
                <Button
                    fill
                    icon={element.properties.isLocked ? "lock" : "unlock"}
                    text={element.properties.isLocked ? "Unlock" : "Lock"}
                    onClick={() => { element.properties.isLocked = !element.properties.isLocked; onInput() }}
                />
                <Button
                    fill
                    icon="trash"
                    text="Remove"
                    onClick={() => { removeElement(selectedID); setSelectedID("" as GUID) }}
                />
            </ButtonGroup>
        </div>
    );
}
