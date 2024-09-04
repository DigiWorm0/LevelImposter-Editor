import React from "react";
import {DialogContentText, LinearProgress, Typography} from "@mui/material";
import GenericModal from "./GenericModal";

export interface ProcessModalProps {
    title: string;
    description?: string;
    isRunning: boolean;
    progress: number;
    progressText?: string;
}

export default function ProcessModal(props: ProcessModalProps) {
    return (
        <GenericModal
            open={props.isRunning}
            title={props.title}
            preventClose
        >
            <DialogContentText>
                {props.description}
            </DialogContentText>
            <LinearProgress
                variant="determinate"
                value={props.progress * 100}
                sx={{mt: 2}}
            />
            <DialogContentText>
                <Typography
                    variant={"caption"}
                    color={"textSecondary"}
                >
                    {props.progressText}
                    {!props.progressText && `${Math.round(props.progress * 100)}%`}
                </Typography>
            </DialogContentText>
        </GenericModal>
    );
}