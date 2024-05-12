import { AnchorButton, Tooltip } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useRemoveSelectedElement } from "../../hooks/map/elements/useRemoveElement";
import React from "react";
import useIsElementSelected from "../../hooks/map/elements/useIsElementSelected";

export interface DeleteObjectButtonProps {
    buttonProps?: React.ComponentProps<typeof AnchorButton>;
}

export default function DeleteObjectButton(props: DeleteObjectButtonProps) {
    const { t } = useTranslation();
    const removeSelectedElement = useRemoveSelectedElement();
    const isElementSelected = useIsElementSelected();

    return (
        <Tooltip
            fill
            content={t("object.delete") as string}
            position="bottom"
        >
            <AnchorButton
                fill
                minimal
                icon={"trash"}
                disabled={!isElementSelected}
                onClick={removeSelectedElement}
                {...props.buttonProps}
            />
        </Tooltip>
    );
}