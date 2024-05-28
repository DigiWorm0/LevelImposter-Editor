import React from 'react';
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export interface ColoredTextPreviewProps {
    children: string;
}

export default function ColoredTextPreview(props: ColoredTextPreviewProps) {
    const PLACEHOLDER_REGEX = /{(\d+)}/g;
    const textSplitByLine = props.children.split('\n');

    return (
        <Typography variant={"body2"}>
            {textSplitByLine.map((line, i) => (
                <React.Fragment key={i}>
                    {line.split(PLACEHOLDER_REGEX).map((text, j) => (
                        <Typography
                            key={j}
                            variant={"body2"}
                            color={j % 2 === 0 ? "textPrimary" : "primary"}
                            component={"span"}
                            fontWeight={j % 2 === 0 ? "inherit" : "bold"}
                        >
                            {j % 2 === 0 ? text : `{${text}}`}
                        </Typography>
                    ))}
                    {i !== textSplitByLine.length - 1 && (
                        <Typography variant={"subtitle2"} color={grey[700]} component={"span"}>
                            \n
                            <br />
                        </Typography>
                    )}
                </React.Fragment>
            ))}
        </Typography>
    );

}