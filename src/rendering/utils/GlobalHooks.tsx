import React from "react";
import {useTranslation} from "react-i18next";
import useEmbedScrollCapture from "./useEmbedScrollCapture";
import useImportMapFromURL from "./useImportMapFromURL";
import useHotkeysHandler from "@editor/hotkeys/useHotkeysHandler";
import {useAtomsDebugValue} from "jotai-devtools";
import {useSyncGlobalUserState} from "@editor/firebase/hooks/useSyncGlobalUserState";
import {useAtomValue} from "jotai";
import {settingsAtom} from "@editor/settings/settingsStore";
import {isEmbedded} from "@editor/url/getEmbedFromURL";

export default function GlobalHooks() {
    const {i18n} = useTranslation();
    const {language} = useAtomValue(settingsAtom);
    useHotkeysHandler();
    useEmbedScrollCapture();
    useImportMapFromURL();
    useSyncGlobalUserState();
    useAtomsDebugValue();
    // useSortMap(); // TODO: Fix Z sorting

    React.useEffect(() => {
        const onBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = ""; // This is necessary for some browsers to show the confirmation dialog
        };

        if (!isEmbedded)
            window.addEventListener("beforeunload", onBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", onBeforeUnload);
        };
    }, []);

    React.useEffect(() => {
        const newLanguage = language === "auto" ? navigator.language : language;
        i18n.changeLanguage(newLanguage).catch(console.error);
    }, [language]);

    return null;
}
