import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import React from "react";
import { useTranslation } from "react-i18next";
import GUID, { MaybeGUID } from "../../types/generic/GUID";
import LIClipboard from "../../types/li/LIClipboard";
import LIElement from "../../types/li/LIElement";
import generateGUID from "../generateGUID";
import useToaster from "../useToaster";
import { useAddElement } from "./useElements";
import { useMapValue } from "./useMap";
import { useSelectedElemValue, useSetSelectedElemID } from "./useSelectedElem";

const clipboardAtom = atomWithStorage<string | undefined>("clipboard", undefined);

export default function useClipboard() {
    const map = useMapValue();
    const addElement = useAddElement();
    const toaster = useToaster();
    const selectedElem = useSelectedElemValue();
    const setSelectedID = useSetSelectedElemID();
    const { t } = useTranslation();
    const [localClipboard, setLocalClipboard] = useAtom(clipboardAtom);
    const [canCopy, setCanCopy] = React.useState(false);
    const [canPaste, setCanPaste] = React.useState(false);

    React.useEffect(() => {
        setCanCopy(!!selectedElem);
        setCanPaste(!!localClipboard);
    }, [selectedElem, localClipboard]);

    const copyElement = React.useCallback(() => {
        if (!selectedElem)
            return;
        const clipboardData: LIClipboard = {
            data: [selectedElem]
        };

        const addChildren = (elem: LIElement) => {
            map.elements.forEach(e => {
                if (e.parentID === elem.id) {
                    clipboardData.data.push(e);
                    addChildren(e);
                }
            });
        };
        addChildren(selectedElem);

        const clipboardJSON = JSON.stringify(clipboardData);
        setLocalClipboard(clipboardJSON);
        if (navigator.clipboard.writeText)
            navigator.clipboard.writeText(clipboardJSON);
    }, [selectedElem, map, setLocalClipboard]);

    const pasteElement = React.useCallback(async () => {
        let clipboard = localClipboard;
        if (!clipboard) {
            if (!window.isSecureContext) {
                toaster.danger(t("edit.errorInsecureContext"));
                return;
            }
            if (!navigator.clipboard.read) {
                toaster.danger(t("edit.errorExternalClipboard"), "https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read");
                return;
            }
            clipboard = await navigator.clipboard.readText();
        }
        if (!clipboard) {
            toaster.danger(t("edit.errorNoClipboard"));
            return;
        }
        const clipboardData = JSON.parse(clipboard) as LIClipboard | undefined;
        if (clipboardData) {
            const elements = clipboardData.data as LIElement[];
            const newIDs = new Map<GUID, GUID>();
            const getID = (id: MaybeGUID) => {
                if (id === undefined)
                    return undefined;
                if (newIDs.has(id))
                    return newIDs.get(id);
                if (elements.find(e => e.id === id)) {
                    const newID = generateGUID();
                    newIDs.set(id, newID);
                    return newID;
                }
                return id;
            };

            elements.forEach((elem, index) => {
                const newID = generateGUID();
                const newName = elem.name + " (copy)";
                newIDs.set(elem.id, newID);
                addElement({
                    ...elem,
                    id: newID,
                    name: newName,
                    x: elem.x + 1,
                    parentID: getID(elem.parentID),
                    properties: {
                        ...elem.properties,
                        parent: getID(elem.properties.parent),
                        leftVent: getID(elem.properties.leftVent),
                        rightVent: getID(elem.properties.rightVent),
                        middleVent: getID(elem.properties.middleVent),
                        teleporter: getID(elem.properties.teleporter),

                        colliders: [
                            ...(elem.properties.colliders || []),
                        ]
                    }
                });
                if (index == 0)
                    setSelectedID(newID);
            });
        }
    }, [localClipboard, toaster]);

    return {
        copyElement,
        pasteElement,
        canCopy,
        canPaste
    };
}