import React from "react";
import GenericModal from "./GenericModal";

interface MapAssetsDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export default function MapAssetsModal(props: MapAssetsDialogProps) {
    return (
        <GenericModal
            open={props.isOpen}
            onClose={props.onClose}
        >
            <p>
                TODO
            </p>
        </GenericModal>
    )
}