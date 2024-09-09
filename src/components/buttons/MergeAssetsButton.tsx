import {Button, Tooltip} from "@mui/material";
import {Merge} from "@mui/icons-material";
import React from "react";
import ProcessModal from "../modals/ProcessModal";
import useMergeMapAssets from "../../hooks/assets/useMergeMapAssets";
import useToaster from "../../hooks/useToaster";
import {useTranslation} from "react-i18next";

export default function MergeAssetsButton() {
    const {t} = useTranslation();
    const toaster = useToaster();
    const mergeAssets = useMergeMapAssets();
    const [isRunning, setIsRunning] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    const onClick = React.useCallback(() => {
        setIsRunning(true);
        mergeAssets((progress) => {

            // Progress Update
            setProgress(progress);

        }).then((data) => {

            // Success Toast
            setIsRunning(false);
            if (data) {
                const {assetCount, referenceCount} = data;
                toaster.success(t("mergeAssets.success", {assetCount, referenceCount}));
            }

        }).catch((err) => {

            // Error Toast
            setIsRunning(false);
            toaster.error(err);

        });
    }, [mergeAssets, setProgress]);

    return (
        <>
            <Tooltip title={t("mergeAssets.tooltip")}>
                <Button
                    variant={"outlined"}
                    color={"primary"}
                    endIcon={<Merge/>}
                    onClick={onClick}
                >
                    Merge
                </Button>
            </Tooltip>
            <ProcessModal
                title={t("mergeAssets.title")}
                description={t("mergeAssets.description")}
                isRunning={isRunning}
                progress={progress}
            />
        </>
    );
}