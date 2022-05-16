import { TrapFocus } from "@mui/base";
import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import useMap from "../../hooks/useMap"

export default function MapName() {
    const [map, setMap] = useMap();
    const [isEditingName, setIsEditingName] = React.useState(false);

    if (!isEditingName)
        return (
            <Button
                variant="text"
                color="inherit"
                onClick={() => setIsEditingName(true)}
                sx={{
                    m: 2
                }}>
                {map.name}
            </Button>
        );
    else
        return (
            <TrapFocus open>
                <TextField
                    autoFocus
                    variant="standard"
                    label="Map Name"
                    value={map.name}
                    onChange={(e) => setMap({ ...map, name: e.target.value })}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setIsEditingName(false);
                        }
                    }}
                    sx={{
                        m: 2
                    }}
                />
            </TrapFocus>
        );
}