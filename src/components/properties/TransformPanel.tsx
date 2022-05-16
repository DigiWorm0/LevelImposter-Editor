import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useElement from "../../hooks/useElement";
import useSelected from "../../hooks/useSelected";

export default function TransformPanel() {
    const [selectedID] = useSelected();
    const [element, setElement] = useElement(selectedID);

    const parseNum = (value: string) => {
        if (value === "") {
            return 0;
        }
        return parseFloat(value);
    }

    const onInput = () => {
        setElement(element);
    }

    if (selectedID === "")
        return null;

    return (
        <Box sx={{
            p: 1
        }}>

            <TextField
                id="name"
                label="Name"
                type="text"
                onChange={(e) => { element.name = e.target.value; onInput() }}
                value={element.name}
                variant="outlined"
                fullWidth />

            <Grid
                container
                spacing={1}
                pt={1}>
                <Grid item xs>
                    <TextField
                        id="xPosition"
                        label="X"
                        type="number"
                        onChange={(e) => { element.x = parseNum(e.target.value); onInput() }}
                        value={element.x}
                        variant="outlined" />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="yPosition"
                        label="Y"
                        type="number"
                        onChange={(e) => { element.y = parseNum(e.target.value); onInput() }}
                        value={element.y}
                        variant="outlined" />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="zPosition"
                        label="Z"
                        type="number"
                        onChange={(e) => { element.z = parseNum(e.target.value); onInput() }}
                        value={element.z}
                        variant="outlined" />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={1}
                pt={1}>
                <Grid item xs>
                    <TextField
                        id="xScale"
                        label="X Scale"
                        type="number"
                        onChange={(e) => { element.xScale = parseNum(e.target.value); onInput() }}
                        value={element.xScale}
                        variant="outlined" />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="yScale"
                        label="Y Scale"
                        type="number"
                        onChange={(e) => { element.yScale = parseNum(e.target.value); onInput() }}
                        value={element.yScale}
                        variant="outlined" />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="rotation"
                        label="Rotation"
                        type="number"
                        onChange={(e) => { element.rotation = parseNum(e.target.value); onInput() }}
                        value={element.rotation}
                        variant="outlined" />
                </Grid>
            </Grid>
        </Box>
    );
}