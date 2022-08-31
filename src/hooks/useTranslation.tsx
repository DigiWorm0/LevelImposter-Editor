import React from "react";
import LITranslations from "../types/localization/LITranslations";
import LITranslation from "../types/localization/LITranslation";
import { useSettingsValue } from "./jotai/useSettings";
import EnglishLocalization from "../types/localization/English";
import PirateLocalization from "../types/localization/Pirate";

export default function useTranslation() {
    const settings = useSettingsValue();
    const [translation, setTranslation] = React.useState<LITranslation>(PirateLocalization);

    React.useEffect(() => {
        if (settings.language === undefined)
            return;
        
        if (settings.language in LITranslations) {
            setTranslation(LITranslations[settings.language]);
        }
    }, [settings.language]);

    return translation;
}