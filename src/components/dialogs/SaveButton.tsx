import useElement, { setElement, useElements } from "../../hooks/useElement";
import useMap from "../../hooks/useMap";
import AUElement from "../../types/au/AUElement";
import AUElementDB from "../../types/au/AUElementDB";
import LIElement from "../../types/li/LIElement";
import generateGUID from '../../hooks/generateGUID';
import { Button, Classes, Dialog, InputGroup, Menu, MenuItem } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import React from "react";
import LIMapFile from "../../types/li/LIMapFile";

export default function SaveButton() {
    const [map] = useMap();
    const [elements] = useElements(map.elementIDs);

    const onSave = () => {
        const mapData: LIMapFile = {
            id: map.id,
            v: map.v,
            name: map.name,
            description: map.description,
            elements,
        };
        const mapJSON = JSON.stringify(mapData);
        const blob = new Blob([mapJSON], { type: "application/levelimposter.map" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = map.name + ".lim";
        link.click();
    }

    return (
        <>
            <Button
                className={Classes.MINIMAL}
                icon="floppy-disk"
                text="Save"
                onClick={onSave} />
        </>
    );
}