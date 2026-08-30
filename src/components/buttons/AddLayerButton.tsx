import {CreateNewFolder} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import generateGUID from "../../utils/strings/generateGUID";
import executeCommand from "../../editor/history/executeCommand";
import {createElement} from "@editor/elements/createElement";

export interface AddLayerButtonProps {
    buttonProps?: React.ComponentProps<typeof IconButton>
}

export default function AddLayerButton(props: AddLayerButtonProps) {
    const {t} = useTranslation();

    const onClick = React.useCallback(() => {
        const id = generateGUID();
        executeCommand(createElement({
            id,

            name: t("layer.new"),
            type: "util-layer",
            childrenIDs: [],
            x: 0,
            y: 0,
            z: 0,
            // z: Number.MAX_SAFE_INTEGER,
            xScale: 1,
            yScale: 1,
            rotation: 0,

            properties: {}
        }));
    }, []);

    return (
        <Tooltip title={t("layer.add")}>
            <IconButton
                onClick={onClick}
                {...props.buttonProps}
            >
                <CreateNewFolder/>
            </IconButton>
        </Tooltip>
    );
}