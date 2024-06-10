import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton, List } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSetSelectedColliderID } from "../../../hooks/elements/colliders/useSelectedCollider";
import useAddElementAtMouse from "../../../hooks/elements/useAddElementAtMouse";
import { useSetSelectedElemID } from "../../../hooks/elements/useSelectedElem";
import generateGUID from '../../../utils/strings/generateGUID';
import AddObjectModalButton from "./AddObjectModalButton";
import AddObjectModalCategory from "./AddObjectModalCategory";
import AddObjectModalSearch from "./AddObjectModalSearch";

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
            <AddObjectModalSearch />
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
                    <AddObjectModalButton
                        key={`add-new-object`}
                        type={"util-blank"}
                        onClick={onClick}
                    />

                    {TYPE_CATEGORIES.map((category) =>
                        <AddObjectModalCategory
                            key={category.name}
                            name={category.name}
                            typeFilter={category.type}
                            onClick={onClick}
                        />
                    )}
                </List>
            </DialogContent>
        </Dialog>
    )
}