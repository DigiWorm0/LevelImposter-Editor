import React from "react";
import useSettings from "../../hooks/jotai/useSettings";
import LITranslations from "../../types/localization/LITranslations";

export default function CheckLanguage() {
    const [settings, setSettings] = useSettings();

    React.useEffect(() => {
        if (settings.language !== undefined)
            return;

        const language = navigator.language;
        if (language in LITranslations) {
            setSettings({ ...settings, language });
            console.log("Language detected: " + language);
        }
    }, []);

    return null;
}