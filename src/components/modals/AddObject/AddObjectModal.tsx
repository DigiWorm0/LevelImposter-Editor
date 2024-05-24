import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from '../../../utils/generateGUID';
import { useSetSelectedColliderID } from "../../../hooks/map/elements/colliders/useSelectedCollider";
import { useSetSelectedElemID } from "../../../hooks/map/elements/useSelectedElem";
import useHiddenTypes from "../../../hooks/map/elements/useSingleTypes";
import { Dialog, DialogContent, IconButton, InputAdornment, List, ListSubheader, TextField } from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import useAddElementAtMouse from "../../../hooks/map/elements/useAddElementAtMouse";
import AddObjectModalButton from "./AddObjectModalButton";
import AUElementDB from "../../../types/db/AUElementDB";
import { grey } from "@mui/material/colors";

// Modal Props
export interface AddObjectModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const TYPE_CATEGORIES = [
    { type: "util-", name: "Utility" },
    { type: "task-", name: "Task" },
    { type: "sab-", name: "Sabotage" },
    { type: "dec-", name: "Decoration" },
    { type: "room-", name: "Room" },
]

export default function AddObjectModal(props: AddObjectModalProps) {
    const { t } = useTranslation();
    const addElement = useAddElementAtMouse();
    const setSelectedID = useSetSelectedElemID();
    const setColliderID = useSetSelectedColliderID();
    const hiddenTypes = useHiddenTypes();
    const [searchQuery, setSearchQuery] = React.useState("");

    const filteredTypes = React.useMemo(() => {
        if (searchQuery.length === 0)
            return AUElementDB;

        const upperCaseQuery = searchQuery.toUpperCase();

        return AUElementDB.filter(type =>
            type.toUpperCase().includes(upperCaseQuery) ||
            t(`au.${type}`).toUpperCase().includes(upperCaseQuery));
    }, [searchQuery]);

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

    return (
        <Dialog
            open={props.isVisible}
            onClose={props.onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{ elevation: 1 }}
        >
            <TextField
                variant="outlined"
                fullWidth
                autoFocus
                placeholder={t("object.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: <InputAdornment position={"start"}><Search /></InputAdornment>
                }}
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

            <DialogContent sx={{ padding: 0 }}>
                <List dense sx={{ paddingTop: 0 }}>
                    {TYPE_CATEGORIES.map((category) => {
                        const types = filteredTypes.filter(type => type.startsWith(category.type));

                        if (types.length === 0)
                            return null;
                        return (
                            <div key={category.type}>
                                <ListSubheader
                                    sx={{
                                        backgroundColor: grey[900],
                                    }}
                                >
                                    {category.name}
                                </ListSubheader>
                                {types.map((type) => (
                                    <AddObjectModalButton
                                        key={`add-object-${type}`}
                                        type={type}
                                        onClick={onClick}
                                        hiddenTypes={hiddenTypes}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </List>
            </DialogContent>
        </Dialog>
    )
}