import React from "react";
import { Card, Classes, Icon } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useMapProperties } from "../../../hooks/map/useMap";
import ColorPicker from "../../utils/ColorPicker";
import LIColor from "../../../types/li/LIColor";


export default function MapSkyboxInput() {
    const { t } = useTranslation();
    const [properties, setProperties] = useMapProperties();

    const hexToColor = (hex: string): LIColor => {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return { r, g, b, a: 1 };
    }

    const colorToHex = (color: LIColor): string => {
        const r = Math.round(color.r).toString(16).padStart(2, "0");
        const g = Math.round(color.g).toString(16).padStart(2, "0");
        const b = Math.round(color.b).toString(16).padStart(2, "0");
        return `#${r}${g}${b}`;
    }

    return (
        <Card style={{ justifyContent: "space-between" }}>
            <div>
                <Icon
                    icon={"play"}
                    className={Classes.TEXT_MUTED}
                    style={{ marginRight: 8 }}
                />
                {t("settings.map.skyboxColor")}
            </div>

            <div style={{ maxWidth: 200 }}>
                <ColorPicker
                    disableAlpha
                    title={t("settings.map.setColor") as string}
                    color={hexToColor(properties.bgColor || "#ffffff")}
                    onChange={(color) => {
                        setProperties({ ...properties, bgColor: colorToHex(color) });
                    }}
                    style={{ marginLeft: 10, marginTop: -5, minWidth: 180 }}
                />
            </div>
        </Card>
    )
}