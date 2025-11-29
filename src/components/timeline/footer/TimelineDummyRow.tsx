import TimelineKeyframeRow from "../body/TimelineKeyframeRow";
import TimelinePlayhead from "../body/TimelinePlayhead";
import TimelineRow from "../TimelineRow";
import React from "react";

export default function TimelineDummyRow() {
    return (
        <TimelineRow header={(<div style={{height: 32}}/>)}>
            <TimelineKeyframeRow>
                <TimelinePlayhead/>
            </TimelineKeyframeRow>
        </TimelineRow>
    );
}