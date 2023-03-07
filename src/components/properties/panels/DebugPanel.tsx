import { Button, Card, Intent, Menu } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import { useSettingsValue } from "../../../hooks/jotai/useSettings";
import PanelContainer from "../util/PanelContainer";

const TYPE_INTENTS: Record<string, Intent> = {
    "string": Intent.PRIMARY,
    "number": Intent.SUCCESS,
    "boolean": Intent.WARNING,
    "object": Intent.DANGER,
    "array": Intent.DANGER
};

export default function DebugPanel() {
    const { t } = useTranslation();
    const settings = useSettingsValue();
    const selectedElem = useSelectedElemValue();
    const [selectedKey, setSelectedKey] = React.useState<string | undefined>(undefined);

    const editKey = React.useCallback((key: string) => {
        if (selectedKey === key)
            setSelectedKey(undefined);
        else
            setSelectedKey(key);
    }, [selectedKey]);

    if (!selectedElem || !settings.isDevMode)
        return null;

    const keys = React.useMemo(() => Object.keys(selectedElem.properties), [selectedElem]);
    const values = React.useMemo(() => Object.values(selectedElem.properties), [selectedElem]);

    return (
        <PanelContainer title={t("debug.title") as string}>
            <Button
                fill
                text={t("debug.printToConsole") as string}
                icon="console"
                onClick={() => {
                    console.log(selectedElem);
                }} />

            <Menu>
                {keys.map((key, index) => {
                    const value = values[index];
                    const stringValue = JSON.stringify(value);
                    return (
                        <div key={`debug-${key}-${index}`}>
                            <MenuItem2
                                text={key}
                                intent={TYPE_INTENTS[typeof value]}
                                onClick={() => {
                                    editKey(key);
                                }}
                            />
                            {selectedKey === key && (
                                <Card style={{ overflowX: "scroll" }}>
                                    <pre>{typeof value}</pre>
                                    <pre>{stringValue}</pre>
                                </Card>
                            )}
                        </div>
                    );
                })}
            </Menu>
        </PanelContainer>
    );
}
