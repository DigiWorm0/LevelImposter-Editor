import { AnchorButton, Classes, NavbarDivider } from "@blueprintjs/core";
import React from "react";
import useMap from "../../hooks/jotai/useMap";
import AUElementDB from "../../types/au/AUElementDB";
import LIElement from "../../types/li/LIElement";
import generateGUID from "../../hooks/generateGUID";
import { useSettingsValue } from "../../hooks/jotai/useSettings";

export default function MagicButton() {
    const settings = useSettingsValue();
    const [map, setMap] = useMap();

    const onClick = React.useCallback(() => {
        const taskTypes = AUElementDB.filter((type) => type.startsWith("task-"));
        const newElements: LIElement[] = taskTypes.map((type, index) => ({
            name: type,
            type,
            id: generateGUID(),
            x: index,
            y: 0,
            z: 0,
            xScale: 1,
            yScale: 1,
            rotation: 0,
            properties: {}
        }));
        setMap({
            ...map,
            elements: newElements
        });
    }, []);

    if (settings.isDevMode !== true)
        return null;
    return (
        <>
            <NavbarDivider />
            <AnchorButton
                className={Classes.MINIMAL}
                icon={"insert"}
                onClick={onClick}
            />
        </>
    );
}