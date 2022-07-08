import useElement, { clearElements, setElement, useElements } from "../../hooks/useElement";
import useMap, { clearMap, setMap } from "../../hooks/useMap";
import AUElement from "../../types/au/AUElement";
import AUElementDB from "../../types/au/AUElementDB";
import LIElement from "../../types/li/LIElement";
import generateGUID from '../../hooks/generateGUID';
import { Button, Classes, Dialog, InputGroup, Menu, MenuItem } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import React from "react";
import LIMapFile from "../../types/li/LIMapFile";
import LILegacyFile from "../../types/li/LILegacyFile";
import GUID from "../../types/generic/GUID";
import { setSelection } from "../../hooks/useSelected";
import { setColliderEditing } from "../../hooks/useColliderEditing";

export default function ImportLegacyButton() {

    const onImport = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.onchange = () => {
            if (input.files === null)
                return;
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const mapData = JSON.parse(reader.result as string) as LILegacyFile;

                // Clear
                clearElements();
                clearMap();
                setSelection("" as GUID);
                setColliderEditing("" as GUID);

                // Import Objects
                const elements: LIElement[] = [];
                mapData.objs.forEach(legacyObj => {
                    const isCustomObj = legacyObj.spriteType == "custom";
                    const element: LIElement = {
                        id: generateGUID(),
                        name: legacyObj.name,
                        type: isCustomObj ? "util-blank" : legacyObj.type,
                        x: legacyObj.x,
                        y: legacyObj.y,
                        z: legacyObj.z,
                        xScale: legacyObj.xScale,
                        yScale: legacyObj.yScale,
                        rotation: legacyObj.rotation,
                        properties: {
                            spriteData: isCustomObj ? legacyObj.type : undefined,
                            colliders: legacyObj.colliders.map(legacyCollider => {
                                return {
                                    id: generateGUID(),
                                    blocksLight: legacyCollider.blocksLight,
                                    isSolid: legacyCollider.isClosed,
                                    points: legacyCollider.points,
                                }
                            })
                        }
                    };
                    elements.push(element);
                    setElement(element);
                });

                // Target IDs
                mapData.objs.forEach(((legacyObj, index) => {
                    const elem = elements[index];

                    const targetIndexes = legacyObj.targetIds.map(id => mapData.objs.findIndex(obj => obj.id == id));
                    const targetElements = targetIndexes.map(index => elements[index]);

                    if (elem.type.startsWith("util-vent")) {
                        elem.properties.leftVent = targetElements[0]?.id;
                        elem.properties.middleVent = targetElements[1]?.id;
                        elem.properties.rightVent = targetElements[2]?.id;
                    }
                }))

                // Set Map
                setMap({
                    id: generateGUID(),
                    v: 0,
                    name: mapData.name,
                    description: "",
                    elementIDs: elements.map(element => element.id)
                });
            }
            reader.readAsText(file);
        }
        input.click();
    }

    return (
        <>
            <Button
                className={Classes.MINIMAL}
                icon="import"
                text="Import Legacy"
                onClick={onImport} />
        </>
    );
}