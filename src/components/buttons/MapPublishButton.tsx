import React from "react";
import { useTranslation } from "react-i18next";
import PublishModal from "../modals/PublishModal";
import { Button, Tooltip } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

export default function MapPublishButton() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);


    return (
        <>
            <Tooltip title={t("publish.description")}>
                <Button
                    onClick={() => setIsOpen(true)}
                    style={{ marginTop: 5 }}
                    variant={"outlined"}
                    startIcon={<CloudUpload />}
                >
                    {t("publish.title")}
                </Button>
            </Tooltip>

            <PublishModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}