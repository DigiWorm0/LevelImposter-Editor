import React from "react";

export interface ExpandTextProps {
    maxLength?: number;
    text: string;
}

export default function ExpandText(props: ExpandTextProps) {
    const [expanded, setExpanded] = React.useState(false);

    const maxLength = props.maxLength || 8;
    const text = expanded ? props.text : props.text.slice(0, maxLength) + "...";

    return (
        <span onClick={() => setExpanded(!expanded)}>
            {text}
        </span>
    );
}