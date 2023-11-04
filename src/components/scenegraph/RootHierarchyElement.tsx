import { InputGroup } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import React from "react";
import useElement, { useDraggingElementID } from "../../hooks/jotai/useElements";
import { useMapName } from "../../hooks/jotai/useMap";
import { useSelectedElemID } from "../../hooks/jotai/useSelectedElem";

export default function RootHierarchyElement() {
    const [mapName, setMapName] = useMapName();
    const [isEditingName, setIsEditingName] = React.useState(false);
    const [draggingID, setDraggingID] = useDraggingElementID();
    const [selectedID, setSelectedID] = useSelectedElemID();
    const [draggingElement, setDraggingElement] = useElement(draggingID);
    const [isDragOver, setDragOver] = React.useState(false);

    return (
        <>
            <MenuItem2
                style={{ outline: 0 }}
                intent={"warning"}
                icon={"map"}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                    e.stopPropagation();
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    e.stopPropagation();
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    //const data = e.dataTransfer.getData("text/plain");
                    if (!(draggingElement === undefined)) {
                        setDraggingElement({ ...draggingElement, parentID: undefined });
                    }
                    setDragOver(false);
                    setDraggingID(undefined);
                    e.stopPropagation();
                }}
                text={isEditingName ?
                    <InputGroup
                        small
                        autoFocus
                        value={mapName}
                        maxLength={20}
                        onChange={(e) => {
                            setMapName(e.target.value);
                        }}
                        onFocus={(e) => {
                            e.target.select();
                        }}
                        onBlur={() => setIsEditingName(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setIsEditingName(false);
                            }
                        }}
                    />
                    :
                    mapName
                }
                active={isDragOver}
                onClick={() => setSelectedID(undefined)}
                onDoubleClick={() => {
                    setIsEditingName(true);
                }}
            />
        </>
    );
}