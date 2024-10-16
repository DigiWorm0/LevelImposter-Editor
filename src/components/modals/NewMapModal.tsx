import { Add } from "@mui/icons-material";
import { Button, DialogContentText } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSetSelectedColliderID } from "../../hooks/elements/colliders/useSelectedCollider";
import { useSetSelectedElemID } from "../../hooks/elements/useSelectedElem";
import { useResetMap } from "../../hooks/map/useMap";
import GenericModal from "./GenericModal";

export interface NewMapDialogProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function NewMapModal(props: NewMapDialogProps) {
    const { t } = useTranslation();
    const resetMap = useResetMap();
    const setSelectedID = useSetSelectedElemID();
    const setColliderID = useSetSelectedColliderID();

    const onClick = React.useCallback(() => {
        resetMap();
        setSelectedID(undefined);
        setColliderID(undefined);
        props.onClose();
    }, [resetMap, setSelectedID, setColliderID, props.onClose]);

    return (
        <GenericModal
            open={props.isVisible}
            onClose={props.onClose}
            title={t("map.new")}
            actions={<>
                <Button
                    onClick={onClick}
                    startIcon={<Add />}
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
