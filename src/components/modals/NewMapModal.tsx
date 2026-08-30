import {Add} from "@mui/icons-material";
import {Button, DialogContentText} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import GenericModal from "./GenericModal";
import {setDocument} from "@editor/history/setDocument";
import {createNewMapDocument} from "@editor/document/types/DefaultMapDocument";

export interface NewMapDialogProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function NewMapModal(props: NewMapDialogProps) {
    const {t} = useTranslation();

    const onClick = React.useCallback(() => {
        setDocument(createNewMapDocument());
        props.onClose();
    }, [props.onClose]);

    return (
        <GenericModal
            open={props.isVisible}
            onClose={props.onClose}
            title={t("map.new")}
            actions={<>
                <Button
                    onClick={onClick}
                    startIcon={<Add/>}
                >
                    {t("map.new")}
                </Button>
                <Button
                    onClick={props.onClose}
                    color={"error"}
                >
                    {t("map.newDialogCancel")}
                </Button>
            </>}
        >
            <DialogContentText>
                {t("map.newDialogText")}
            </DialogContentText>
        </GenericModal>
    );
}
