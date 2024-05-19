import React from "react";
import { useTranslation } from "react-i18next";
import { useSettingsValue } from "../../hooks/useSettings";
import { useResetMap } from "../../hooks/map/useMap";
import { useSetSelectedElemID } from "../../hooks/map/elements/useSelectedElem";
import { useSetSelectedColliderID } from "../../hooks/map/elements/useSelectedCollider";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Add } from "@mui/icons-material";

export interface NewMapDialogProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function NewMapModal(props: NewMapDialogProps) {
    const { t } = useTranslation();
    const { isDarkMode } = useSettingsValue();
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
        <Dialog
            open={props.isVisible}
            onClose={props.onClose}
        >
            <DialogTitle>
                {t("map.new")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t("map.newDialogText")}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
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
            </DialogActions>
        </Dialog>
    )
}
