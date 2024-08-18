import {IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";
import LazyCollapse from "../properties/util/LazyCollapse";
import LIElement from "../../types/li/LIElement";
import AnimatedCaretIcon from "../utils/AnimatedCaretIcon";
import TimelineRow from "./TimelineRow";
import TimelineKeyframeRow from "./TimelineKeyframeRow";
import TimelineProperty from "./TimelineProperty";
import GUID from "../../types/generic/GUID";
import useSelectedElemProp from "../../hooks/elements/useSelectedElemProperty";
import {useElementValue} from "../../hooks/elements/useElements";
import {Delete} from "@mui/icons-material";
import TimelinePlayhead from "./TimelinePlayhead";

const PROPERTIES: (keyof LIElement)[] = [
    "x",
    "y",
    "z",
    "xScale",
    "yScale",
    "rotation",
];

export interface TimelineElementProps {
    id: GUID;
}

export default function TimelineElement(props: TimelineElementProps) {
    const [animTargets, setAnimTargets] = useSelectedElemProp("animTargets");
    const [isExpanded, setIsExpanded] = React.useState(false);

    const animTarget = animTargets?.find((t) => t.id === props.id);
    const animTargetElem = useElementValue(animTarget?.elementID);

    const deleteElement = () => {
        if (animTarget === undefined)
            return;

        setAnimTargets(animTargets?.filter((t) => t.id !== animTarget.id));
    };

    return (
        <>
            <TimelineRow
                header={(
                    <ListItem
                        sx={{padding: 0}}
                        secondaryAction={(
                            <IconButton size={"small"} onClick={deleteElement}>
                                <Delete fontSize={"small"}/>
                            </IconButton>
                        )}
                    >
                        <ListItemButton
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <ListItemIcon>
                                <AnimatedCaretIcon up={!isExpanded}/>
                            </ListItemIcon>
                            <ListItemText primary={animTargetElem?.name}/>
                        </ListItemButton>
                    </ListItem>
                )}
            >
                <TimelineKeyframeRow>
                    <TimelinePlayhead/>
                </TimelineKeyframeRow>
            </TimelineRow>
            <LazyCollapse in={isExpanded}>
                {PROPERTIES.map((property) => (
                    <TimelineProperty
                        key={property}
                        targetID={props.id}
                        property={property}
                    />
                ))}
            </LazyCollapse>
        </>
    );
}