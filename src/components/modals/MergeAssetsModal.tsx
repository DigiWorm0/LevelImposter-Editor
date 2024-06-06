import React from "react";
import { useTranslation } from "react-i18next";
import { DialogContentText, LinearProgress, Typography } from "@mui/material";
import GenericModal from "./GenericModal";

export interface MergeAssetsModalProps {
    isRunning: boolean;
    progress: number;
    assetsMerged: number;
}

export default function MergeAssetsModal(props: MergeAssetsModalProps) {
    const { t } = useTranslation();

    return (
        <GenericModal
            open={props.isRunning}
            title={t("mergeAssets.title")}
            preventClose
        >
            <DialogContentText>
                {t("mergeAssets.description")}
            </DialogContentText>
            <LinearProgress
                variant="determinate"
                value={props.progress * 100}
                sx={{ mt: 2 }}
            />
            <DialogContentText>
                <Typography
                    variant={"caption"}
                    color={"textSecondary"}
                >
                    {t("mergeAssets.progress", {
                        progress: Math.round(props.progress * 100),
                        total: props.assetsMerged
                    })}
                </Typography>
            </DialogContentText>
        </GenericModal>
    );
}