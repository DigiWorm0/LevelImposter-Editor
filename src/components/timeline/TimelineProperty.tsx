import {Box} from "@mui/material";
import TimelineKeyframeRow from "./TimelineKeyframeRow";
import TimelineRow from "./TimelineRow";
import React from "react";
import LIElement from "../../types/li/LIElement";
import TimelineKeyframeIcon from "./TimelineKeyframeIcon";
import FlexNumericInput from "../properties/util/FlexNumericInput";

export interface TimelinePropertyProps {
    property: keyof LIElement;
}

export default function TimelineProperty(props: TimelinePropertyProps) {
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
                    <FlexNumericInput
                        value={0}
                        onChange={() => {
                        }}
                        inputProps={{
                            variant: "standard",
                            sx: {width: 100, height: 24}
                        }}
                    />
                </Box>
            )}
        >
            <TimelineKeyframeRow>
                <TimelineKeyframeIcon/>
            </TimelineKeyframeRow>
        </TimelineRow>
    );
}