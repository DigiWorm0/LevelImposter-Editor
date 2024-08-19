import React from "react";
import Draggable from "react-draggable";
import {useTimelineScaleValue} from "../../../hooks/timeline/useTimelineScale";
import useTimelineInterval from "../../../hooks/timeline/useTimelineInterval";
import DiamondSVG from "./DiamondSVG";
import useTimelineOffset from "../../../hooks/timeline/useTimelineOffset";

export interface TimelineKeyframeIconProps {
    t: number;
    setT: (t: number) => void;
}

export default function TimelineKeyframe(props: TimelineKeyframeIconProps) {
    const timelineScale = useTimelineScaleValue();
    const timelineInterval = useTimelineInterval();
    const [timelineOffset] = useTimelineOffset();

    const isSelected = false;

    return (
        <Draggable
            axis="x"
            position={{
                x: (props.t - timelineOffset) * timelineScale,
                y: 0
            }}
            grid={[timelineScale * timelineInterval, 0]}
            onStop={(_, {x}) => {
                let t = x / timelineScale;
                t = Math.round(t / timelineInterval) * timelineInterval;
                props.setT(t);
            }}
            positionOffset={{x: 0, y: 0}}
            bounds={{left: 0}}
        >
            <div
                style={{
                    backgroundColor: isSelected ? "#206b95" : "#20506c",
                    borderRadius: 2,
                    padding: "0 2px",
                    height: "100%",
                    width: 10,
                    position: "absolute",
                    top: 0,
                    textAlign: "center",
                    cursor: "pointer"
                }}
            >
                <DiamondSVG
                    size={8}
                    color={isSelected ? "white" : "#ccc"}
                />

            </div>
        </Draggable>
    );
}