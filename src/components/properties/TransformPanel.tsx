import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useMap, { setMap } from "../../hooks/useMap";

export default function TransformPanel(props: { elementID: string }) {
    const [map] = useMap();
    const tgtElement = map.elements.find(e => e.id === props.elementID);

    const [name, setName] = React.useState(tgtElement ? tgtElement.name : "");
    const [x, setX] = React.useState(tgtElement ? tgtElement.x : 0);
    const [y, setY] = React.useState(tgtElement ? tgtElement.y : 0);
    const [z, setZ] = React.useState(tgtElement ? tgtElement.z : 0);
    const [xScale, setXScale] = React.useState(tgtElement ? tgtElement.xScale : 1);
    const [yScale, setYScale] = React.useState(tgtElement ? tgtElement.yScale : 1);
    const [rotation, setRotation] = React.useState(tgtElement ? tgtElement.rotation : 0);

    React.useEffect(() => {
        if (tgtElement) {
            setName(tgtElement.name);
            setX(tgtElement.x);
            setY(tgtElement.y);
            setZ(tgtElement.z);
            setXScale(tgtElement.xScale);
            setYScale(tgtElement.yScale);
            setRotation(tgtElement.rotation);
        }
    }, [props.elementID, tgtElement]);

    React.useEffect(() => {
        if (tgtElement) {
            tgtElement.name = name;
            tgtElement.x = x;
            tgtElement.y = y;
            tgtElement.z = z;
            tgtElement.xScale = xScale;
            tgtElement.yScale = yScale;
            tgtElement.rotation = rotation;
            setMap(map);
        }
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