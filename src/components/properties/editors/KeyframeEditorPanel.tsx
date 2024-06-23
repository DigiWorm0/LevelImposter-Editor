import { Check, Delete } from "@mui/icons-material";
import { Box, Button, ButtonGroup } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { MaybeGUID } from "../../../types/generic/GUID";
import useDeleteKeyframe from "../../../hooks/elements/anim/useDeleteKeyframe";
import useKeyframe from "../../../hooks/elements/anim/useKeyframe";

interface KeyframeEditorProps {
    keyframeID: MaybeGUID;
    setSelectedKeyframeID: (id: MaybeGUID) => void;
}

export default function KeyframeEditorPanel(props: KeyframeEditorProps) {
    const { t } = useTranslation();
    const deleteKeyframe = useDeleteKeyframe();
    const [keyframe, setKeyframe] = useKeyframe(props.keyframeID);

    if (!keyframe)
        return null;
    return (
        <Box sx={{ padding: 1 }}>

            <ButtonGroup style={{ marginTop: 10 }} fullWidth>
                <Button
                    fullWidth
                    size={"small"}
                    variant={"contained"}
                    color="success"
                    onClick={() => props.setSelectedKeyframeID(undefined)}
                >
                    <Check />
                </Button>
                <Button
                    fullWidth
                    size={"small"}
                    variant={"contained"}
                    color="error"
                    onClick={() => deleteKeyframe(props.keyframeID)}
                >
                    <Delete />
                </Button>
            </ButtonGroup>
        </Box>
    );
}