import React from "react";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/map/elements/useSelectedElem";
import { useSettingsValue } from "../../../hooks/useSettings";
import PanelContainer from "../util/PanelContainer";
import { Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Abc, Code, DataArray, DataObject } from "@mui/icons-material";

const TYPE_INTENTS = {
    "string": "Primary",
    "number": "Success",
    "bigint": "Success",
    "boolean": "Warning",
    "object": "Error",
    "array": "Error",
    "symbol": "Error",
    "function": "Error",
    "undefined": "Error"
};

export default function DebugPanel() {
    const { t } = useTranslation();
    const { isDevMode } = useSettingsValue();
    const selectedElem = useSelectedElemValue();
    const [selectedKey, setSelectedKey] = React.useState<string | undefined>(undefined);

    const editKey = React.useCallback((key: string) => {
        if (selectedKey === key)
            setSelectedKey(undefined);
        else
            setSelectedKey(key);
    }, [selectedKey]);

    const keys = React.useMemo(() => Object.keys(selectedElem?.properties ?? {}), [selectedElem]);
    const values = React.useMemo(() => Object.values(selectedElem?.properties ?? {}), [selectedElem]);

    if (!selectedElem)
        return null;
    if (!isDevMode)
        return null;

    return (
        <PanelContainer title={t("debug.title") as string}>
            <List dense>
                {keys.map((key, index) => {
                    const value = values[index];
                    const stringValue = JSON.stringify(value, null, 2);

                    // Icons
                    const isArray = Array.isArray(value);
                    const isObject = typeof value === "object" && !isArray;
                    const isPrimitive = !isArray && !isObject;

                    return (
                        <ListItem key={`debug-${key}-${index}`} disablePadding>
                            <ListItemIcon>
                                {isArray && <DataArray />}
                                {isObject && <DataObject />}
                                {isPrimitive && <Abc />}
                            </ListItemIcon>
                            <ListItemText
                                primary={key}
                                secondary={stringValue}
                                color={TYPE_INTENTS[typeof value]}
                            />
                        </ListItem>
                    );
                })}
            </List>
            <Button
                fullWidth
                startIcon={<Code />}
                onClick={() => console.log(selectedElem)}
                color={"secondary"}
            >
                {t("debug.printToConsole")}
            </Button>
        </PanelContainer>
    );
}
