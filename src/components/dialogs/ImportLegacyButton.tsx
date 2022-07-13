import { Button, Classes } from "@blueprintjs/core";
import generateGUID from '../../hooks/generateGUID';
import { setColliderEditing } from "../../hooks/useColliderEditing";
import { clearElements, setElement } from "../../hooks/useElement";
import { clearMap, setMap } from "../../hooks/useMap";
import { setSelection } from "../../hooks/useSelected";
import GUID from "../../types/generic/GUID";
import LIElement from "../../types/li/LIElement";
import LILegacyFile from "../../types/li/LILegacyFile";

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
                        xScale: legacyObj.xScale * (legacyObj.flipX ? -1 : 1),
                        yScale: legacyObj.yScale * (legacyObj.flipY ? -1 : 1),
                        rotation: legacyObj.rotation,
                        properties: {
                            spriteData: isCustomObj ? legacyObj.type : undefined,
                            colliders: legacyObj.colliders.map(legacyCollider => {
                                const points = legacyCollider.points;
                                if (legacyCollider.isClosed && points.length > 1)
                                    points.push(points[0]);
                                return {
                                    id: generateGUID(),
                                    blocksLight: legacyCollider.blocksLight,
                                    isSolid: legacyObj.type === "util-room",
                                    points,
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
                    id: "" as GUID,
                    v: 0,
                    name: mapData.name,
                    description: "",
                    isPublic: false,
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