import React from "react";
import { useTranslation } from "react-i18next";
import { useSaveHistory } from "../jotai/useHistory";
import { useSetSaved } from "../jotai/useIsSaved";
import useToaster from "../useToaster";
import useLIDeserializer from "../useLIDeserializer";

/*
const LEGACY_PORTS: Record<string, string> = {
    "util-player": "util-dummy",
    "task-fuel3": "task-fuel2",
    "task-waterwheel2": "task-waterwheel1",
    "task-waterwheel3": "task-waterwheel1",
    "task-align2": "task-align1",
}
*/

export function useOpenMap() {
    const saveHistory = useSaveHistory();
    const { warning, success } = useToaster();
    const { t } = useTranslation();
    const setSaved = useSetSaved();
    const deserializeMap = useLIDeserializer();

    return React.useCallback(() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".lim, .lim2"; // TODO: Add .json
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;
            if (file.name.endsWith(".json")) {
                // TODO: Handle JSON map
            }
            if (file.name.endsWith(".lim")) {
                warning(t("map.converting"));
            }

            deserializeMap(file).then((mapData) => {
                success(t("map.opened", { name: mapData?.name }));
                setSaved(true);
                saveHistory();
                // TODO: Warn if map is too big
            }).catch((err) => {
                // TODO: Handle map error
            });
        }
        input.click();
    }, [deserializeMap, success, t]);
}