import {Check, Delete} from "@mui/icons-material";
import {Box, Button, ButtonGroup, FormControlLabel, Switch, TextField} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import GUID, {MaybeGUID} from "../../../types/common/GUID";
import AnimatedCaretIcon from "../../utils/AnimatedCaretIcon";
import LazyCollapse from "../util/LazyCollapse";
import ColliderPointsEditorPanel from "./ColliderPointsEditorPanel";
import {useAtomValue} from "jotai";
import {colliderAtomFamily} from "@editor/selection/stores/colliderSelectionStore";
import executeCommand from "../../../editor/history/executeCommand";
import {
    setColliderBlocksLight,
    setColliderName,
    setColliderSolid
} from "@editor/elements/colliders/setColliderProperties";
import {deleteCollider} from "@editor/elements/colliders/deleteCollider";

interface ColliderEditorProps {
    isSolidOnly: boolean;
    isShadowOnly: boolean;
    isEdgeOnly: boolean;

    colliderID: GUID;
    setSelectedColliderID: (id: MaybeGUID) => void;
}

export default function ColliderEditorPanel(props: ColliderEditorProps) {
    const {t} = useTranslation();
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const collider = useAtomValue(colliderAtomFamily(props.colliderID));

    if (!collider)
        return null;

    return (
        <Box sx={{padding: 1}}>
            <TextField
                size={"small"}
                fullWidth
                placeholder={t("collider.name") as string}
                value={collider.name}
                onChange={e => executeCommand(setColliderName(
                    props.colliderID,
                    e.currentTarget.value
                ))}
                sx={{mb: 1}}
            />
            <FormControlLabel
                label={t("collider.solid") as string}
                control={
                    <Switch
                        checked={collider.isSolid}
                        disabled={props.isSolidOnly || props.isShadowOnly || props.isEdgeOnly}
                        onChange={e => executeCommand(setColliderSolid(
                            props.colliderID,
                            e.currentTarget.checked
                        ))}
                    />
                }
            />

            <FormControlLabel
                label={t("collider.blocksLight") as string}
                control={
                    <Switch
                        checked={collider.blocksLight}
                        disabled={props.isSolidOnly || props.isShadowOnly || props.isEdgeOnly}
                        onChange={e => executeCommand(setColliderBlocksLight(
                            props.colliderID,
                            e.currentTarget.checked
                        ))}
                    />
                }
            />
            <Button
                fullWidth
                onClick={() => setIsCollapsed(!isCollapsed)}
                endIcon={<AnimatedCaretIcon up={!isCollapsed}/>}
            >
                {t("collider.points") as string}
            </Button>

            <LazyCollapse in={isCollapsed}>
                <ColliderPointsEditorPanel colliderID={props.colliderID}/>
            </LazyCollapse>

            <ButtonGroup style={{marginTop: 10}} fullWidth>
                <Button
                    fullWidth
                    size={"small"}
                    variant={"contained"}
                    color="success"
                    onClick={() => props.setSelectedColliderID(undefined)}
                >
                    <Check/>
                </Button>
                <Button
                    fullWidth
                    size={"small"}
                    variant={"contained"}
                    color="error"
                    onClick={() => executeCommand(deleteCollider(props.colliderID))}
                >
                    <Delete/>
                </Button>
            </ButtonGroup>
        </Box>
    );
}