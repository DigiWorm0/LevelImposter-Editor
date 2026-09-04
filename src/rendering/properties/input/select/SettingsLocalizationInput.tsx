import React from "react";
import {useTranslation} from "react-i18next";
import {ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select} from "@mui/material";
import {LANGUAGES} from "@/types/amongus/Constants";
import {Language} from "@mui/icons-material";
import {useAtom} from "jotai";
import {settingsAtom} from "@editor/settings/settingsStore";

export default function SettingsLocalizationInput() {
    const {t, i18n} = useTranslation();
    const [settings, setSettings] = useAtom(settingsAtom);
    const selectRef = React.useRef<HTMLSelectElement>(null);

    // Gets the language name from the i18n code
    const getLanguageName = (i18nCode: string): string => {
        return i18nCode === "auto" ? t("language.auto") : i18n.t(`language.${i18nCode}`) as string;
    };

    const onClick = () => {
        // Show the dropdown
        selectRef.current?.click();
    };

    return (
        <ListItem
            dense
            disablePadding
            secondaryAction={
                <Select
                    value={settings.language}
                    onChange={(e) => setSettings({...settings, language: e.target.value})}
                    size={"small"}
                    variant={"standard"}
                    style={{width: 200}}
                    ref={selectRef}
                >
                    {LANGUAGES.map((lang) => (
                        <MenuItem key={lang} value={lang}>{getLanguageName(lang)}</MenuItem>
                    ))}
                </Select>
            }
        >
            <ListItemButton onClick={onClick}>
                <ListItemIcon><Language/></ListItemIcon>
                <ListItemText primary={t("settings.interface.localization")}/>
            </ListItemButton>
        </ListItem>
    );
}