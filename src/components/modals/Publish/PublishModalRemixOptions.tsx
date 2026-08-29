import useMapRemixOptions from "../../../hooks/map/useMapRemixOptions";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Block, Shuffle} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import React from "react";
import {useAtom} from "jotai";
import {publishRemixIDAtom} from "@editor/firebase/publish/publishStore";

export default function PublishModalRemixOptions() {
    const remixOptions = useMapRemixOptions();
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