import {Box, Typography} from "@mui/material";
import React from "react";

export interface SettingsHeaderProps {
    children: React.ReactNode;
}

export default function SettingsHeader(props: SettingsHeaderProps) {
    return (
        <Box
            sx={{mt: 1, mb: 0}}
        >
            <Typography
                variant={"caption"}
                color={"textSecondary"}
                fontSize={"0.75rem"}
                sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                }}
            >
                {props.children}
            </Typography>
        </Box>
    );
}