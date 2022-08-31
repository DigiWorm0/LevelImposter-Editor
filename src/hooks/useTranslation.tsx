import React from "react";
import LITranslations from "../types/localization/LITranslations";
import LITranslation from "../types/localization/LITranslation";
import { useSettingsValue } from "./jotai/useSettings";
import EnglishLocalization from "../types/localization/English";

export default function useTranslation() {
    const settings = useSettingsValue();
    const [translation, setTranslation] = React.useState<LITranslation>(EnglishLocalization);

    React.useEffect(() => {
        if (settings.language === undefined)
            return;
        
        if (settings.language in LITranslations) {
            setTranslation(LITranslations[settings.language]);
        }
    }, [settings.language]);

    return translation;
}