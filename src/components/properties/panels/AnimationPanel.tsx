import { Button, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import ElementSelect from "../input/select/ElementSelect";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import DropdownList from "../util/DropdownList";
import { Add } from "@mui/icons-material";
import generateGUID from "../../../utils/strings/generateGUID";
import LIAnimKeyframe, { DEFAULT_KEYFRAMES } from "../../../types/li/LIAnimKeyframe";
import KeyframeEditorPanel from "../editors/KeyframeEditorPanel";
import { useSelectedKeyframeID } from "../../../hooks/elements/anim/useSelectedKeyframe";

export default function AnimationPanel() {
    const { t } = useTranslation();
    const isAnim = useIsSelectedElemType("util-triggeranim");
    const [animTargetID, setAnimTargetID] = useSelectedElemProp("animTargetID");
    const [selectedKeyframeID, setSelectedKeyframeID] = useSelectedKeyframeID();
    const [_animKeyframes, setAnimKeyframes] = useSelectedElemProp("animKeyframes");
    const animKeyframes: LIAnimKeyframe[] = _animKeyframes ?? DEFAULT_KEYFRAMES;

    const addKeyframe = React.useCallback(() => {
        const newKeyframe: LIAnimKeyframe = { id: generateGUID(), t: 0 };
        setAnimKeyframes([...animKeyframes, newKeyframe]);
    }, [animKeyframes, setAnimKeyframes]);

    if (!isAnim)
        return null;

    return (
        <PanelContainer title={t("anim.title")}>
            <Typography variant={"subtitle2"} sx={{ m: 1 }}>
                {t("anim.target")}
            </Typography>
            <ElementSelect
                typeFilter={"util-blanktrigger"}
                noElementsText={t("anim.noTargets")}
                defaultText={t("anim.selectTarget")}
                selectedID={animTargetID}
                onPick={(elem) => setAnimTargetID(elem?.id)}
                onReset={() => setAnimTargetID(undefined)}
            />

            <Typography variant={"subtitle2"} sx={{ m: 1 }}>
                {t("anim.keyframes")}
            </Typography>
            <DropdownList
                elements={animKeyframes.map((keyframe, index) => ({
                    id: keyframe.id,
                    name: index.toString(),
                    intent: "success",
                    icon: "Edit"
                }))}
                selectedID={selectedKeyframeID}
                onSelectID={setSelectedKeyframeID}
                renderElement={(element) => (
                    <KeyframeEditorPanel
                        keyframeID={element.id}
                        setSelectedKeyframeID={setSelectedKeyframeID}
                    />
                )}
            />

            <Button
                size={"small"}
                fullWidth
                endIcon={<Add />}
                onClick={addKeyframe}
                color={"inherit"}
            >
                {t("anim.addKeyframe") as string}
            </Button>
        </PanelContainer>
    );
}
