import { Button, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { clearElements, setElement } from "../../hooks/useElement";
import { setMap } from "../../hooks/useMap";
import LIMapFile from "../../types/li/LIMapFile";

export default function OpenButton() {

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
                const mapData = JSON.parse(reader.result as string) as LIMapFile;

                clearElements();
                mapData.elements.forEach(element => {
                    setElement(element);
                });
                setMap({
                    id: mapData.id,
                    v: mapData.v,
                    name: mapData.name,
                    description: mapData.description,
                    isPublic: mapData.isPublic,
                    elementIDs: mapData.elements.map((elem) => elem.id),
                });
            }
            reader.readAsText(file);
        }
        input.click();
    }

    return (
        <>
            <Tooltip2
                content="Open a LIM File"
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon="document-open"
                    onClick={onOpen} />

            </Tooltip2>
        </>
    );
}