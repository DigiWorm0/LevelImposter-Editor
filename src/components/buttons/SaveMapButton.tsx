import { Button, Tooltip } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSaveMap from "../../hooks/fileio/useSaveMap";

export default function SaveMapButton() {
    const { t } = useTranslation();
    const saveMap = useSaveMap();

    return (
        <Tooltip
            content={t("map.save") as string}
            position="bottom"
        >
            <Button
                minimal
                icon="floppy-disk"
                onClick={saveMap}
            />
        </Tooltip>
    );
}