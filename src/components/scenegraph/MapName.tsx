import React from "react";
import {useTranslation} from "react-i18next";
import getIsDefaultMapName from "../../utils/map/getIsDefaultMapName";
import {Button, TextField} from "@mui/material";
import {useAtom} from "jotai";
import {mapNameAtom} from "@editor/state/documentStore";

export default function MapName() {
    const {t, i18n} = useTranslation();
    const [mapName, setMapName] = useAtom(mapNameAtom);
    const [isEditingName, setIsEditingName] = React.useState(false);
    const [name, setName] = React.useState(mapName);

    React.useEffect(() => {
        setName(mapName);
    }, [mapName]);

    React.useEffect(() => {
        if (!isEditingName)
            setMapName(name);
    }, [isEditingName]);

    React.useEffect(() => {
        if (getIsDefaultMapName(name)) {
            setName(t("map.new") as string);
            setMapName(t("map.new") as string);
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