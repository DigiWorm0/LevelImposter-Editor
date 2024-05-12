import { AnchorButton, Tooltip } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import AddObjectModal from "../modals/AddObjectModal";

export interface AddObjectButtonProps {
    buttonProps?: React.ComponentProps<typeof AnchorButton>;
}

export default function AddObjectButton(props: AddObjectButtonProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <Tooltip
                fill
                content={t("object.add") as string}
                position="bottom"
            >
                <AnchorButton
                    fill
                    minimal
                    icon={"cube-add"}
                    onClick={() => setIsOpen(true)}
                    {...props.buttonProps}
                />
            </Tooltip>
            <AddObjectModal
                isVisible={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}