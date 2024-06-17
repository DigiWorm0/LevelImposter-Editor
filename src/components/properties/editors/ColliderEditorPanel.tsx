import { Check, Delete } from "@mui/icons-material";
import { Box, Button, ButtonGroup, FormControlLabel, Switch, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import useCollider from "../../../hooks/elements/colliders/useCollider";
import useDeleteCollider from "../../../hooks/elements/colliders/useDeleteCollider";
import { MaybeGUID } from "../../../types/generic/GUID";
import AnimatedCaretIcon from "../../utils/AnimatedCaretIcon";
import LazyCollapse from "../util/LazyCollapse";
import ColliderPointsEditorPanel from "./ColliderPointsEditorPanel";

interface ColliderEditorProps {
    isSolidOnly: boolean;
    isShadowOnly: boolean;
    isEdgeOnly: boolean;

    colliderID: MaybeGUID;
    setSelectedColliderID: (id: MaybeGUID) => void;
}

export default function ColliderEditorPanel(props: ColliderEditorProps) {
    const { t } = useTranslation();
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const deleteCollider = useDeleteCollider();
    const [collider, setCollider] = useCollider(props.colliderID);

    if (!collider)
        return null;

    return (
        <Box sx={{ padding: 1 }}>
            <TextField
                size={"small"}
                fullWidth
                placeholder={t("collider.name") as string}
                value={collider.name}
                onChange={(e) => setCollider({ ...collider, name: e.target.value })}
                sx={{ mb: 1 }}
            />
            <FormControlLabel
                label={t("collider.solid") as string}
                control={
                    <Switch
                        checked={collider.isSolid}
                        disabled={props.isSolidOnly || props.isShadowOnly || props.isEdgeOnly}
                        onChange={(e) => setCollider({ ...collider, isSolid: e.currentTarget.checked })}
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
                }
            />
            <Button
                fullWidth
                onClick={() => setIsCollapsed(!isCollapsed)}
                endIcon={<AnimatedCaretIcon up={!isCollapsed} />}
            >
                {t("collider.points") as string}
            </Button>

            <LazyCollapse in={isCollapsed}>
                <ColliderPointsEditorPanel colliderID={props.colliderID} />
            </LazyCollapse>

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
    );
}