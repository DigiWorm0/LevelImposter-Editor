import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useElement from "../../hooks/useElement";
import GUID from "../../types/GUID";

export default function TransformPanel(props: { elementID: GUID }) {
    const [elem, setElement] = useElement(props.elementID);

    const [name, setName] = React.useState(elem ? elem.name : "");
    const [x, setX] = React.useState(elem ? elem.x : 0);
    const [y, setY] = React.useState(elem ? elem.y : 0);
    const [z, setZ] = React.useState(elem ? elem.z : 0);
    const [xScale, setXScale] = React.useState(elem ? elem.xScale : 1);
    const [yScale, setYScale] = React.useState(elem ? elem.yScale : 1);
    const [rotation, setRotation] = React.useState(elem ? elem.rotation : 0);

    React.useEffect(() => {
        if (elem) {
            setName(elem.name);
            setX(elem.x);
            setY(elem.y);
            setZ(elem.z);
            setXScale(elem.xScale);
            setYScale(elem.yScale);
            setRotation(elem.rotation);
        }
        console.log("ELEM");
    }, [props.elementID, elem]);

    React.useEffect(() => {
        if (elem) {
            elem.name = name;
            elem.x = x;
            elem.y = y;
            elem.z = z;
            elem.xScale = xScale;
            elem.yScale = yScale;
            elem.rotation = rotation;
            setElement(elem);
        }
        console.log("TRANSFORM");
    }, [name, x, y, z, xScale, yScale, rotation]);
    return (
        <Box sx={{
            p: 1
        }}>

            <TextField
                id="name"
                label="Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
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
                        onChange={(e) => setX(parseFloat(e.target.value))}
                        value={x}
                        variant="outlined" />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="yPosition"
                        label="Y"
                        type="number"
                        onChange={(e) => setY(parseFloat(e.target.value))}
                        value={y}
                        variant="outlined" />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="zPosition"
                        label="Z"
                        type="number"
                        onChange={(e) => setZ(parseFloat(e.target.value))}
                        value={z}
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
                        onChange={(e) => setXScale(parseFloat(e.target.value))}
                        value={xScale}
                        variant="outlined" />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="yScale"
                        label="Y Scale"
                        type="number"
                        onChange={(e) => setYScale(parseFloat(e.target.value))}
                        value={yScale}
                        variant="outlined" />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="rotation"
                        label="Rotation"
                        type="number"
                        onChange={(e) => setRotation(parseFloat(e.target.value))}
                        value={rotation}
                        variant="outlined" />
                </Grid>
            </Grid>
        </Box>
    );
}