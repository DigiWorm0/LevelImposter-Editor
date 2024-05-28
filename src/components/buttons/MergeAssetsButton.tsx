import { Button, Tooltip } from "@mui/material";
import { Merge } from "@mui/icons-material";
import React from "react";
import MergeAssetsModal from "../modals/MergeAssetsModal";
import useMergeMapAssets from "../../hooks/assets/useMergeMapAssets";
import useToaster from "../../hooks/useToaster";
import { useTranslation } from "react-i18next";

export default function MergeAssetsButton() {
    const { t } = useTranslation();
    const toaster = useToaster();
    const mergeAssets = useMergeMapAssets();
    const [isRunning, setIsRunning] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [assetsMerged, setAssetsMerged] = React.useState(0);

    const onClick = React.useCallback(() => {
        setIsRunning(true);
        mergeAssets((progress, assetsMerged) => {

            // Progress Update
            setProgress(progress);
            setAssetsMerged(assetsMerged);

        }).then((data) => {

            // Success Toast
            setIsRunning(false);
            if (data) {
                const { assetCount, referenceCount } = data;
                toaster.success(t("mergeAssets.success", { assetCount, referenceCount }));
            }

        }).catch((err) => {

            // Error Toast
            setIsRunning(false);
            toaster.error(err);
            
        });
    }, [mergeAssets, setProgress, setAssetsMerged]);

    return (
        <>
            <Tooltip title={t("mergeAssets.tooltip")}>
                <Button
                    variant={"outlined"}
                    color={"primary"}
                    endIcon={<Merge />}
                    onClick={onClick}
                >
                    Merge
                </Button>
            </Tooltip>
            <MergeAssetsModal
                isRunning={isRunning}
                progress={progress}
                assetsMerged={assetsMerged}
            />
        </>
    )
}