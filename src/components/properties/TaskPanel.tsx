import { Divider, H5 } from "@blueprintjs/core";
import React from "react";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import AUElementDB from "../../types/au/AUElementDB";

const URL_PREFIX = "/sprites/";
const URL_SUFFIX = ".png";

export default function TaskPanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [taskName, setTaskName] = React.useState("");

    React.useEffect(() => {
        const auElement = AUElementDB.find((elem) => elem.type === selectedElem?.type);
        setTaskName(auElement ? auElement.name : "");
    }, [selectedElem]);

    if (!selectedElem
        || !selectedElem.type.startsWith("task"))
        return null;

    return (
        <div className="task-panel">
            <H5 style={{ marginTop: 25 }}>Task</H5>
            <Divider />
            <div style={{ textAlign: "center", margin: 15 }}>
                <img
                    style={{ maxHeight: 100, maxWidth: 100 }}
                    src={URL_PREFIX + selectedElem.type + URL_SUFFIX}
                    alt={selectedElem.name}
                />
                <H5 style={{ marginBottom: 3 }}>{taskName}</H5>
                <p className="bp4-text-muted">{selectedElem.type}</p>
            </div>
        </div>
    );
}
