import React from "react";
import Draggable from "react-draggable";
import {useTimelineScaleValue} from "../../../hooks/timeline/useTimelineScale";
import useTimelineInterval from "../../../hooks/timeline/useTimelineInterval";
import DiamondSVG from "../icons/DiamondSVG";
import useTimelineOffset from "../../../hooks/timeline/useTimelineOffset";
import {useSetPlayhead} from "../../../hooks/timeline/usePlayhead";
import {useSettingsValue} from "../../../hooks/useSettings";

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
    const {isTimelineSnapEnabled} = useSettingsValue();
    const [currentT, setCurrentT] = React.useState(props.t);
    const [isDragging, setIsDragging] = React.useState(false);

    // Keep currentT in sync with props.t
    // Seperated from t to prevent undo/redo history from being polluted
    React.useEffect(() => {
        setCurrentT(props.t);
    }, [props.t]);

    // Snaps a time value to the timeline interval
    const snapToInterval = (t: number) => {
        if (isTimelineSnapEnabled)
            return Math.round(t / timelineInterval) * timelineInterval;
        return t;
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            axis="x"
            position={{
                x: currentT * timelineScale,
                y: 0
            }}
            positionOffset={{
                x: -timelineOffset * timelineScale,
                y: 0
            }}
            grid={isTimelineSnapEnabled ? [timelineScale * timelineInterval, 0] : undefined}
            onDrag={(_, {x}) => {
                const t = snapToInterval(x / timelineScale);
                setPlayhead(t);
                setCurrentT(t);
                setIsDragging(true);
            }}
            onStop={(_, {x}) => {
                // Prevents bug where clicking on a keyframe would move it
                if (isDragging) {
                    const t = snapToInterval(x / timelineScale);
                    props.setT(t);
                    setCurrentT(t);
                    setPlayhead(t);
                }

                setIsDragging(false);
            }}
            bounds={{left: 0}}
            onMouseDown={() => {
                props.select();
                setPlayhead(props.t);
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