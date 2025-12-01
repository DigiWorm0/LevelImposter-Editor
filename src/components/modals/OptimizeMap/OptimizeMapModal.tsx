import GenericModal from "../GenericModal";
import React from "react";
import OptimizeMapPanel from "./OptimizeMapPanel";
import {useTranslation} from "react-i18next";
import {DialogContentText, Divider} from "@mui/material";
import useIsOptimizationRunning from "../../../hooks/optimize/useIsOptimizationRunning";
import {Build} from "@mui/icons-material";

export interface OptimizeMapModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function OptimizeMapModal(props: OptimizeMapModalProps) {
    const {t} = useTranslation();
    const [isRunning] = useIsOptimizationRunning();

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