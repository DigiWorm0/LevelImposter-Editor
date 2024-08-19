import usePlayhead from "../../../hooks/timeline/usePlayhead";
import React from "react";

export default function TimelineTimestamp() {
    const [t] = usePlayhead();

    const timestamp = React.useMemo(() => {
        const hours = Math.floor(t / 3600);
        const minutes = Math.floor(t % 3600 / 60);
        const seconds = Math.floor(t % 60);
        const milliseconds = Math.floor((t % 1) * 100);
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
    }, [t]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: 120
            }}
        >
            <span
                style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                }}
            >
                {timestamp}
            </span>
        </div>
    );
}