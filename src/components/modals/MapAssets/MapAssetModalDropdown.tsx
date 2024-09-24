import { Box, Button, Collapse, Paper } from "@mui/material";
import React from "react";
import AnimatedCaretIcon from "../../utils/AnimatedCaretIcon";

export interface MapAssetModalDropdownProps {
    name: string;
    children: React.ReactNode;
}

export default function MapAssetModalDropdown(props: MapAssetModalDropdownProps) {
    const [isExpanded, setIsExpanded] = React.useState(true);

    return (
        <Paper sx={{ flex: 1, mt: 1 }} elevation={3}>
            <Button
                onClick={() => setIsExpanded(!isExpanded)}
                size={"large"}
                variant={"contained"}
                color={"inherit"}
                fullWidth
                endIcon={<AnimatedCaretIcon up={!isExpanded} />}
            >
                {props.name}
            </Button>
            <Collapse in={isExpanded}>
                <Box
                    sx={{
                        maxHeight: 300,
                        overflowY: "auto"
                    }}
                >
                    {props.children}
                </Box>
            </Collapse>
        </Paper>
    );
}