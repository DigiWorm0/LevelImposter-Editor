import { Button, InputGroup } from "@blueprintjs/core";
import React from "react";
import { useMapName } from "../../hooks/jotai/useMap";

export default function MapName() {
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

    if (!isEditingName) {
        return (
            <div className="map-name">
                <Button
                    style={{ fontWeight: 600 }}
                    minimal
                    large
                    onClick={() => setIsEditingName(true)}>

                    {mapName}

                </Button>
            </div>
        );
    }
    else {
        return (
            <div className="map-name">
                <InputGroup
                    autoFocus
                    large
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setIsEditingName(false);
                        }
                    }}
                />
            </div>
        );
    }
}