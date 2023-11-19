import { Button } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";
import { useTranslation } from "react-i18next";
import useSaveMap from "../../hooks/useSaveMap";

export default function SaveButton(props: { isButton?: boolean }) {
    const { t } = useTranslation();
    const saveMap = useSaveMap();

    return (
        <>
            <Tooltip2
                content={t("map.save") as string}
                position="bottom"
                fill={props.isButton ?? false}
            >
                <Button
                    minimal={!props.isButton ?? true}
                    fill={props.isButton ?? false}
                    icon="floppy-disk"
                    intent={props.isButton ? "success" : undefined}
                    text={props.isButton ? t("map.save") : undefined}
                    onClick={saveMap}
                    style={{ marginTop: props.isButton ? 5 : 0 }}
                />
            </Tooltip2>
        </>
    );
}