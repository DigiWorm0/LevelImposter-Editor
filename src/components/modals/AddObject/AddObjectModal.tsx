import {Close} from "@mui/icons-material";
import {Box, Dialog, DialogContent, Divider, IconButton, List} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import {useSetSelectedColliderID} from "../../../hooks/elements/colliders/useSelectedCollider";
import useAddElementAtCamera from "../../../hooks/elements/useAddElementAtCamera";
import {useSetSelectedElemID} from "../../../hooks/elements/useSelectedElem";
import generateGUID from "../../../utils/strings/generateGUID";
import AddObjectModalButton from "./AddObjectModalButton";
import AddObjectModalSearch from "./AddObjectModalSearch";
import {Virtuoso} from "react-virtuoso";
import AUElementDB from "../../../db/AUElementDB";

// Modal Props
export interface AddObjectModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function AddObjectModal(props: AddObjectModalProps) {
    const {t} = useTranslation();
    const addElement = useAddElementAtCamera();
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
            PaperProps={{elevation: 1}}
        >
            <AddObjectModalSearch/>
            <IconButton
                onClick={props.onClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8
                }}
            >
                <Close/>
            </IconButton>

            <DialogContent sx={{padding: 0}}>
                <List dense sx={{paddingTop: 0}}>
                    <Box sx={{paddingTop: 1, paddingBottom: 1}}>
                        <AddObjectModalButton
                            key={"add-new-object"}
                            type={"util-blank"}
                            onClick={onClick}
                            alwaysVisible
                        />
                    </Box>

                    <Divider/>

                    <Virtuoso
                        totalCount={AUElementDB.length}
                        itemContent={(index) => (
                            <AddObjectModalButton
                                key={AUElementDB[index]}
                                type={AUElementDB[index]}
                                onClick={onClick}
                            />
                        )}
                        style={{height: 500}}
                    />
                </List>
            </DialogContent>
        </Dialog>
    );
}