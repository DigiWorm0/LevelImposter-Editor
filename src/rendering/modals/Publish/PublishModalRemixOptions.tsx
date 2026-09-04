import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Block, Shuffle} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import React from "react";
import {atom, useAtom, useAtomValue} from "jotai";
import {currentUserAtom, publishRemixIDAtom} from "@editor/firebase/publish/publishStore";
import {docPropertiesAtom} from "@editor/document/documentStore";
import GUID from "@shared/types/GUID";
import {mapInfoFromIDAtomFamily} from "@editor/firebase/getMapInfoFromID";
import {unwrap} from "jotai/utils";

export default function PublishModalRemixOptions() {
    const remixOptions = useAtomValue(unwrap(mapRemixOptionsAtom));
    const [remixID, setRemixID] = useAtom(publishRemixIDAtom);
    const {t} = useTranslation();

    if (!remixOptions || remixOptions.length === 0)
        return null;

    return (
        <List dense>
            <ListItem disablePadding>
                <ListItemButton
                    onClick={() => setRemixID(null)}
                    selected={remixID === null}
                >
                    <ListItemIcon>
                        <Block/>
                    </ListItemIcon>
                    <ListItemText
                        sx={{ms: 2}}
                        primary={t("publish.notARemix")}
                    />
                </ListItemButton>
            </ListItem>

            {remixOptions.map(option => (
                <ListItem
                    key={option.id}
                    disablePadding
                >
                    <ListItemButton
                        onClick={() => setRemixID(option.id)}
                        selected={remixID === option.id}
                    >
                        <ListItemIcon>
                            <Shuffle/>
                        </ListItemIcon>
                        <ListItemText
                            sx={{ms: 2}}
                            primary={option.name}
                            secondary={option.authorName}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}

const mapRemixOptionsAtom = atom((get) => {
    const docProperties = get(docPropertiesAtom);
    const userID = get(currentUserAtom)?.uid;
    let mapIDs: GUID[] = [];

    // If I'm not the owner, remix this map
    if (docProperties.id &&
        docProperties.authorID !== userID)
        mapIDs.push(docProperties.id);

    // If this map is a remix, remix the original map
    if (docProperties.remixOf)
        mapIDs.push(docProperties.remixOf);

    mapIDs = mapIDs.filter((id, i) => mapIDs.indexOf(id) === i);

    const maps = mapIDs.map(id => get(mapInfoFromIDAtomFamily(id as string)));
    return Promise.all(maps);
});