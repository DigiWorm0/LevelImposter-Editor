import useElement, { removeAllElements, setElement, useElements } from "../../hooks/useElement";
import useMap, { setMap } from "../../hooks/useMap";
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

                const elementIDs: GUID[] = [];
                removeAllElements();
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
                    elementIDs.push(element.id);
                    setElement(element);
                });
                setMap({
                    id: generateGUID(),
                    v: 0,
                    name: mapData.name,
                    description: "",
                    elementIDs
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