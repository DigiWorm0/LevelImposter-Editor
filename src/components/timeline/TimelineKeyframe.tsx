import {Circle} from "@mui/icons-material";
import React from "react";
import Draggable from "react-draggable";
import {useSetPlayhead} from "../../hooks/timeline/usePlayhead";

export interface TimelineKeyframeIconProps {
    t: number;
    setT: (t: number) => void;
}

const TICK_INTERVAL = 8; // px
const PADDING_LEFT = 6; // px

export default function TimelineKeyframe(props: TimelineKeyframeIconProps) {
    const setPlayheadT = useSetPlayhead();

    return (
        <Draggable
            axis="x"
            position={{x: props.t * TICK_INTERVAL + PADDING_LEFT, y: 0}}
            grid={[TICK_INTERVAL, 0]}
            onStop={(_, {x}) => {
                const t = (x - PADDING_LEFT) / TICK_INTERVAL;
                props.setT(t);
            }}
            positionOffset={{x: -7, y: 0}}
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