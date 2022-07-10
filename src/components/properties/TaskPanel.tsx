import { Card, ControlGroup, Divider, H2, H4, H5, H6, InputGroup, NumericInput } from "@blueprintjs/core";
import React from "react";
import useElement, { removeElement } from "../../hooks/useElement";
import useKeyboard from "../../hooks/input/useKeyboard";
import useSelected from "../../hooks/useSelected";
import AUElement from "../../types/au/AUElement";
import AUElementDB from "../../types/au/AUElementDB";
import GUID from "../../types/generic/GUID";

const URL_PREFIX = "/sprites/";
const URL_SUFFIX = ".png";

export default function TaskPanel() {
    const [selectedID, setSelectedID] = useSelected();
    const [element, setElement] = useElement(selectedID);
    const [taskName, setTaskName] = React.useState("");

    React.useEffect(() => {
        if (selectedID === "")
            return;
        const auElement = AUElementDB.find((elem) => elem.type === element.type);
        setTaskName(auElement ? auElement.name : "");
    }, [element]);

    if (selectedID === "")
        return null;
    if (!element.type.startsWith("task"))
        return null;

    return (
        <div className="task-panel">
            <H5 style={{ marginTop: 25 }}>Task</H5>
            <Divider />
            <div style={{ textAlign: "center", margin: 15 }}>
                <img
                    style={{ maxHeight: 100, maxWidth: 100 }}
                    src={URL_PREFIX + element.type + URL_SUFFIX}
                    alt={element.name}
                />
                <H5 style={{ marginBottom: 3 }}>{taskName}</H5>
                <p className="bp4-text-muted">{element.type}</p>
            </div>
        </div>
    );
}
