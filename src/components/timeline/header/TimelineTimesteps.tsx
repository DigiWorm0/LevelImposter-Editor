import React from "react";
import useTimelineInterval from "../../../hooks/timeline/useTimelineInterval";
import useWindowSize from "../../../hooks/canvas/useWindowSize";
import {useTimelineScaleValue} from "../../../hooks/timeline/useTimelineScale";
import useTimelineOffset from "../../../hooks/timeline/useTimelineOffset";

const LABEL_INTERVAL = 1; // ticks

export default function TimelineTimesteps() {
    const [windowWidth] = useWindowSize();
    const timelineScale = useTimelineScaleValue();
    const timelineInterval = useTimelineInterval();
    const [timelineOffset] = useTimelineOffset();

    const tickCount = Math.ceil(windowWidth / timelineInterval / timelineScale);

    const indexToTime = (index: number) => {
        const seconds = Math.floor(index * timelineInterval * 100) / 100;
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        const secondsStr = (seconds % 60).toString().padStart(2, "0").substring(0, 5);
        const minutesStr = (minutes % 60).toString().padStart(2, "0");
        const hoursStr = hours.toString().padStart(2, "0");

        if (hours > 999)
            return `..:${minutesStr}:${secondsStr}`;

        if (hours > 0) {
            return `${hoursStr}:${minutesStr}:${secondsStr}`;
        }
        if (minutes > 0) {
            return `${minutesStr}:${secondsStr}`;
        }
        return `${seconds}`;
    };

    return (
        <div
            style={{
                position: "relative",
                display: "block",
                height: "100%",
                marginLeft: 6,
                flexGrow: 0,
                flexShrink: 0
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "calc(infinity * 1px)",
                    height: "100%",
                    zIndex: 10
                }}
            />

            {Array.from({length: tickCount}).map((_, i) => {
                const _index = i + Math.floor(timelineOffset / timelineInterval);

                return (
                    <div
                        key={i}
                        style={{
                            width: 1,
                            height: _index % 100 === 0 ? 12 :
                                _index % 10 === 0 ? 10 :
                                    _index % 5 === 0 ? 8 : 4,
                            backgroundColor: "#888",
                            position: "absolute",
                            left: _index * timelineInterval * timelineScale,
                            bottom: 0,
                            opacity: _index % 100 !== 0 && _index % 10 !== 0 && _index % 5 !== 0 ?
                                timelineInterval * timelineScale * 0.05 : 1
                        }}
                    />
                );
            })}

            {Array.from({length: Math.ceil(tickCount / 10)}).map((_, i) => {
                const _index = i * 10 + Math.floor(timelineOffset / timelineInterval / 10) * 10;
                return (
                    <div
                        key={i}
                        style={{
                            color: "#888",
                            position: "absolute",
                            left: _index * timelineInterval * timelineScale - 50,
                            top: 5,
                            width: 101,
                            textAlign: "center",
                            fontWeight: "normal",
                            opacity: _index % 100 ?
                                timelineInterval * timelineScale * 0.05 : 1
                        }}
                    >
                        <span>{indexToTime(_index * LABEL_INTERVAL)}</span>
                    </div>
                );
            })}
        </div>
    );
}