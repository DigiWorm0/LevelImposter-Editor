import {Circle} from "@mui/icons-material";
import React from "react";
import Draggable from "react-draggable";
import {useTimelineScaleValue} from "../../hooks/timeline/useTimelineScale";
import useTimelineInterval from "../../hooks/timeline/useTimelineInterval";

export interface TimelineKeyframeIconProps {
    t: number;
    setT: (t: number) => void;
}

const PADDING_LEFT = 6; // px

export default function TimelineKeyframe(props: TimelineKeyframeIconProps) {
    const timelineScale = useTimelineScaleValue();
    const timelineInterval = useTimelineInterval();

    return (
        <Draggable
            axis="x"
            position={{
                x: props.t * timelineScale,
                y: 0
            }}
            grid={[timelineScale * timelineInterval, 0]}
            onDrag={(_, {x}) => {
                let t = x / timelineScale;
                t = Math.round(t / timelineInterval) * timelineInterval;
                props.setT(t);
            }}
            positionOffset={{x: 0, y: 0}}
            bounds={{left: 0}}
        >
            <div
                style={{
                    backgroundColor: "#206b95",
                    padding: "0 2px",
                    borderRadius: 1,
                    height: "100%",
                    width: 10,
                    position: "absolute",
                    top: 0,
                    cursor: "pointer"
                }}
            >
                <Circle
                    sx={{fontSize: 10}}
                />

            </div>
        </Draggable>
    );
}