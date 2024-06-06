import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import useIsTypeVisibleInSearch from "../../../hooks/useSearchQuery";
import useIsTypeDisabledInSearch from "../../../hooks/elements/useIsTypeDisabledInSearch";

export interface AddObjectModalButtonProps {
    type: string;
    onClick: (type: string) => void;
}

export default function AddObjectModalButton(props: AddObjectModalButtonProps) {
    const { t } = useTranslation();
    const isVisible = useIsTypeVisibleInSearch(props.type);
    const isDisabled = useIsTypeDisabledInSearch(props.type);
    const { type, onClick } = props;

    if (!isVisible)
        return null;
    return (
        <ListItem
            key={type}
            disablePadding
        >
            <ListItemButton
                disabled={isDisabled}
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