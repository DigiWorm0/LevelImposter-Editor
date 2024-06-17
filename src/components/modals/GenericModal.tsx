import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import { Close } from "@mui/icons-material";

export interface GenericModalProps {
    open: boolean;
    onClose?: () => void;
    title?: string;
    children: React.ReactNode;
    DialogProps?: Partial<DialogProps>;
    DialogContentProps?: Partial<DialogProps>;
    actions?: React.ReactNode;
    preventClose?: boolean;
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
            disableEscapeKeyDown={props.preventClose}
            {...props.DialogProps}
        >
            <DialogTitle>
                {props.title}
            </DialogTitle>
            {!props.preventClose && (
                <IconButton
                    onClick={props.onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8
                    }}
                >
                    <Close />
                </IconButton>
            )}

            <DialogContent
                sx={{ paddingTop: 0 }}
                {...props.DialogContentProps}
            >
                {props.children}
            </DialogContent>

            {props.actions && (
                <DialogActions>
                    {props.actions}
                </DialogActions>
            )}
        </Dialog>
    );
}