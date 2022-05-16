import { HorizontalRule, Image } from "@mui/icons-material";
import { Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Slider, Switch, TextField, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useElement from "../../hooks/useElement";
import useSelected from "../../hooks/useSelected";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import DeleteIcon from '@mui/icons-material/Delete';
import generateGUID from "../../hooks/generateGUID";
import GUID from "../../types/generic/GUID";
import LICollider from "../../types/li/LICollider";

const URL_PREFIX = "/sprites/";
const URL_SUFFIX = ".png";

export default function ColliderPanel() {
    const [selectedID] = useSelected();
    const [element, setElement] = useElement(selectedID);
    const [currentCollider, setCurrentCollider] = React.useState(null as null | LICollider);

    // Stop Editing on Element Change
    React.useEffect(() => {
        if (currentCollider) {
            if (element.properties.colliders?.find((collider) => collider.id === currentCollider.id) == null) {
                setCurrentCollider(null);
            }
        }
    }, [element]);

    const addCollider = () => {
        if (!element.properties.colliders)
            element.properties.colliders = [];
        element.properties.colliders.push({
            id: generateGUID(),
            blocksLight: false,
            isSolid: false,
            points: [],
        });
        setElement(element);
    }
    const editCollider = (collider: LICollider | null) => {
        setCurrentCollider(collider);
    }
    const delCollider = (collider: LICollider) => {
        element.properties.colliders = element.properties.colliders?.filter(c => c.id !== collider.id);
        setElement(element);
    }
    const onBlockLightChange = (collider: LICollider) => {
        collider.blocksLight = !collider.blocksLight;
        setElement(element);
    }
    const onSolidChange = (collider: LICollider) => {
        collider.isSolid = !collider.isSolid;
        setElement(element);
    }

    if (selectedID === "")
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
                Colliders
            </Typography>

            <Divider />
            {element.properties.colliders ? element.properties.colliders.map((collider, index) => {
                return (<Box key={index}>
                    <Box
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}>

                        <Typography
                            variant="subtitle1"
                            noWrap
                            sx={{
                                pr: 2
                            }}>
                            {index + 1}
                        </Typography>

                        {currentCollider === collider ?
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => { editCollider(null); }}
                                sx={{
                                    m: 1
                                }}>
                                <EditOffIcon />
                            </Button>
                            :
                            <Button
                                variant="contained"
                                onClick={() => { editCollider(collider); }}
                                sx={{
                                    m: 1
                                }}>
                                <EditIcon />
                            </Button>
                        }
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => { delCollider(collider); }}>
                            <DeleteIcon />
                        </Button>
                    </Box>
                    {currentCollider === collider ?
                        <Box
                            sx={{
                                p: 2,
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={collider.blocksLight} onChange={() => { onBlockLightChange(collider); }} />} label="Blocks Light" />
                                <FormControlLabel control={<Checkbox checked={!collider.isSolid} onChange={() => { onSolidChange(collider); }} />} label="Hollow" />
                            </FormGroup>
                        </Box>
                        : null}
                </Box>);
            }) : null}

            <Box
                sx={{
                    p: 2,
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}>
                <Button variant="contained" onClick={addCollider}>
                    + Collider
                </Button>
            </Box>

        </Box>
    );
}