import { Button, Dialog } from "@blueprintjs/core";
import React from "react";
import useSettings from "../../hooks/jotai/useSettings";

export default function CheckMobile() {
    const [settings, setSettings] = useSettings();
    const [dialogText, setDialogText] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            setDialogText("The LevelImposter Editor was not designed to run on a mobile device. Your mileage may vary.");
        }

        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if (!isChrome && !settings.isBrowserAccepted) {
            setDialogText("While LevelImposter Editor will work with any modern browser, Chromium-based browsers (Google Chrome, Edge, Brave) will be much faster while working with larger maps.");
            setSettings({ ...settings, isBrowserAccepted: true });
        }
    }, []);

    return (
        <>
            <Dialog
                isOpen={dialogText !== undefined}
                onClose={() => setDialogText(undefined)}
                title="Warning"
                portalClassName={settings.isDarkMode ? "bp4-dark" : ""}>

                <div style={{ margin: 15 }} >
                    <p>
                        {dialogText}
                    </p>
                    <Button
                        onClick={() => setDialogText(undefined)}
                        text="OK"
                        intent="primary"
                    />
                </div>
            </Dialog>
        </>
    );
}