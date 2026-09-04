import GenericModal from "../GenericModal";
import React from "react";
import OptimizeMapPanel from "./OptimizeMapPanel";
import {useTranslation} from "react-i18next";
import {DialogContentText, Divider} from "@mui/material";
import {Build} from "@mui/icons-material";
import {useAtomValue} from "jotai";
import {isBuildRunningAtom} from "@editor/build/buildStore";

export interface OptimizeMapModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function OptimizeMapModal(props: OptimizeMapModalProps) {
    const {t} = useTranslation();
    const isRunning = useAtomValue(isBuildRunningAtom);

    return (
        <GenericModal
            open={props.isVisible}
            onClose={props.onClose}
            title={t("map.optimize")}
            icon={<Build/>}
            preventClose={isRunning}
            DialogProps={{
                maxWidth: "lg"
            }}
        >
            <DialogContentText
                fontSize={"small"}
            >
                {t("map.optimizeDesc")}
            </DialogContentText>
            <Divider sx={{mt: 1}}/>
            <OptimizeMapPanel/>
        </GenericModal>
    );
}