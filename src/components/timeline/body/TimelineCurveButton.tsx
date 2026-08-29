import useCurrentCurve from "../../../hooks/timeline/useCurrentCurve";
import GUID from "../../../types/common/GUID";
import LIAnimPropertyType from "../../../types/li/LIAnimPropertyType";
import {IconButton, InputAdornment, MenuItem, Popover, Tooltip} from "@mui/material";
import LinearSVG from "../icons/LinearSVG";
import EaseInSVG from "../icons/EaseInSVG";
import EaseOutSVG from "../icons/EaseOutSVG";
import EaseInOutSVG from "../icons/EaseInOutSVG";
import React from "react";
import LIAnimCurve from "../../../types/li/LIAnimCurve";
import {useTranslation} from "react-i18next";
import executeCommand from "@editor/history/executeCommand";
import {setAnimationCurve} from "@editor/commands/animators/setAnimationCurve";

export interface TimelinePropertyProps {
    targetID: GUID;
    property: LIAnimPropertyType;
}

const MENU_ITEMS: LIAnimCurve[] = ["linear", "easeIn", "easeOut", "easeInOut"];

export default function TimelineCurveButton(props: TimelinePropertyProps) {
    const currentCurve = useCurrentCurve(props);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {t} = useTranslation();

    return (
        <>
            {currentCurve && (
                <InputAdornment position={"end"}>
                    <Tooltip
                        title={t(`anim.${currentCurve}`)}
                    >
                        <IconButton
                            sx={{padding: "5px"}}
                            onClick={(e: Event) => setAnchorEl(e.currentTarget as HTMLElement)}
                        >
                            {currentCurve === "linear" && <LinearSVG size={18}/>}
                            {currentCurve === "easeIn" && <EaseInSVG size={18}/>}
                            {currentCurve === "easeOut" && <EaseOutSVG size={18}/>}
                            {currentCurve === "easeInOut" && <EaseInOutSVG size={18}/>}
                        </IconButton>
                    </Tooltip>
                </InputAdornment>
            )}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                {MENU_ITEMS.map((curve) => (
                    <MenuItem
                        key={curve}
                        value={"linear"}
                        onClick={() => {
                            executeCommand(setAnimationCurve(
                                props.targetID,
                                props.property,
                                curve
                            ));
                            setAnchorEl(null);
                        }}
                    >
                        {t(`anim.${curve}`)}
                    </MenuItem>
                ))}
            </Popover>
        </>
    );
}