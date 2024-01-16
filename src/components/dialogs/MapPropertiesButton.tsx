import { Button, CardList, Classes, Dialog, Section, Tooltip } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSettings from "../../hooks/jotai/useSettings";

export default function MapPropertiesButton() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [settings] = useSettings();

    return (
        <>
            <Tooltip
                content={t("settings.map.title") as string}
                position="bottom"
            >
                <Button
                    className={Classes.MINIMAL}
                    icon="map"
                    onClick={() => setIsOpen(true)}
                />
            </Tooltip>

            <Dialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                portalClassName={settings.isDarkMode === false ? "" : "bp5-dark"}
            >
                <Section
                    icon={"cog"}
                    title={t("settings.title")}
                    subtitle={t("settings.map.title")}
                >
                    <CardList bordered={false} compact>

                    </CardList>
                </Section>
            </Dialog>
        </>
    );
}