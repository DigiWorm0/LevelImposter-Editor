import React from "react";
import { useTranslation } from "react-i18next";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import useAutoSave from "../../hooks/useAutoSave";
import useEmbed from "../../hooks/useEmbed";
import useIDParam from "../../hooks/useIDParam";
import useKeyboardInput from "../../hooks/useKeyboardInput";

export default function GlobalHooks() {
    const { i18n } = useTranslation();
    const settings = useSettingsValue();
    const isEmbedded = useEmbed();
    useKeyboardInput();
    useIDParam();
    useAutoSave();

    React.useEffect(() => {
        const onBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        if (!isEmbedded)
            window.addEventListener("beforeunload", onBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", onBeforeUnload);
        }
    }, [isEmbedded]);

    React.useEffect(() => {
        if (settings.language === "auto")
            i18n.changeLanguage(navigator.language);
        else
            i18n.changeLanguage(settings.language);
    }, [settings.language]);

    return null;
}