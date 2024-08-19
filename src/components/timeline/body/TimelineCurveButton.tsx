import useCurrentCurve from "../../../hooks/timeline/useCurrentCurve";
import GUID from "../../../types/generic/GUID";
import LIAnimPropertyType from "../../../types/li/LIAnimPropertyType";
import {IconButton, InputAdornment, MenuItem, Popover} from "@mui/material";
import LinearSVG from "../icons/LinearSVG";
import EaseInSVG from "../icons/EaseInSVG";
import EaseOutSVG from "../icons/EaseOutSVG";
import EaseInOutSVG from "../icons/EaseInOutSVG";
import React from "react";
import LIAnimCurve from "../../../types/li/LIAnimCurve";

export interface TimelinePropertyProps {
    targetID: GUID;
    property: LIAnimPropertyType;
}

const MENU_ITEMS: LIAnimCurve[] = ["linear", "easeIn", "easeOut", "easeInOut"];

export default function TimelineCurveButton(props: TimelinePropertyProps) {
    const [curve, setCurve] = useCurrentCurve(props);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    return (
        <>
            {curve && (
                <InputAdornment position={"end"}>
                    <IconButton
                        sx={{padding: "5px"}}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                        {curve === "linear" && <LinearSVG size={20}/>}
                        {curve === "easeIn" && <EaseInSVG size={20}/>}
                        {curve === "easeOut" && <EaseOutSVG size={20}/>}
                        {curve === "easeInOut" && <EaseInOutSVG size={20}/>}
                    </IconButton>
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
                {MENU_ITEMS.map((item) => (
                    <MenuItem
                        key={item}
                        value={"linear"}
                        onClick={() => {
                            setCurve(item);
                            setAnchorEl(null);
                        }}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Popover>
        </>
    );
}