import { Abc, Code, DataArray, DataObject } from "@mui/icons-material";
import { Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/elements/useSelectedElem";
import { useSettingsValue } from "../../../hooks/useSettings";
import PanelContainer from "../util/PanelContainer";

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
                    let stringValue = JSON.stringify(value, null, 2);
                    stringValue = stringValue.substring(0, 100) + (stringValue.length > 100 ? "..." : "");

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
