import { Button, Tooltip } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import SettingsModal from "../modals/SettingsModal";

export default function SettingsButton() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <Tooltip
                content={t("settings.interface.title") as string}
                position="bottom"
            >
                <Button
                    minimal
                    icon="cog"
                    onClick={() => setIsOpen(true)}
                />
            </Tooltip>

            <SettingsModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}