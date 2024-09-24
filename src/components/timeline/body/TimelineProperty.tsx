import {Box, IconButton} from "@mui/material";
import TimelineKeyframeRow from "./TimelineKeyframeRow";
import TimelineRow from "../TimelineRow";
import React from "react";
import FlexNumericInput from "../../properties/util/FlexNumericInput";
import TimelineKeyframe from "./TimelineKeyframe";
import GUID from "../../../types/generic/GUID";
import TimelinePlayhead from "./TimelinePlayhead";
import LIAnimPropertyType from "../../../types/li/LIAnimPropertyType";
import useIsCurrentKeyframe from "../../../hooks/timeline/useIsCurrentKeyframe";
import useAnimPropertyValue from "../../../hooks/timeline/useAnimPropertyValue";
import useAnimTargetProperty from "../../../hooks/timeline/useAnimTargetProperty";
import DiamondSVG from "../icons/DiamondSVG";
import DiamondSVGOutline from "../icons/DiamondSVGOutline";
import TimelineCurveButton from "./TimelineCurveButton";
import useSelectedKeyframe from "../../../hooks/timeline/useSelectedKeyframe";

export interface TimelinePropertyProps {
    targetID: GUID;
    property: LIAnimPropertyType;
}

export default function TimelineProperty(props: TimelinePropertyProps) {
    const [animTargetProperty, setAnimTargetProperty] = useAnimTargetProperty(props);
    const isCurrentKeyframe = useIsCurrentKeyframe(props);
    const [value, setValue] = useAnimPropertyValue(props);
    const [selectedKeyframe, setSelectedKeyframe] = useSelectedKeyframe();

    const DEFAULT_VALUE = (props.property === "yScale" || props.property === "xScale") ? 1 : 0;
    const isSelected = props.targetID === selectedKeyframe?.targetID && props.property === selectedKeyframe?.property;

    const selectKeyframe = (id: number) => {

        // Select keyframe
        setSelectedKeyframe({
            keyframeID: id,
            targetID: props.targetID,
            property: props.property
        });

    };

    const setKeyframeT = (id: number, t: number) => {
        if (!animTargetProperty)
            return;

        setAnimTargetProperty({
            ...animTargetProperty,
            keyframes: animTargetProperty.keyframes.map(k => {
                if (k.id === id)
                    return {...k, t};
                return k;
            })
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
                    <span style={{marginRight: 10, textAlign: "center", flexGrow: 1}}>
                        {props.property}
                    </span>
                    <Box>
                        <IconButton
                            onClick={() => setValue(value ?? DEFAULT_VALUE)}
                        >
                            {isCurrentKeyframe ? (
                                <DiamondSVG
                                    size={10}
                                    color={"white"}
                                />
                            ) : (
                                <DiamondSVGOutline
                                    size={10}
                                    color={"#999"}
                                />
                            )}
                        </IconButton>
                        <FlexNumericInput
                            value={value ?? DEFAULT_VALUE}
                            onChange={(value) => setValue(value)}
                            inputProps={{
                                variant: "standard",
                                sx: {width: 100, height: 24},
                                InputProps: {
                                    endAdornment: (
                                        <TimelineCurveButton
                                            property={props.property}
                                            targetID={props.targetID}
                                        />
                                    )
                                }
                            }}
                        />
                    </Box>
                </Box>
            )}
        >
            <TimelineKeyframeRow>
                <TimelinePlayhead/>
                {animTargetProperty?.keyframes.map(k => (
                    <TimelineKeyframe
                        key={k.id}
                        t={k.t}
                        setT={(newT) => setKeyframeT(k.id, newT)}
                        selected={selectedKeyframe?.keyframeID === k.id && isSelected}
                        select={() => selectKeyframe(k.id)}
                    />
                ))}
            </TimelineKeyframeRow>
        </TimelineRow>
    );
}