import React from "react";
import {useTranslation} from "react-i18next";
import {allElementsAtom, mapPropsAtom, mapTargetAtom} from "@editor/state/documentStore";
import {Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select} from "@mui/material";
import {ExitToApp} from "@mui/icons-material";
import {EXILE_IDS} from "@/db/AUElementDB";
import {atom, useAtom, useAtomValue} from "jotai";
import MapTarget from "../../../../types/li/MapTarget";

const hasEjectCameraAtom = atom((get) => {
    const allElements = get(allElementsAtom);
    return allElements.some((element) => element.type === "util-eject");
});

export default function MapExileInput() {
    const {t} = useTranslation();
    const [properties, setProperties] = useAtom(mapPropsAtom);
    const hasEjectCamera = useAtomValue(hasEjectCameraAtom);
    const [mapTarget] = useAtom(mapTargetAtom);

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
                        onChange={(e) => setProperties({...properties, exileID: e.target.value})}
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