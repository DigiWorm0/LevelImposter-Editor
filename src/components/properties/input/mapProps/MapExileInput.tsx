import React from "react";
import {useTranslation} from "react-i18next";
import {docPropertiesAtom} from "@editor/document/documentStore";
import {Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select} from "@mui/material";
import {ExitToApp} from "@mui/icons-material";
import {EXILE_IDS} from "@/db/AUElementDB";
import {useAtomValue} from "jotai";
import MapTarget from "../../../../types/li/MapTarget";
import {setMapProperty} from "@editor/document/mapPropertyCommands";
import executeCommand from "@editor/history/executeCommand";
import {elementTypeExistsAtomFamily} from "@/hooks/elementTypes/useElementTypeExists";

export default function MapExileInput() {
    const {t} = useTranslation();
    const properties = useAtomValue(docPropertiesAtom);
    const hasEjectCamera = useAtomValue(elementTypeExistsAtomFamily("util-eject"));
    const {mapTarget} = useAtomValue(docPropertiesAtom);

    const currentValue = React.useMemo(() => {
        if (hasEjectCamera)
            return "custom";
        return properties.exileID ?? EXILE_IDS[0];
    }, [properties.exileID, hasEjectCamera]);

    return (
        <Collapse in={mapTarget !== MapTarget.Lobby}>
            <ListItem
                dense
                disablePadding
                secondaryAction={
                    <Select
                        size={"small"}
                        value={currentValue}
                        onChange={e => executeCommand(setMapProperty("exileID", e.target.value))}
                        style={{width: 200}}
                        variant={"standard"}
                        disabled={hasEjectCamera}
                    >
                        {EXILE_IDS.map((exileID) => (
                            <MenuItem key={exileID} value={exileID}>{exileID}</MenuItem>
                        ))}

                        {hasEjectCamera && (
                            <MenuItem value={"custom"}>{t("settings.map.customAnimation")}</MenuItem>
                        )}
                    </Select>
                }
            >
                <ListItemButton>
                    <ListItemIcon><ExitToApp/></ListItemIcon>
                    <ListItemText primary={t("settings.map.defaultExileAnimation")}/>
                </ListItemButton>
            </ListItem>
        </Collapse>
    );
}