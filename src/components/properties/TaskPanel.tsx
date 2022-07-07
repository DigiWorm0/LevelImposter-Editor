import { Card, ControlGroup, Divider, H2, H4, H5, H6, InputGroup, NumericInput } from "@blueprintjs/core";
import React from "react";
import useElement, { removeElement } from "../../hooks/useElement";
import useKeyboard from "../../hooks/useKeyboard";
import useSelected from "../../hooks/useSelected";
import GUID from "../../types/generic/GUID";

const URL_PREFIX = "/sprites/";
const URL_SUFFIX = ".png";

export default function TaskPanel() {
    const [selectedID, setSelectedID] = useSelected();
    const [element, setElement] = useElement(selectedID);

    if (selectedID === "")
        return null;
    if (!element.type.startsWith("task"))
        return null;

    return (
        <div className="task-panel">
            <H5 style={{ marginTop: 25 }}>Task</H5>
            <Divider />
            <div>
                <img
                    src={URL_PREFIX + element.type + URL_SUFFIX}
                    alt={element.name}
                />
            </div>
        </div>
    );
}
