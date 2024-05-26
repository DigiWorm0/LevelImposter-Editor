import React from "react";
import { useTranslation } from "react-i18next";
import { useMapProperties } from "../../../../hooks/map/useMap";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { EXILE_IDS } from "../../../../types/db/AUElementDB";


export default function MapExileInput() {
    const { t } = useTranslation();
    const [properties, setProperties] = useMapProperties();

    return (
        <ListItem
            disablePadding
            secondaryAction={
                <Select
                    size={"small"}
                    value={properties.exileID}
                    onChange={(e) => setProperties({ ...properties, exileID: e.target.value })}
                    style={{ width: 200 }}
                >
                    {EXILE_IDS.map((exileID) => (
                        <MenuItem key={exileID} value={exileID}>{exileID}</MenuItem>
                    ))}
                </Select>
            }
        >
            <ListItemButton>
                <ListItemIcon><ExitToApp /></ListItemIcon>
                <ListItemText primary={t("settings.map.exileAnim")} />
            </ListItemButton>
        </ListItem>
    );
}