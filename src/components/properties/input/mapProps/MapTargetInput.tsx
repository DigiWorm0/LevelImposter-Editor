import React from "react";
import {useTranslation} from "react-i18next";
import {useMapTarget} from "../../../../hooks/map/useMap";
import {ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select} from "@mui/material";
import {Place} from "@mui/icons-material";
import MapTarget from "../../../../types/li/MapTarget";

export default function MapTargetInput() {
    const {t} = useTranslation();
    const [target, setTarget] = useMapTarget();

    return (
        <ListItem
            dense
            disablePadding
            secondaryAction={
                <Select
                    size={"small"}
                    value={target ?? MapTarget.Game}
                    onChange={(e) => setTarget(e.target.value)}
                    style={{width: 200}}
                    variant={"standard"}
                >
                    <MenuItem value={MapTarget.Game}>{t("map.targetGame")}</MenuItem>
                    <MenuItem value={MapTarget.Lobby}>{t("map.targetLobby")}</MenuItem>
                </Select>
            }
        >
            <ListItemButton>
                <ListItemIcon><Place/></ListItemIcon>
                <ListItemText primary={t("settings.map.mapTarget")}/>
            </ListItemButton>
        </ListItem>
    );
}