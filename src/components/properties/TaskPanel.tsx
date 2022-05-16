import { HorizontalRule, Image } from "@mui/icons-material";
import { Divider, FormControlLabel, Grid, Slider, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useElement from "../../hooks/useElement";
import useSelected from "../../hooks/useSelected";

const URL_PREFIX = "/sprites/";
const URL_SUFFIX = ".png";

export default function TaskPanel() {
    const [selectedID] = useSelected();
    const [element, setElement] = useElement(selectedID);

    if (selectedID === "")
        return null;
    if (!element.type.startsWith("task"))
        return null;

    return (
        <Box>
            <Divider />
            <Typography
                variant="subtitle2"
                noWrap
                sx={{
                    m: 2
                }}>
                Task
            </Typography>
            <Divider />

            <Box sx={{
                p: 2,
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
            }}>
                <img
                    src={URL_PREFIX + element.type + URL_SUFFIX}
                    alt={element.name}
                />
                <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{
                        m: 2
                    }}>
                    {element.name} <br />
                    {element.type}
                </Typography>
            </Box>

            <Grid
                container
                spacing={2}
                sx={{
                    p: 2,
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}>
                <Grid item xs={12}>
                    <FormControlLabel control={<Switch defaultChecked />} label="Only From Bottom" />
                </Grid>
            </Grid>
        </Box>

    );
}