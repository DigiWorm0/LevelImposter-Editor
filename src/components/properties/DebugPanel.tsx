import { Button, Card, Intent, Menu } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import React from "react";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import useTranslation from "../../hooks/useTranslation";
import PanelContainer from "./PanelContainer";

const TYPE_INTENTS: Record<string, Intent> = {
    "string": Intent.PRIMARY,
    "number": Intent.SUCCESS,
    "boolean": Intent.WARNING,
    "object": Intent.DANGER,
    "array": Intent.DANGER
};

export default function DebugPanel() {
    const translation = useTranslation();
    const settings = useSettingsValue();
    const selectedElem = useSelectedElemValue();
    const [selectedKey, setSelectedKey] = React.useState<string | undefined>(undefined);

    const editKey = (key: string) => {
        if (selectedKey === key)
            setSelectedKey(undefined);
        else
            setSelectedKey(key);
    }

    if (!selectedElem || !settings.isDevMode)
        return null;

    const keys = Object.keys(selectedElem.properties);
    const values = Object.values(selectedElem.properties);

    return (
        <PanelContainer title={translation.Debug}>
            <Button
                fill
                text={translation.PrintToConsole}
                icon="console"
                onClick={() => {
                    console.log(selectedElem);
                }} />

            <Menu>
                {keys.map((key, index) => {
                    const value = values[index];
                    const stringValue = JSON.stringify(value);
                    return (
                        <>
                            <MenuItem2
                                key={key}
                                text={key}
                                intent={TYPE_INTENTS[typeof value]}
                                onClick={() => {
                                    editKey(key);
                                }}
                            />
                            {selectedKey === key && (
                                <Card>
                                    <pre>{typeof value}</pre>
                                    <pre>{stringValue}</pre>
                                </Card>
                            )}
                        </>
                    );
                })}
            </Menu>
        </PanelContainer>
    );
}
