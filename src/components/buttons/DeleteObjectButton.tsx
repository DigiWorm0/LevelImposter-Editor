import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import useIsElementSelected from "../../hooks/elements/useIsElementSelected";
import { useRemoveSelectedElement } from "../../hooks/elements/useRemoveElement";

export interface DeleteObjectButtonProps {
    buttonProps?: React.ComponentProps<typeof IconButton>;
}

export default function DeleteObjectButton(props: DeleteObjectButtonProps) {
    const { t } = useTranslation();
    const removeSelectedElement = useRemoveSelectedElement();
    const isElementSelected = useIsElementSelected();

    return (
        <Tooltip title={t("object.delete")}>
            <span>
                <IconButton
                    onClick={removeSelectedElement}
                    disabled={!isElementSelected}
                    {...props.buttonProps}
                >
                    <Delete />
                </IconButton>
            </span>
        </Tooltip>
    );
}