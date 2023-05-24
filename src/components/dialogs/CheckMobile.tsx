import { Button, Dialog } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSettings from "../../hooks/jotai/useSettings";

export default function CheckMobile() {
    const [settings, setSettings] = useSettings();
    const [dialogText, setDialogText] = React.useState<string | undefined>(undefined);
    const { t } = useTranslation();

    React.useEffect(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isFirefox = /Firefox/.test(navigator.userAgent);
        const isOpera = /OPR/.test(navigator.userAgent);

        if (isMobile) {
            setDialogText(t("warning.mobile") as string);
        }
        else if (isFirefox && !settings.isBrowserAccepted) {
            setDialogText(t("warning.firefox") as string);
        }
        else if (isOpera && !settings.isBrowserAccepted) {
            setDialogText(t("warning.opera") as string);
        }
        else {
            setDialogText(undefined);
        }
    }, [settings.isBrowserAccepted]);

    return (
        <>
            <Dialog
                isOpen={dialogText !== undefined}
                onClose={() => setDialogText(undefined)}
                title={t("warning.title") as string}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <div style={{ margin: 15 }} >
                    <p>
                        {dialogText}
                    </p>
                    <Button
                        onClick={() => {
                            setDialogText(undefined);
                            setSettings({ ...settings, isBrowserAccepted: true });
                        }}
                        text={t("warning.ok") as string}
                        intent="primary"
                    />
                </div>
            </Dialog>
        </>
    );
}