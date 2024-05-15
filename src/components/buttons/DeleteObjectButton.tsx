import { useTranslation } from "react-i18next";
import { useRemoveSelectedElement } from "../../hooks/map/elements/useRemoveElement";
import React from "react";
import useIsElementSelected from "../../hooks/map/elements/useIsElementSelected";
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";

export interface DeleteObjectButtonProps {
    buttonProps?: React.ComponentProps<typeof IconButton>;
}

export default function DeleteObjectButton(props: DeleteObjectButtonProps) {
    const { t } = useTranslation();
    const removeSelectedElement = useRemoveSelectedElement();
    const isElementSelected = useIsElementSelected();

    return (
        <Tooltip title={t("object.delete")}>
            <IconButton
                onClick={removeSelectedElement}
                disabled={!isElementSelected}
                {...props.buttonProps}
            >
                <Delete />
            </IconButton>
        </Tooltip>
    );
}