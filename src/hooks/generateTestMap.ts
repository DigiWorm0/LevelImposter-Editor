import React from "react";
import LIMap from "../types/li/LIMap";
import generateGUID from "./generateGUID";
import useMap from "./jotai/useMap";
import LIElement from "../types/li/LIElement";
import AUElementDB from "../types/au/AUElementDB";
import { useTranslation } from "react-i18next";

const TEST_PATTERN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mlYpUOthBxCFDdbIgKuIorVgEC6Wt0KqDyaV/0KQhSXFxFFwLDv4sVh1cnHV1cBUEwR8QVxcnRRcp8buk0CLGO457eO97X+6+A4RWjalmYBJQNcvIJONivrAqBl8RQBBhmiGJmXoqu5iD5/i6h4/vdzGe5V335xhUiiYDfCLxPNMNi3iDeHbT0jnvE0dYRVKIz4knDLog8SPXZZffOJcdFnhmxMhlEsQRYrHcw3IPs4qhEs8QRxVVo3wh77LCeYuzWmuwzj35C0NFbSXLdVqjSGIJKaQhQkYDVdRgIUa7RoqJDJ3HPfwjjj9NLplcVTByLKAOFZLjB/+D3701S9NTblIoDvS92PbHGBDcBdpN2/4+tu32CeB/Bq60rr/eAuY+SW92tegREN4GLq67mrwHXO4Aw0+6ZEiO5KcllErA+xl9UwEYugUG1ty+dc5x+gDkqFfLN8DBITBepux1j3f39/bt35pO/34AFkpyglZSHr4AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfnBAcPECWlWJ7IAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAKFJREFUeNrt27ERACAMA7GY/XcOK0DnQj+BT5c22d3pK0nhqjOCBQsWLFiwBAsWLFiwYAkWLFiwYMESLFiwYMGCJViwYMGCBUuwYMGCBQuWYMGCBQsWLMGCBQsWLFh6Lp2zOv9rXRYsWLBgwRIsWLBgwYIlWLBgwYIFS7BgwYIFC5ZgwYIFCxYswYIFCxYsWIIFCxYsWLAECxYsWLBgCdZHF+XGBsRB/hmfAAAAAElFTkSuQmCC";

const TASK_TYPES = AUElementDB.filter((type) => type.startsWith("task-"));
const UTIL_TYPES = AUElementDB.filter((type) => type.startsWith("util-"));
const SAB_TYPES = AUElementDB.filter((type) => type.startsWith("sab-"));
const ROOM_TYPES = AUElementDB.filter((type) => type.startsWith("room-"));
const DEC_TYPES = AUElementDB.filter((type) => type.startsWith("dec-"));

const CONSOLE_SPACING = 2;
const ROOM_SPACING = 15;
const DEC_SPACING = 2;

export default function useTestMapGenerator() {
    const [map, setMap] = useMap();
    const { t } = useTranslation();

    const generateMap = React.useCallback(() => {
        const elemList: LIElement[] = [];
        const addElement = (type: string, x: number, y: number, z?: number) => {
            elemList.push({
                id: generateGUID(),
                name: t(`au.${type}`),
                type,
                x,
                y,
                z: z ?? 0,
                xScale: 1,
                yScale: 1,
                rotation: 0,
                properties: {}
            });
        };
        TASK_TYPES.forEach((type, index) => {
            addElement(type, index * CONSOLE_SPACING, 0);
        });
        UTIL_TYPES.forEach((type, index) => {
            addElement(type, index * CONSOLE_SPACING, 4);
        });
        SAB_TYPES.forEach((type, index) => {
            addElement(type, index * CONSOLE_SPACING, 8);
        });
        DEC_TYPES.forEach((type, index) => {
            addElement(type, index * DEC_SPACING, 12);
        });
        ROOM_TYPES.forEach((type, index) => {
            addElement(type, index * ROOM_SPACING, 20, 5);
        });

        setMap({
            ...map,
            name: "Test Map",
            description: `Test map generated at ${new Date().toLocaleString()}`,
            elements: elemList,
        });
    }, [map, setMap]);

    return generateMap;
}