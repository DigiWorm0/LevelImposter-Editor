import { Button, Tooltip } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import PublishModal from "../modals/PublishModal";

export default function MapPublishButton() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);


    return (
        <>
            <Tooltip
                fill
                content={t("publish.description") as string}
                position="top"
            >
                <Button
                    fill
                    text={t("publish.title")}
                    icon={"cloud-upload"}
                    onClick={() => setIsOpen(true)}
                    style={{ marginTop: 5 }}
                    intent={"primary"}
                />
            </Tooltip>

            <PublishModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}