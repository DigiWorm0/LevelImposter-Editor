import {Delete} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import useIsElementSelected from "../../hooks/elements/useIsElementSelected";
import executeCommand from "../../editor/history/executeCommand";
import {deleteSelectedElements} from "@editor/document/elements/deleteElement";

export interface DeleteObjectButtonProps {
    buttonProps?: React.ComponentProps<typeof IconButton>;
}

export default function DeleteObjectButton(props: DeleteObjectButtonProps) {
    const {t} = useTranslation();
    const isElementSelected = useIsElementSelected();

    return (
        <Tooltip title={t("object.delete")}>
            <span>
                <IconButton
                    onClick={() => executeCommand(deleteSelectedElements())}
                    disabled={!isElementSelected}
                    {...props.buttonProps}
                >
                    <Delete/>
                </IconButton>
            </span>
        </Tooltip>
    );
}