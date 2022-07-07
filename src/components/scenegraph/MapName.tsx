import { Button, InputGroup } from "@blueprintjs/core";
import React from "react";
import useMap from "../../hooks/useMap";

export default function MapName() {
    const [map, setMap] = useMap();
    const [isEditingName, setIsEditingName] = React.useState(false);

    if (!isEditingName) {
        return (
            <div className="map-name">
                <Button
                    minimal
                    large
                    onClick={() => setIsEditingName(true)}>

                    {map.name}

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
                    value={map.name}
                    onChange={(e) => setMap({ ...map, name: e.target.value })}
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