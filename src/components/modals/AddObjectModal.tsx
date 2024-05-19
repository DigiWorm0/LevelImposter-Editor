import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from '../../utils/generateGUID';
import { useSetSelectedColliderID } from "../../hooks/map/elements/useSelectedCollider";
import { useSetSelectedElemID } from "../../hooks/map/elements/useSelectedElem";
import useHiddenTypes from "../../hooks/map/elements/useSingleTypes";
import {
    Dialog,
    DialogContent,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField
} from "@mui/material";
import { Close } from "@mui/icons-material";
import AUElementDB from "../../types/db/AUElementDB";
import useAddElementAtMouse from "../../hooks/map/elements/useAddElementAtMouse";

// Modal Props
export interface AddObjectModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function AddObjectModal(props: AddObjectModalProps) {
    const { t } = useTranslation();
    const addElement = useAddElementAtMouse();
    const setSelectedID = useSetSelectedElemID();
    const setColliderID = useSetSelectedColliderID();
    const hiddenTypes = useHiddenTypes();

    // Handle when an element is clicked
    const onClick = React.useCallback((type: string) => {
        const id = generateGUID();
        addElement({
            id,
            name: t(`au.${type}`) || type,
            type,
            x: 0,
            y: 0,
            z: 0,
            xScale: 1,
            yScale: 1,
            rotation: 0,
            properties: {}
        });
        props.onClose();
        setSelectedID(id);
        setColliderID(undefined);
    }, [addElement, props.onClose, setSelectedID, setColliderID, t]);

    /*
    return (
        <AUElementOmnibar
            inputProps={{
                placeholder: t("object.search") || "Search..."
            }}
            isOpen={props.isVisible}
            onClose={props.onClose}
            items={AUElementDB.map((elem) => ({
                name: t(`au.${elem}`) as string,
                type: elem
            }))}
            onItemSelect={onClick}
            className={isDarkMode ? "bp5-dark" : ""}
            itemRenderer={(elem, props) => (
                <MenuItem
                    key={elem.type}
                    text={elem.name}
                    label={elem.type}
                    icon={(
                        <div style={{ width: 20, textAlign: "center" }}>
                            <img
                                alt={elem.type}
                                src={"/sprites/" + elem.type + ".png"}
                                style={{ maxWidth: 20, maxHeight: 20 }}
                            />
                        </div>
                    )}
                    active={props.modifiers.active}
                    disabled={props.modifiers.disabled || hiddenTypes.includes(elem.type)}
                    onClick={props.handleClick}
                    onFocus={props.handleFocus}
                />
            )}
            itemPredicate={(query, elem) =>
                elem.name.toLowerCase().includes(query.toLowerCase()) ||
                elem.type.toLowerCase().includes(query.toLowerCase())
            }
            initialContent={undefined}
            createNewItemPosition="first"
            createNewItemFromQuery={(query) => ({
                name: query,
                type: "util-blank"
            })}
            createNewItemRenderer={(query, isActive, onClick) => (
                <MenuItem
                    icon="add"
                    text={t("object.create", { name: query })}
                    label={"util-blank"}
                    active={isActive}
                    onClick={onClick}
                />
            )}
        />
    );
     */

    return (
        <Dialog
            open={props.isVisible}
            onClose={props.onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                elevation: 1,
            }}
        >
            <TextField
                variant="outlined"
                fullWidth
                autoFocus
            />
            <IconButton
                onClick={props.onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8
                }}
            >
                <Close />
            </IconButton>

            <DialogContent>
                <List dense>
                    {AUElementDB.map((type) => (
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
                                    secondary={type}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    )
}