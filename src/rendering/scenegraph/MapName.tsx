import React from "react";
import {useTranslation} from "react-i18next";
import {Button, TextField} from "@mui/material";
import {useAtomValue} from "jotai";
import {docNameAtom} from "@editor/document/documentStore";
import executeCommand from "@editor/history/executeCommand";
import {setMapName} from "@editor/document/mapPropertyCommands";
import {LANGUAGES} from "@/types/amongus/Constants";
import i18next from "i18next";

export default function MapName() {
    const {t, i18n} = useTranslation();
    const mapName = useAtomValue(docNameAtom);
    const [isEditingName, setIsEditingName] = React.useState(false);
    const [name, setName] = React.useState(mapName);

    const saveMapName = (newName: string) => executeCommand(setMapName(newName));

    React.useEffect(() => {
        setName(mapName);
    }, [mapName]);

    React.useEffect(() => {
        if (!isEditingName)
            saveMapName(name);
    }, [isEditingName]);

    React.useEffect(() => {
        if (getIsDefaultMapName(name)) {
            setName(t("map.new") as string);
            saveMapName(t("map.new") as string);
        }
    }, [i18n.language]);

    if (!isEditingName) {
        return (
            <div className="map-name">
                <Button
                    style={{
                        fontWeight: 600,
                        textTransform: "none"
                    }}
                    size={"large"}
                    color={"inherit"}
                    onClick={() => setIsEditingName(true)}
                >
                    {mapName}
                </Button>
            </div>
        );
    } else {
        return (
            <div className="map-name">
                <TextField
                    autoFocus
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            setIsEditingName(false);
                    }}
                    onFocus={(e) => {
                        e.target.select();
                    }}
                    inputProps={{
                        maxLength: 32
                    }}
                />
            </div>
        );
    }
}

/**
 * Checks if the map name is the default name "New Map" (in all languages).
 * @param mapName Name of the map
 * @returns True if the map name is the default name, false otherwise.
 */
function getIsDefaultMapName(mapName: string) {
    return LANGUAGES
        .map((i18nCode) => i18next.t("map.new", {lng: i18nCode}))
        .includes(mapName);
}