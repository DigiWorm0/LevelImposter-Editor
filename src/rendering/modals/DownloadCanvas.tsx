import {CloudDownload} from "@mui/icons-material";
import {Button, Typography} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import GenericModal from "./GenericModal";

export default function DownloadCanvasDialog(props: { isVisible: boolean, setVisible: (isVisible: boolean) => void }) {
    const {t} = useTranslation();

    return (
        <GenericModal
            open={props.isVisible}
            onClose={() => props.setVisible(false)}
            title={t("minimap.download")}
            actions={
                <Button
                    style={{margin: 10}}
                    onClick={() => {
                    }}
                    startIcon={<CloudDownload/>}
                    disabled={!props.isVisible}
                    size={"large"}
                >
                    {t("minimap.download")}
                </Button>
            }
        >
            <Typography>
                No yet implemented.
            </Typography>
        </GenericModal>
    );
}