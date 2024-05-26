import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface AddObjectModalButtonProps {
    type: string;
    onClick: (type: string) => void;
    hiddenTypes: string[];
}

export default function AddObjectModalButton(props: AddObjectModalButtonProps) {
    const { t } = useTranslation();
    const { type, onClick, hiddenTypes } = props;

    return (
        <ListItem
            key={type}
            disablePadding
        >
            <ListItemButton
                disabled={hiddenTypes.includes(type)}
                onClick={() => onClick(type)}
            >
                <ListItemIcon>
                    <img
                        alt={type}
                        src={`/sprites/${type}.png`}
                        style={{ maxWidth: 20, maxHeight: 20 }}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={t(`au.${type}`) || type}
                />
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {type}
                </Typography>
            </ListItemButton>
        </ListItem>
    );
}