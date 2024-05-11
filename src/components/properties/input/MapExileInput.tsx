import React from "react";
import { Button, Card, Classes, Icon, MenuItem } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { ItemRenderer, Select } from "@blueprintjs/select";
import { useMapProperties } from "../../../hooks/map/useMap";
import { EXILE_IDS } from "../../../types/db/AUElementDB";


export default function MapExileInput() {
    const { t } = useTranslation();
    const [properties, setProperties] = useMapProperties();

    // Item Renderer
    const exileSelectRenderer: ItemRenderer<string> = (exileID, props) => (
        <MenuItem
            key={exileID}
            text={exileID}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus}
        />
    );

    return (
        <Card style={{ justifyContent: "space-between" }}>
            <div>
                <Icon
                    icon={"play"}
                    className={Classes.TEXT_MUTED}
                    style={{ marginRight: 8 }}
                />
                {t("settings.map.exileAnim")}
            </div>

            <div style={{ maxWidth: 200 }}>
                <Select<string>
                    filterable={false}
                    items={EXILE_IDS}
                    itemRenderer={exileSelectRenderer}
                    onItemSelect={(exileID) => {
                        setProperties({ ...properties, exileID });
                    }}
                    popoverProps={{ minimal: true }}
                >

                    <Button
                        rightIcon="caret-down"
                        text={properties.exileID || t("settings.map.setAnim") as string}
                        style={{ marginLeft: 10, marginTop: -5, width: 180 }}
                    />
                </Select>
            </div>
        </Card>
    )
}