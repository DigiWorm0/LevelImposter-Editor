import { Button, Tooltip } from "@mui/material";
import { Upload } from "@mui/icons-material";
import React from "react";
import useToaster from "../../hooks/useToaster";
import { useTranslation } from "react-i18next";
import { MaybeGUID } from "../../types/generic/GUID";
import useReplaceMapAsset from "../../hooks/assets/useReplaceMapAsset";

export interface ReplaceAssetButtonProps {
    assetID?: MaybeGUID;
}

export default function ReplaceAssetButton(props: ReplaceAssetButtonProps) {
    const { t } = useTranslation();
    const toaster = useToaster();
    const replaceMapAsset = useReplaceMapAsset();

    const onClick = React.useCallback(() => {
        if (!props.assetID)
            return;

        replaceMapAsset(props.assetID).then(() => {
            toaster.success(t("replaceAsset.success"));
        }).catch(toaster.error);
    }, [props.assetID, replaceMapAsset, toaster, t]);

    return (
        <Tooltip title={t("replaceAsset.tooltip")}>
            <Button
                onClick={onClick}
                variant={"outlined"}
                color={"primary"}
                endIcon={<Upload />}
            >
                Replace
            </Button>
        </Tooltip>
    );
}