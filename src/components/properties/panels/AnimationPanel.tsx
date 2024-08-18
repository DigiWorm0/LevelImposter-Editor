import {Button} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import useTimelineVisible from "../../../hooks/timeline/useTimelineVisible";

export default function AnimationPanel() {
    const {t} = useTranslation();
    const isAnim = useIsSelectedElemType("util-triggeranim");
    //const [animTargetID, setAnimTargetID] = useSelectedElemProp("animTargetID");
    //const [selectedKeyframeID, setSelectedKeyframeID] = useSelectedKeyframeID();
    //const [_animKeyframes, setAnimKeyframes] = useSelectedElemProp("animKeyframes");
    //const animKeyframes: LIAnimKeyframe[] = _animKeyframes ?? DEFAULT_KEYFRAMES;
    const [isTimelineVisible, setTimelineVisible] = useTimelineVisible();

    // const addKeyframe = React.useCallback(() => {
    //     const newKeyframe: LIAnimKeyframe = {id: generateGUID(), t: 0};
    //     setAnimKeyframes([...animKeyframes, newKeyframe]);
    // }, [animKeyframes, setAnimKeyframes]);

    if (!isAnim)
        return null;

    return (
        <PanelContainer title={t("anim.title")}>
            <Button
                size={"small"}
                fullWidth
                onClick={() => setTimelineVisible(!isTimelineVisible)}
                color={"primary"}
                variant={isTimelineVisible ? "contained" : "outlined"}
            >
                {t("anim.showTimeline")}
            </Button>

            {/*<Typography variant={"subtitle2"} sx={{m: 1}}>*/}
            {/*    {t("anim.target")}*/}
            {/*</Typography>*/}
            {/*<ElementSelect*/}
            {/*    typeFilter={"util-blanktrigger"}*/}
            {/*    noElementsText={t("anim.noTargets")}*/}
            {/*    defaultText={t("anim.selectTarget")}*/}
            {/*    selectedID={animTargetID}*/}
            {/*    onPick={(elem) => setAnimTargetID(elem?.id)}*/}
            {/*    onReset={() => setAnimTargetID(undefined)}*/}
            {/*/>*/}

            {/*<Typography variant={"subtitle2"} sx={{m: 1}}>*/}
            {/*    {t("anim.keyframes")}*/}
            {/*</Typography>*/}
            {/*<DropdownList*/}
            {/*    elements={animKeyframes.map((keyframe, index) => ({*/}
            {/*        id: keyframe.id,*/}
            {/*        name: index.toString(),*/}
            {/*        intent: "success",*/}
            {/*        icon: "Edit"*/}
            {/*    }))}*/}
            {/*    selectedID={selectedKeyframeID}*/}
            {/*    onSelectID={setSelectedKeyframeID}*/}
            {/*    renderElement={(element) => (*/}
            {/*        <KeyframeEditorPanel*/}
            {/*            keyframeID={element.id}*/}
            {/*            setSelectedKeyframeID={setSelectedKeyframeID}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*/>*/}

            {/*<Button*/}
            {/*    size={"small"}*/}
            {/*    fullWidth*/}
            {/*    endIcon={<Add/>}*/}
            {/*    onClick={addKeyframe}*/}
            {/*    color={"inherit"}*/}
            {/*>*/}
            {/*    {t("anim.addKeyframe") as string}*/}
            {/*</Button>*/}
        </PanelContainer>
    );
}
