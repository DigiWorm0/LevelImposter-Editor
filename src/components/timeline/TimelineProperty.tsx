import {Box, IconButton} from "@mui/material";
import TimelineKeyframeRow from "./TimelineKeyframeRow";
import TimelineRow from "./TimelineRow";
import React from "react";
import FlexNumericInput from "../properties/util/FlexNumericInput";
import TimelineKeyframe from "./TimelineKeyframe";
import {Circle, CircleOutlined} from "@mui/icons-material";
import GUID from "../../types/generic/GUID";
import useAnimTarget from "../../hooks/timeline/useAnimTarget";
import TimelinePlayhead from "./TimelinePlayhead";
import useAddKeyframe from "../../hooks/timeline/useAddKeyframe";
import AnimProperty from "../../types/li/AnimProperty";
import useIsCurrentKeyframe from "../../hooks/timeline/useIsCurrentKeyframe";
import useAnimPropertyValue from "../../hooks/timeline/useAnimPropertyValue";

export interface TimelinePropertyProps {
    targetID: GUID;
    property: AnimProperty;
}

export default function TimelineProperty(props: TimelinePropertyProps) {
    const [animTarget, setAnimTarget] = useAnimTarget(props.targetID);
    const keyframes = animTarget?.keyframes.filter((k) => k.property === props.property) ?? [];
    const addKeyframe = useAddKeyframe();
    const isCurrentKeyframe = useIsCurrentKeyframe({
        targetID: props.targetID,
        property: props.property,
    });
    const [value, setValue] = useAnimPropertyValue({
        property: props.property,
        targetID: props.targetID,
    });

    const setKeyframeT = (id: GUID, t: number) => {
        if (!animTarget)
            return;

        setAnimTarget({
            ...animTarget,
            keyframes: animTarget.keyframes.map((k) => k.id === id ? {...k, t} : k)
        });
    };

    return (
        <TimelineRow
            header={(
                <Box
                    sx={{
                        padding: "5px 40px",
                        paddingRight: 0,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <span style={{marginRight: 10, fontWeight: "bold"}}>
                        {props.property}
                    </span>
                    <Box>
                        <IconButton
                            onClick={() => setValue(value ?? 0)}
                        >
                            {isCurrentKeyframe ? (
                                <Circle
                                    sx={{fontSize: 12}}
                                />
                            ) : (
                                <CircleOutlined
                                    sx={{fontSize: 12}}
                                />
                            )}
                        </IconButton>
                        <FlexNumericInput
                            value={value ?? 0}
                            onChange={(value) => setValue(value)}
                            inputProps={{
                                variant: "standard",
                                sx: {width: 100, height: 24}
                            }}
                        />
                    </Box>
                </Box>
            )}
        >
            <TimelineKeyframeRow>
                <TimelinePlayhead/>
                {keyframes.map((k) => (
                    <TimelineKeyframe
                        t={k.t}
                        setT={(t) => setKeyframeT(k.id, t)}
                    />
                ))}
            </TimelineKeyframeRow>
        </TimelineRow>
    );
}