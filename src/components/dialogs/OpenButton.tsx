import { Button, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useSetMap } from "../../hooks/jotai/useMap";
import LIMap from "../../types/li/LIMap";

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
                setMap(mapData);
            }
            reader.readAsText(file);
        }
        input.click();
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