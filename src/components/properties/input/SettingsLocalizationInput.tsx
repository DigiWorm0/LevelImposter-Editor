import React from "react";
import { Button, Card, Classes, Icon } from "@blueprintjs/core";
import useSettings from "../../../hooks/jotai/useSettings";
import { LANGUAGES } from "../../../types/generic/Constants";
import { useTranslation } from "react-i18next";
import { ItemRenderer, Select } from "@blueprintjs/select";
import { MenuItem2 } from "@blueprintjs/popover2";


export default function SettingsLocalizationInput() {
    const { t, i18n } = useTranslation();
    const [settings, setSettings] = useSettings();

    // Gets the language name from the i18n code
    const getLanguageName = (i18nCode: string): string => {
        return i18nCode === "auto" ? t("language.auto") : i18n.t(`language.${i18nCode}`) as string;
    }

    // Item Renderer
    const languageSelectRenderer: ItemRenderer<string> = (i18nCode, props) => (
        <MenuItem2
            key={i18nCode}
            text={getLanguageName(i18nCode)}
            label={i18nCode}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            intent={i18nCode !== "auto" ? "success" : undefined}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    return (
        <Card style={{ justifyContent: "space-between" }}>
            <div>
                <Icon
                    icon={"translate"}
                    className={Classes.TEXT_MUTED}
                    style={{ marginRight: 8 }}
                />
                {t("settings.interface.localization")}
            </div>

            <div style={{ maxWidth: 200 }}>
                <Select<string>
                    filterable={false}
                    items={LANGUAGES}
                    itemRenderer={languageSelectRenderer}
                    onItemSelect={(i18nCode) => {
                        setSettings({ ...settings, language: i18nCode });
                    }}
                    popoverProps={{ minimal: true }}
                >

                    <Button
                        rightIcon="caret-down"
                        text={getLanguageName(settings.language || "auto")}
                        style={{ marginLeft: 10, marginTop: -5, width: 180 }}
                    />
                </Select>
            </div>
        </Card>
    )
}