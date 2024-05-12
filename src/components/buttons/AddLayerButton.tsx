import { AnchorButton, Tooltip } from "@blueprintjs/core";
import generateGUID from "../../utils/generateGUID";
import { useAddElement } from "../../hooks/map/elements/useElements";
import { useSetSelectedElemID } from "../../hooks/map/elements/useSelectedElem";
import { useTranslation } from "react-i18next";
import React from "react";

export interface AddLayerButtonProps {
    buttonProps?: React.ComponentProps<typeof AnchorButton>
}

export default function AddLayerButton(props: AddLayerButtonProps) {
    const { t } = useTranslation();
    const setSelectedID = useSetSelectedElemID();
    const addElement = useAddElement();

    const onClick = React.useCallback(() => {
        const id = generateGUID();
        addElement({
            id,
            name: t("layer.new"),
            type: "util-layer",
            x: 0,
            y: 0,
            z: Number.MAX_SAFE_INTEGER,
            xScale: 1,
            yScale: 1,
            rotation: 0,
            properties: {}
        });
        setSelectedID(id);
    }, [addElement, setSelectedID]);

    return (
        <Tooltip
            fill
            content={t("layer.add") as string}
            position="bottom"
        >
            <AnchorButton
                fill
                minimal
                icon="folder-new"
                onClick={onClick}
                {...props.buttonProps}
            />
        </Tooltip>
    );
}