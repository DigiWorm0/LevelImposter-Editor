import { Check, Delete } from "@mui/icons-material";
import { Box, Button, ButtonGroup, MenuItem, Select } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { MaybeGUID } from "../../../types/generic/GUID";
import useDeleteKeyframe from "../../../hooks/elements/anim/useDeleteKeyframe";
import useKeyframe from "../../../hooks/elements/anim/useKeyframe";
import NumericPanelInput from "../input/panel/NumericPanelInput";
import InputGroup from "../input/InputGroup";

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
            <NumericPanelInput
                name={t("anim.time")}
                value={keyframe.t}
                onChange={t => setKeyframe({ ...keyframe, t })}
            />
            <InputGroup>
                <NumericPanelInput
                    name={t("transform.x")}
                    value={keyframe.x ?? 0}
                    onChange={x => setKeyframe({ ...keyframe, x })}
                />
                <NumericPanelInput
                    name={t("transform.y")}
                    value={keyframe.y ?? 0}
                    onChange={y => setKeyframe({ ...keyframe, y })}
                />
            </InputGroup>
            <InputGroup>
                <NumericPanelInput
                    name={t("transform.xScale")}
                    value={keyframe.xScale ?? 1}
                    onChange={xScale => setKeyframe({ ...keyframe, xScale })}
                />
                <NumericPanelInput
                    name={t("transform.yScale")}
                    value={keyframe.yScale ?? 1}
                    onChange={yScale => setKeyframe({ ...keyframe, yScale })}
                />
            </InputGroup>
            <NumericPanelInput
                name={t("transform.rotation")}
                value={keyframe.rotation ?? 0}
                onChange={rotation => setKeyframe({ ...keyframe, rotation })}
            />

            <Select
                value={keyframe.nextCurve ?? "linear"}
                onChange={(e) => setKeyframe({ ...keyframe, nextCurve: e.target.value as any })}
                fullWidth
                size={"small"}
            >
                <MenuItem value={"linear"}>{t("anim.linear")}</MenuItem>
                <MenuItem value={"easeIn"}>{t("anim.easeIn")}</MenuItem>
                <MenuItem value={"easeOut"}>{t("anim.easeOut")}</MenuItem>
                <MenuItem value={"easeInOut"}>{t("anim.easeInOut")}</MenuItem>
            </Select>


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