import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";
import LazyCollapse from "../properties/util/LazyCollapse";
import LIElement from "../../types/li/LIElement";
import AnimatedCaretIcon from "../utils/AnimatedCaretIcon";
import TimelineRow from "./TimelineRow";
import TimelineKeyframeRow from "./TimelineKeyframeRow";
import TimelineProperty from "./TimelineProperty";

const PROPERTIES: (keyof LIElement)[] = [
    "x",
    "y",
    "z",
    "xScale",
    "yScale",
    "rotation",
];

export default function TimelineElement() {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <>
            <TimelineRow
                header={(
                    <ListItemButton
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <ListItemIcon>
                            <AnimatedCaretIcon up={!isExpanded}/>
                        </ListItemIcon>
                        <ListItemText primary={"Trigger Sprite"}/>
                    </ListItemButton>
                )}
            >
                <TimelineKeyframeRow/>
            </TimelineRow>
            <LazyCollapse in={isExpanded}>
                {PROPERTIES.map((property) => (
                    <TimelineProperty
                        key={property}
                        property={property}
                    />
                ))}
            </LazyCollapse>
        </>
    );
}