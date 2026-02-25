import {Button} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import useTimelineVisible from "../../../hooks/timeline/useTimelineVisible";

export default function AnimationPanel() {
    const {t} = useTranslation();
    const isAnim = useIsSelectedElemType("util-triggeranim");
    const [isTimelineVisible, setTimelineVisible] = useTimelineVisible();

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
        </PanelContainer>
    );
}
