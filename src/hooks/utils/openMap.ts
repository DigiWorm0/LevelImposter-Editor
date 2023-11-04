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
    const { danger, warning, success } = useToaster();
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
            if (file.name.endsWith(".lim")) {
                warning(t("map.converting"));
            } else if (file.name.endsWith(".lim2")) {
                // Good
            } else {
                danger(t("map.errorOpen", { error: `Invalid file type (${file.type})` }));
                return;
            }

            deserializeMap(file).then((mapData) => {
                success(t("map.opened", { name: mapData?.name }));
                setSaved(true);
                saveHistory();

                // Warn if the map is too large
                if (file.size > 1024 * 1024 * 50) { // 50 MB
                    danger(t("map.tooLargeError"));
                } else if (file.size > 1024 * 1024 * 40) { // 40 MB
                    warning(t("map.tooLargeWarn"));
                }
            }).catch((err) => {
                danger(t("map.errorOpen", { error: err }));
            });
        }
        input.click();
    }, [deserializeMap, success, t]);
}