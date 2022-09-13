import { Button, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { DEFAULT_GUID } from "../../hooks/generateGUID";
import { useSetMap } from "../../hooks/jotai/useMap";
import useToaster from "../../hooks/useToaster";
import useTranslation from "../../hooks/useTranslation";
import { MAP_FORMAT_VER } from "../../types/generic/Constants";
import LIMap from "../../types/li/LIMap";

export default function OpenButton() {
    const translation = useTranslation();
    const setMap = useSetMap();
    const toaser = useToaster();

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
                const data = reader.result as string;
                const mapData = JSON.parse(data) as LIMap;
                repairMap(mapData);
                setMap(mapData);

                toaser.success(`Loaded ${mapData.name}`);
                // 50mb limit
                if (data.length > 1024 * 1024 * 50) {
                    toaser.danger("Map is over the 50MB limit for uploads. You may still play locally, but you cannot upload until you remove or compress any custom sprites, gifs, and sounds.");
                } else if (data.length > 1024 * 1024 * 40) {
                    toaser.warning("Map is near the 50MB limit for uploads. It is reccommended you remove or compress any custom sprites, gifs, and sounds.");
                }
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
                content={translation.OpenFile}
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon="folder-open"
                    onClick={onOpen} />

            </Tooltip2>
        </>
    );
}