import { Button, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { DEFAULT_GUID } from "../../hooks/generateGUID";
import { useSetMap } from "../../hooks/jotai/useMap";
import LIMap from "../../types/li/LIMap";
import { MAP_FORMAT_VER } from "../../types/li/LIMetadata";

export default function OpenButton() {
    const setMap = useSetMap();

    const onOpen = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".lim,application/levelimposter.map";
        input.onchange = () => {
            if (input.files === null)
                return;
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const mapData = JSON.parse(reader.result as string) as LIMap;
                repairMap(mapData);
                setMap(mapData);
            }
            reader.readAsText(file);
        }
        input.click();
    }

    // Replace as needed for future map formats \/\/\/
    const repairMap = (map: LIMap) => {
        map.v = MAP_FORMAT_VER;
        map.id = map.id || DEFAULT_GUID;
        map.name = map.name || "";
        map.description = map.description || "";
        map.isPublic = map.isPublic || false;
        map.isVerified = map.isVerified || false;
        map.authorName = map.authorName || "";
        map.authorID = map.authorID || "";
        map.createdAt = map.createdAt || -1;
        map.elements = map.elements || [];
        map.properties = map.properties || {};
    }

    return (
        <>
            <Tooltip2
                content="Open an LIM file"
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon="folder-open"
                    onClick={onOpen} />

            </Tooltip2>
        </>
    );
}