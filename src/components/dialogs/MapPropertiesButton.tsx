import { Button, CardList, Classes, Dialog, Section, Tooltip } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSettings from "../../hooks/useSettings";
import MapSwitchInput from "../properties/input/MapSwitchInput";
import MapExileInput from "../properties/input/MapExileInput";
import MapSkyboxInput from "../properties/input/MapSkyboxInput";

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
                    title={t("settings.map.title")}
                    subtitle={t("settings.map.subtitle")}
                >
                    <CardList bordered={false} compact>
                        <MapSwitchInput
                            name={t("settings.map.showPingTracker")}
                            prop="showPingIndicator"
                            defaultValue={true}
                            icon="person"
                        />
                        <MapSwitchInput
                            name={t("settings.map.pixelArtMode")}
                            prop="pixelArtMode"
                            defaultValue={false}
                            icon="helper-management"
                        />
                        <MapSwitchInput
                            name={t("settings.map.preloadAllGIFs")}
                            prop="preloadAllGIFs"
                            defaultValue={false}
                            icon="media"
                        />
                        <MapSwitchInput
                            name={t("settings.map.triggerLogging")}
                            prop="triggerLogging"
                            defaultValue={true}
                            icon="console"
                        />
                        <MapSwitchInput
                            name={t("settings.map.canRemix")}
                            prop="canRemix"
                            defaultValue={true}
                            icon="random"
                        />
                        <MapSkyboxInput />
                        <MapExileInput />
                    </CardList>
                </Section>
            </Dialog>
        </>
    );
}