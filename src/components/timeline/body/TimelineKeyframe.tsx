import React from "react";
import Draggable from "react-draggable";
import {useTimelineScaleValue} from "../../../hooks/timeline/useTimelineScale";
import useTimelineInterval from "../../../hooks/timeline/useTimelineInterval";
import DiamondSVG from "../icons/DiamondSVG";
import useTimelineOffset from "../../../hooks/timeline/useTimelineOffset";
import {useSetPlayhead} from "../../../hooks/timeline/usePlayhead";
import {useHotkeysContext} from "react-hotkeys-hook";

export interface TimelineKeyframeIconProps {
    t: number;
    setT: (t: number) => void;

    selected?: boolean;
    select: () => void;
}

export default function TimelineKeyframe(props: TimelineKeyframeIconProps) {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const timelineScale = useTimelineScaleValue();
    const timelineInterval = useTimelineInterval();
    const [timelineOffset] = useTimelineOffset();
    const setPlayhead = useSetPlayhead();
    const {enableScope, disableScope} = useHotkeysContext();

    return (
        <Draggable
            nodeRef={nodeRef}
            axis="x"
            position={{
                x: (props.t - timelineOffset) * timelineScale,
                y: 0
            }}
            grid={[timelineScale * timelineInterval, 0]}
            onDrag={(_, {x}) => {
                const t = x / timelineScale;
                setPlayhead(t);
            }}
            onStop={(_, {x}) => {
                let t = x / timelineScale;
                t = Math.round(t / timelineInterval) * timelineInterval;
                props.setT(t);
            }}
            positionOffset={{x: 0, y: 0}}
            bounds={{left: 0}}
            onMouseDown={(e) => {
                e.stopPropagation();
                props.select();
                setPlayhead(props.t);
                console.log("select", document.activeElement, nodeRef.current);
                nodeRef.current?.focus();
            }}
        >
            <div
                ref={nodeRef}
                onFocus={() => console.log("focus")}
                onBlur={() => console.log("blur")}
                style={{
                    backgroundColor: props.selected ? "#237abb" : "#20506c",
                    borderRadius: 2,
                    padding: "0 2px",
                    height: "100%",
                    width: 10,
                    position: "absolute",
                    top: 0,
                    textAlign: "center",
                    cursor: "pointer",
                    zIndex: props.selected ? 1 : 0
                }}
            >
                <DiamondSVG
                    size={8}
                    color={props.selected ? "white" : "#999"}
                />
            </div>
        </Draggable>
    );
}