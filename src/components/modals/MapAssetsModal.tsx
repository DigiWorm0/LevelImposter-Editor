import React from "react";
import GenericModal from "./GenericModal";
import { Typography } from "@mui/material";

interface MapAssetsDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export default function MapAssetsModal(props: MapAssetsDialogProps) {
    return (
        <GenericModal
            open={props.isOpen}
            onClose={props.onClose}
            title={"Map Assets"}
        >
            <Typography sx={{ color: "text.secondary" }}>
                Soon™
            </Typography>
        </GenericModal>
    )
}