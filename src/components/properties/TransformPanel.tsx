import { Button, ButtonGroup, ControlGroup, Divider, H5, InputGroup, NumericInput } from "@blueprintjs/core";
import React from "react";
import { useRemoveElement } from "../../hooks/jotai/useElement";
import useSelectedElem, { useSelectedElemIDValue, useSetSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import GUID from "../../types/generic/GUID";

export default function TransformPanel() {
    const setSelectedID = useSetSelectedElemID();
    const removeElement = useRemoveElement();
    const selectedElemID = useSelectedElemIDValue();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [name, setName] = React.useState("");
    const [x, setX] = React.useState("");
    const [y, setY] = React.useState("");
    const [z, setZ] = React.useState("");
    const [xScale, setXScale] = React.useState("");
    const [yScale, setYScale] = React.useState("");
    const [rotation, setRotation] = React.useState("");

    React.useEffect(() => {
        if (!selectedElem)
            return;
        setName(selectedElem.name);
        setX(selectedElem.x.toString());
        setY(selectedElem.y.toString());
        setZ(selectedElem.z.toString());
        setXScale(selectedElem.xScale.toString());
        setYScale(selectedElem.yScale.toString());
        setRotation(selectedElem.rotation.toString());
    }, [selectedElem]);

    if (!selectedElem)
        return null;

    return (
        <div className="transform-panel">
            <H5>Properties</H5>
            <Divider />
            <InputGroup
                placeholder="Name"
                large
                onChange={(e) => { setName(e.target.value); setSelectedElem({ ...selectedElem, name: e.target.value }); }}
                value={name}
            />
            <ControlGroup fill style={{ marginTop: 15 }}>
                <NumericInput
                    fill
                    placeholder="X"
                    onValueChange={(numVal, strVal) => {
                        setX(strVal); (!isNaN(numVal) && strVal != "") && setSelectedElem({ ...selectedElem, x: numVal });
                    }}
                    minorStepSize={0.001}
                    value={x}
                />
                <NumericInput
                    fill
                    placeholder="Y"
                    onValueChange={(numVal, strVal) => { setY(strVal); (!isNaN(numVal) && strVal != "") && setSelectedElem({ ...selectedElem, y: numVal }); }}
                    minorStepSize={0.001}
                    value={y}
                />
                <NumericInput
                    fill
                    placeholder="Z"
                    onValueChange={(numVal, strVal) => { setZ(strVal); (!isNaN(numVal) && strVal != "") && setSelectedElem({ ...selectedElem, z: numVal }); }}
                    minorStepSize={0.001}
                    value={z}
                />
            </ControlGroup>
            <ControlGroup fill>
                <NumericInput
                    fill
                    placeholder="X Scale"
                    onValueChange={(numVal, strVal) => { setXScale(strVal); (!isNaN(numVal) && strVal != "") && setSelectedElem({ ...selectedElem, xScale: numVal }); }}
                    minorStepSize={0.001}
                    value={xScale}
                />
                <NumericInput
                    fill
                    placeholder="Y Scale"
                    onValueChange={(numVal, strVal) => { setYScale(strVal); (!isNaN(numVal) && strVal != "") && setSelectedElem({ ...selectedElem, yScale: numVal }); }}
                    minorStepSize={0.001}
                    value={yScale}
                />
            </ControlGroup>
            <ControlGroup fill>
                <NumericInput
                    fill
                    placeholder="Rotation"
                    onValueChange={(numVal, strVal) => { setRotation(strVal); (!isNaN(numVal) && strVal != "") && setSelectedElem({ ...selectedElem, rotation: numVal }); }}
                    minorStepSize={0.001}
                    value={rotation}
                />
            </ControlGroup>
            <ButtonGroup minimal style={{ marginTop: 10 }} fill>
                <Button
                    fill
                    icon={selectedElem.properties.isLocked ? "lock" : "unlock"}
                    text={selectedElem.properties.isLocked ? "Unlock" : "Lock"}
                    onClick={() => { setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, isLocked: !selectedElem.properties.isLocked } }); }}
                />
                <Button
                    fill
                    icon="trash"
                    text="Remove"
                    onClick={() => { removeElement(selectedElem.id); setSelectedID("" as GUID) }}
                />
            </ButtonGroup>
        </div>
    );
}
