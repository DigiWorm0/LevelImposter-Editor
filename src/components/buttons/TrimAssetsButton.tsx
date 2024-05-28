import { Button, Tooltip } from "@mui/material";
import { ContentCut } from "@mui/icons-material";
import React from "react";
import useToaster from "../../hooks/useToaster";
import { useTranslation } from "react-i18next";
import useTrimMapAssets from "../../hooks/assets/useTrimMapAssets";

export default function TrimAssetsButton() {
    const { t } = useTranslation();
    const toaster = useToaster();
    const trimAssets = useTrimMapAssets();

    const onClick = React.useCallback(() => {
        const assetCount = trimAssets();
        toaster.success(t("trimAssets.success", { assetCount }));
    }, [trimAssets]);

    return (
        <Tooltip title={t("trimAssets.tooltip")}>
            <Button
                onClick={onClick}
                variant={"outlined"}
                color={"error"}
                endIcon={<ContentCut />}
            >
                Trim
            </Button>
        </Tooltip>
    )
}