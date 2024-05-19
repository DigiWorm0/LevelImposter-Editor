import React from "react";
import { useTranslation } from "react-i18next";
import useSettings from "../../hooks/useSettings";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Launch } from "@mui/icons-material";

const BRAVE_LINK = "https://github.com/konvajs/konva/issues/1132#issuecomment-867339732";

export default function BrowserWarningModal() {
    const [settings, setSettings] = useSettings();
    const [dialogText, setDialogText] = React.useState<string | undefined>(undefined);
    const [link, setLink] = React.useState<string | undefined>(undefined);
    const { t } = useTranslation();

    React.useEffect(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isFirefox = /Firefox/.test(navigator.userAgent);
        const isOpera = /OPR/.test(navigator.userAgent);
        const isBrave = /Brave/.test(navigator.userAgent);

        if (isMobile) {
            setDialogText(t("warning.mobile") as string);
        } else if (isFirefox && !settings.isBrowserAccepted) {
            setDialogText(t("warning.firefox") as string);
        } else if (isOpera && !settings.isBrowserAccepted) {
            setDialogText(t("warning.opera") as string);
        } else if (isBrave && !settings.isBrowserAccepted) {
            setDialogText(t("warning.brave") as string);
            setLink(BRAVE_LINK);
        } else {
            setDialogText(undefined);
        }
    }, [settings.isBrowserAccepted, t]);

    const onDismiss = React.useCallback(() => {
        setDialogText(undefined);
        setLink(undefined);
        setSettings({ ...settings, isBrowserAccepted: true });
    }, [settings, setSettings]);

    return (
        <Dialog
            open={dialogText !== undefined}
            onClose={onDismiss}
        >
            <DialogTitle>
                {t("warning.title") as string}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onDismiss}
                    color="primary"
                >
                    {t("warning.dismiss") as string}
                </Button>

                {link && (
                    <Button
                        onClick={() => window.open(link, "_blank")}
                        endIcon={<Launch />}
                    >
                        {t("warning.learnMore") as string}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}