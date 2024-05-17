import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import { MaybeGUID } from "../../../types/generic/GUID";
import { Box, Button, ButtonGroup, Collapse, FormControlLabel, Switch, TextField } from "@mui/material";
import { Check, Delete, ExpandLess } from "@mui/icons-material";
import InputGroup from "../input/InputGroup";

interface ColliderEditorProps {
    isSolidOnly: boolean;
    isShadowOnly: boolean;
    isEdgeOnly: boolean;

    colliderID: MaybeGUID;
    setSelectedColliderID: (id: MaybeGUID) => void;
}

export default function ColliderEditorPanel(props: ColliderEditorProps) {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const colliderID = props.colliderID;
    const collider = React.useMemo(() => {
        return selectedElem?.properties.colliders?.find(c => c.id === colliderID);
    }, [selectedElem, props.colliderID]);

    const deleteCollider = React.useCallback(() => {
        if (!selectedElem)
            return;
        const filteredColliders = selectedElem.properties.colliders?.filter(c => c.id !== colliderID);
        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, colliders: filteredColliders } });
        props.setSelectedColliderID(undefined);
    }, [selectedElem, colliderID, props.setSelectedColliderID]);

    if (!selectedElem || !collider)
        return null;

    return (
        <Box sx={{ padding: 1 }}>
            <TextField
                size={"small"}
                fullWidth
                placeholder={t("collider.name") as string}
                value={collider.name}
                onChange={(e) => {
                    collider.name = e.target.value;
                    setSelectedElem({ ...selectedElem });
                }}
                style={{
                    marginBottom: 10
                }}
            />
            <FormControlLabel
                label={t("collider.solid") as string}
                control={
                    <Switch
                        checked={collider.isSolid}
                        disabled={props.isSolidOnly || props.isShadowOnly || props.isEdgeOnly}
                        onChange={(e) => {
                            collider.isSolid = e.currentTarget.checked;
                            setSelectedElem({ ...selectedElem });
                        }}
                    />
                }
            />

            <FormControlLabel
                label={t("collider.blocksLight") as string}
                control={
                    <Switch
                        checked={collider.blocksLight}
                        disabled={props.isSolidOnly || props.isShadowOnly || props.isEdgeOnly}
                        onChange={(e) => {
                            collider.blocksLight = e.currentTarget.checked;
                            setSelectedElem({ ...selectedElem });
                        }}
                    />
                } />
            <Button
                fullWidth
                onClick={() => setIsCollapsed(!isCollapsed)}
                endIcon={
                    <ExpandLess
                        style={{
                            transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s"
                        }}
                    />
                }
            >
                {t("collider.points") as string}
            </Button>

            <Collapse in={isCollapsed}>
                <TextField
                    fullWidth
                    disabled={!collider}
                    label={t("collider.points") as string}
                    size={"small"}
                    value={collider.points.length}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value < 0)
                            return;
                        const points = [];
                        for (let i = 0; i < value; i++) {
                            if (i < collider.points.length)
                                points.push({
                                    x: collider.points[i].x,
                                    y: collider.points[i].y
                                });
                            else
                                points.push({ x: 0, y: 0 });
                        }
                        collider.points = points;
                        setSelectedElem({ ...selectedElem });
                    }}
                    InputProps={{
                        type: "number",
                        inputProps: {
                            min: 2,
                            stepSize: 1
                        }
                    }}
                />


                {collider.points.map((point, index) => (
                    <InputGroup key={index}>
                        <TextField
                            size={"small"}
                            fullWidth
                            disabled={!collider}
                            value={point.x.toString()}
                            onChange={(e) => {
                                const points = collider.points.map((p, i) => {
                                    if (i === index)
                                        return { x: parseFloat(e.target.value), y: p.y };
                                    return p;
                                });
                                collider.points = points;
                                setSelectedElem({ ...selectedElem });
                            }}
                            InputProps={{
                                type: "number",
                                inputProps: {
                                    step: 0.01
                                }
                            }}
                        />
                        <TextField
                            size={"small"}
                            fullWidth
                            disabled={!collider}
                            value={point.y.toString()}
                            onChange={(e) => {
                                const points = collider.points.map((p, i) => {
                                    if (i === index)
                                        return { x: p.x, y: parseFloat(e.target.value) };
                                    return p;
                                });
                                collider.points = points;
                                setSelectedElem({ ...selectedElem });
                            }}
                            InputProps={{
                                type: "number",
                                inputProps: {
                                    step: 0.01
                                }
                            }}
                        />
                    </InputGroup>
                ))}
            </Collapse>

            <ButtonGroup style={{ marginTop: 10 }} fullWidth>
                <Button
                    fullWidth
                    size={"small"}
                    variant={"contained"}
                    color="success"
                    onClick={() => props.setSelectedColliderID(undefined)}
                >
                    <Check />
                </Button>
                <Button
                    fullWidth
                    size={"small"}
                    variant={"contained"}
                    color="error"
                    onClick={() => deleteCollider()}
                >
                    <Delete />
                </Button>
            </ButtonGroup>
        </Box>
    )
}