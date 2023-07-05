import { Button } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSetSaved } from "../../hooks/jotai/useIsSaved";
import { useMapValue } from "../../hooks/jotai/useMap";
import useToaster from "../../hooks/useToaster";

export default function SaveButton(props: { isButton?: boolean }) {
    const { t } = useTranslation();
    const map = useMapValue();
    const { danger } = useToaster();
    const setIsSaved = useSetSaved();

    const onSave = React.useCallback(() => {
        try {
            const mapJSON = JSON.stringify(map);
            const blob = new Blob([mapJSON], { type: "application/levelimposter.map" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = map.name + ".lim";
            link.click();
            setIsSaved(true);
        }
        catch (e: any) {
            danger(t("map.errorSave", { error: e.message }) as string);
        }
    }, [map]);

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
                    onClick={onSave}
                    style={{ marginTop: props.isButton ? 5 : 0 }}
                />
            </Tooltip2>
        </>
    );
}