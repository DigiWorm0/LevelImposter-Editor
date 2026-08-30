import {Close} from "@mui/icons-material";
import {Box, Dialog, DialogContent, Divider, IconButton, List} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import generateGUID from "../../../utils/strings/generateGUID";
import AddObjectModalButton from "./AddObjectModalButton";
import AddObjectModalSearch from "./AddObjectModalSearch";
import AUElementDB from "../../../db/AUElementDB";
import executeCommand from "../../../editor/history/executeCommand";
import {createElementAtCamera} from "@editor/elements/createElement";

// Modal Props
export interface AddObjectModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function AddObjectModal(props: AddObjectModalProps) {
    const {t} = useTranslation();

    // Handle when an element is clicked
    const onClick = React.useCallback((type: string) => {
        executeCommand(createElementAtCamera({
            id: generateGUID(),
            name: t(`au.${type}`) || type,
            type,
            x: 0,
            y: 0,
            z: 0,
            xScale: 1,
            yScale: 1,
            rotation: 0,
            childrenIDs: [],
            properties: {}
        }));
        props.onClose();
    }, [props.onClose, t]);

    return (
        <Dialog
            disableRestoreFocus
            open={props.isVisible}
            onClose={props.onClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    elevation: 1,
                }
            }}
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

                    {AUElementDB.map(type => (
                        <AddObjectModalButton
                            key={type}
                            type={type}
                            onClick={onClick}
                        />
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
}