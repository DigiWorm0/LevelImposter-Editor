import React from "react";
import { useTranslation } from "react-i18next";
import { useSettingsValue } from "../../hooks/useSettings";
import useEmbed from "../../hooks/embed/useEmbed";
import useIDParam from "../../hooks/embed/useIDParam";
import useHotkeysHandler from "../../hooks/input/useHotkeysHandler";
import { _useUserAtom } from "../../hooks/firebase/useUser";
import { useAtomsDebugValue } from "jotai-devtools";
import useSortMap from "../../hooks/map/useSortMap";

export default function GlobalHooks() {
    const { i18n } = useTranslation();
    const { language } = useSettingsValue();
    const isEmbedded = useEmbed();
    useHotkeysHandler();
    useIDParam();
    _useUserAtom();
    useAtomsDebugValue();
    useSortMap();

    React.useEffect(() => {
        const onBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        if (!isEmbedded)
            window.addEventListener("beforeunload", onBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", onBeforeUnload);
        };
    }, [isEmbedded]);

    React.useEffect(() => {
        const newLanguage = language === "auto" ? navigator.language : language;
        i18n.changeLanguage(newLanguage).catch(console.error);
    }, [language]);

    return null;
}