import React from "react";
import { useTranslation } from "react-i18next";
import AddObjectModal from "../modals/AddObject/AddObjectModal";
import { IconButton, Tooltip } from "@mui/material";
import { AddBoxOutlined } from "@mui/icons-material";

export interface AddObjectButtonProps {
    buttonProps?: React.ComponentProps<typeof IconButton>;
}

export default function AddObjectButton(props: AddObjectButtonProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <Tooltip title={t("object.add")}>
                <IconButton
                    onClick={() => setIsOpen(true)}
                    {...props.buttonProps}
                >
                    <AddBoxOutlined />
                </IconButton>
            </Tooltip>
            <AddObjectModal
                isVisible={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}