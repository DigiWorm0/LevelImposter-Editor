import useElement, { clearElements, setElement, useElements } from "../../hooks/useElement";
import useMap, { setMap } from "../../hooks/useMap";
import AUElement from "../../types/au/AUElement";
import AUElementDB from "../../types/au/AUElementDB";
import LIElement from "../../types/li/LIElement";
import generateGUID from '../../hooks/generateGUID';
import { Button, Classes, Dialog, InputGroup, Menu, MenuItem } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import React from "react";
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
                    elementIDs: mapData.elements.map((elem) => elem.id),
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
                icon="document-open"
                text="Open"
                onClick={onOpen} />
        </>
    );
}