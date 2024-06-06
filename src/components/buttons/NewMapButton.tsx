import React from "react";
import { useTranslation } from "react-i18next";
import NewMapModal from "../modals/NewMapModal";
import { IconButton, Tooltip } from "@mui/material";
import { InsertDriveFileOutlined } from "@mui/icons-material";

export default function NewMapButton() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = React.useState(false);

    return (
        <>
            <Tooltip title={t("map.new")}>
                <IconButton onClick={() => setIsVisible(true)}>
                    <InsertDriveFileOutlined />
                </IconButton>
            </Tooltip>

            <NewMapModal
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
            />
        </>
    );
}