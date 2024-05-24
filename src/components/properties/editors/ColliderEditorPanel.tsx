import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import { MaybeGUID } from "../../../types/generic/GUID";
import { Box, Button, ButtonGroup, Collapse, FormControlLabel, Switch, TextField } from "@mui/material";
import { Check, Delete, ExpandLess } from "@mui/icons-material";
import InputGroup from "../input/InputGroup";
import useDeleteCollider from "../../../hooks/map/elements/colliders/useDeleteCollider";
import useCollider from "../../../hooks/map/elements/colliders/useCollider";
import FlexNumericInput from "../util/FlexNumericInput";

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
    const deleteCollider = useDeleteCollider();
    const [collider, setCollider] = useCollider(props.colliderID);

    const updatePoint = React.useCallback((x: number, y: number, index: number) => {
        if (!collider)
            return;
        const points = collider.points.map((p, i) => {
            if (i === index)
                return { x, y };
            return p;
        });
        setCollider({ ...collider, points });
    }, [collider, setCollider]);

    const updatePointCount = React.useCallback((count: number) => {
        if (!collider)
            return;
        const points = collider.points;
        if (count > points.length) {
            for (let i = points.length; i < count; i++) {
                points.push({ x: 0, y: 0 });
            }
        } else {
            points.splice(count);
        }
        setCollider({ ...collider, points });
    }, [collider, setCollider]);

    if (!selectedElem || !collider)
        return null;

    return (
        <Box sx={{ padding: 1 }}>
            <TextField
                size={"small"}
                fullWidth
                placeholder={t("collider.name") as string}
                value={collider.name}
                onChange={(e) => setCollider({ ...collider, name: e.target.value })}
                sx={{
                    mb: 1
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
                        onChange={(e) => setCollider({ ...collider, blocksLight: e.currentTarget.checked })}
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
                <FlexNumericInput
                    value={collider.points.length}
                    onChange={(value) => updatePointCount(value)}
                    inputProps={{
                        fullWidth: true
                    }}
                />
                {collider.points.map((point, index) => (
                    <InputGroup key={index}>
                        <FlexNumericInput
                            value={point.x}
                            onChange={(value) => updatePoint(value, point.y, index)}
                        />
                        <FlexNumericInput
                            value={point.y}
                            onChange={(value) => updatePoint(point.x, value, index)}
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
                    onClick={() => deleteCollider(props.colliderID)}
                >
                    <Delete />
                </Button>
            </ButtonGroup>
        </Box>
    )
}