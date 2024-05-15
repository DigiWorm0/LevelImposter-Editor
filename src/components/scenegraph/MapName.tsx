import React from "react";
import { useTranslation } from "react-i18next";
import isDefaultName from "../../utils/isDefaultMapName";
import { useMapName } from "../../hooks/map/useMap";
import { Button, TextField } from "@mui/material";

export default function MapName() {
    const { t, i18n } = useTranslation();
    const [mapName, setMapName] = useMapName()
    const [isEditingName, setIsEditingName] = React.useState(false);
    const [name, setName] = React.useState(mapName);

    React.useEffect(() => {
        setName(mapName);
    }, [mapName]);

    React.useEffect(() => {
        if (!isEditingName)
            setMapName(name);
    }, [isEditingName])

    React.useEffect(() => {
        if (isDefaultName(name)) {
            setName(t("map.new") as string);
            setMapName(t("map.new") as string);
        }
    }, [i18n.language])

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