import React from "react";
import Draggable from "react-draggable";
import DiamondSVG from "../icons/DiamondSVG";
import {useSettingsValue} from "@/hooks/useSettings";
import {useAtomValue} from "jotai";
import {timelineScaleAtom} from "@editor/animators/animatorPlaybackStore";
import {setPlaybackState} from "@editor/animators/setPlaybackState";
import {timelineIntervalAtom} from "@/hooks/timeline/useTimelineInterval";

export interface TimelineKeyframeIconProps {
    t: number;
    setT: (t: number) => void;

    selected?: boolean;
    select: () => void;
}

export default function TimelineKeyframe(props: TimelineKeyframeIconProps) {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const timelineScale = useAtomValue(timelineScaleAtom);
    const timelineInterval = useAtomValue(timelineIntervalAtom);
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
                x: 0,
                y: 0
            }}
            grid={isTimelineSnapEnabled ? [timelineScale * timelineInterval, 0] : undefined}
            onDrag={(_, {x}) => {
                const t = snapToInterval(x / timelineScale);
                setPlaybackState(false, t);
                setCurrentT(t);
                setIsDragging(true);
            }}
            onStop={() => {
                if (!isDragging)
                    return;
                props.setT(currentT);
                setIsDragging(false);
            }}
            bounds={{left: 0}}
            onMouseDown={(e) => {
                if (e.button !== 0)
                    return;
                e.preventDefault();
                e.stopPropagation();
                props.select();
                setPlaybackState(false, props.t);
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