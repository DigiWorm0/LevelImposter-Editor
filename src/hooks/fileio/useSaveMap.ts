import React from "react";
import useLISerializer from "./useLISerializer";
import { useMapValue } from "../map/useMap";
import { useSetSaved } from "./useIsSaved";
import useToaster from "../useToaster";
import { useTranslation } from "react-i18next";

export default function useSaveMap() {
    const { t } = useTranslation();
    const serializeMap = useLISerializer();
    const map = useMapValue();
    const setIsSaved = useSetSaved();
    const { danger } = useToaster();

    return React.useCallback(() => {
        serializeMap(map).then((mapData) => {
            const blob = new Blob([mapData], { type: "application/levelimposter.map" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = map.name + ".lim2";
            link.click();
            URL.revokeObjectURL(url);
            setIsSaved(true);
        }).catch((e) => {
            danger(t("map.errorSave", { error: e.message }) as string);
        });
    }, [map, serializeMap, setIsSaved, danger, t]);
}