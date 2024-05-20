import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import { Close } from "@mui/icons-material";

export interface GenericModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    DialogProps?: Partial<DialogProps>;
    actions?: React.ReactNode;
}

export default function GenericModal(props: GenericModalProps) {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullWidth
            maxWidth="sm"
            scroll={"body"}
            PaperProps={{
                elevation: 1,
            }}
            {...props.DialogProps}
        >
            <DialogTitle>
                {props.title}
            </DialogTitle>
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

            <DialogContent sx={{ paddingTop: 0 }}>
                {props.children}
            </DialogContent>

            {props.actions && (
                <DialogActions>
                    {props.actions}
                </DialogActions>
            )}
        </Dialog>
    )
}