import { Card, ControlGroup, Divider, H2, H4, H5, H6, InputGroup, NumericInput } from "@blueprintjs/core";
import React from "react";
import useElement, { removeElement } from "../../hooks/useElement";
import useKeyboard from "../../hooks/useKeyboard";
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
                    value={element.x}
                />
                <NumericInput
                    fill
                    placeholder="Y"
                    onValueChange={(value) => { element.y = value; onInput() }}
                    value={element.y}
                />
                <NumericInput
                    fill
                    placeholder="Z"
                    onValueChange={(value) => { element.z = value; onInput() }}
                    value={element.z}
                />
            </ControlGroup>
            <ControlGroup fill>
                <NumericInput
                    fill
                    placeholder="X Scale"
                    onValueChange={(value) => { element.xScale = value; onInput() }}
                    value={element.xScale}
                />
                <NumericInput
                    fill
                    placeholder="Y Scale"
                    onValueChange={(value) => { element.yScale = value; onInput() }}
                    value={element.yScale}
                />
            </ControlGroup>
            <ControlGroup fill>
                <NumericInput
                    fill
                    placeholder="Rotation"
                    onValueChange={(value) => { element.rotation = value; onInput() }}
                    value={element.rotation}
                />
            </ControlGroup>
        </div>
    );
}
