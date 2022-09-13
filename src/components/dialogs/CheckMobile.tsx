import { Button, Dialog } from "@blueprintjs/core";
import React from "react";
import useSettings from "../../hooks/jotai/useSettings";
import useTranslation from "../../hooks/useTranslation";

export default function CheckMobile() {
    const [settings, setSettings] = useSettings();
    const [dialogText, setDialogText] = React.useState<string | undefined>(undefined);
    const translation = useTranslation();

    React.useEffect(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            setDialogText(translation.MobileWarning);
        }

        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if (!isChrome && !settings.isBrowserAccepted) {
            setDialogText(translation.ChromeWarning);
        }
    }, []);

    return (
        <>
            <Dialog
                isOpen={dialogText !== undefined}
                onClose={() => setDialogText(undefined)}
                title={translation.Warning}
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
                        text={translation.OK}
                        intent="primary"
                    />
                </div>
            </Dialog>
        </>
    );
}