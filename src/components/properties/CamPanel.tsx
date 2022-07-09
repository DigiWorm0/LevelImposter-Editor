import { Button, Card, ControlGroup, Divider, FormGroup, H2, H4, H5, H6, InputGroup, MenuItem, NumericInput } from "@blueprintjs/core";
import React from "react";
import useElement, { removeElement, useElements } from "../../hooks/useElement";
import useMap from "../../hooks/useMap";
import useSelected from "../../hooks/useSelected";

const URL_PREFIX = "/sprites/";
const URL_SUFFIX = ".png";

export default function CamPanel() {
    const [map] = useMap();
    const [selectedID, setSelectedID] = useSelected();
    const [element, setElement] = useElement(selectedID);

    if (selectedID === "")
        return null;
    if (element.type !== "util-cam")
        return null;

    return (
        <div className="cam-panel">
            <H5 style={{ marginTop: 25 }}>Camera</H5>
            <Divider />
            <div style={{ textAlign: "center", margin: 15 }}>
                <img
                    style={{ maxHeight: 100, maxWidth: 100 }}
                    src={URL_PREFIX + element.type + URL_SUFFIX}
                    alt={element.name}
                />
            </div>

            <FormGroup label="Offset">
                <ControlGroup fill>
                    <NumericInput
                        fill
                        value={element.properties.camXOffset}
                        onValueChange={(value) => {
                            element.properties.camXOffset = value;
                            setElement(element);
                        }} />
                    <NumericInput
                        fill
                        value={element.properties.camYOffset}
                        onValueChange={(value) => {
                            element.properties.camYOffset = value;
                            setElement(element);
                        }} />
                </ControlGroup>
            </FormGroup>
            <FormGroup label="Zoom">
                <NumericInput
                    fill
                    value={element.properties.camZoom}
                    onValueChange={(value) => {
                        element.properties.camZoom = value;
                        setElement(element);
                    }} />
            </FormGroup>
        </div>
    );
}
