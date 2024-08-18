import {Box} from "@mui/material";

const TICK_INTERVAL = 8; // px
const LABEL_INTERVAL = 10; // ticks
const PADDING_LEFT = 6; // px

export default function TimelineTimesteps() {

    const windowWidth = window.innerWidth;
    const maxTicks = windowWidth / TICK_INTERVAL;
    const maxLabels = windowWidth / (TICK_INTERVAL * LABEL_INTERVAL);

    return (
        <Box
            sx={{
                overflow: "hidden",
                position: "relative",
                display: "block",
                width: "100%",
                height: "100%"
            }}
        >

            {Array.from({length: maxTicks}).map((_, i) => (
                <div
                    key={i}
                    style={{
                        width: 1,
                        height: i % LABEL_INTERVAL === 0 ? 12 : 6,
                        backgroundColor: i % LABEL_INTERVAL === 0 ? "#aaa" : "#888",
                        position: "absolute",
                        left: i * TICK_INTERVAL + PADDING_LEFT,
                        bottom: 0
                    }}
                />
            ))}

            {Array.from({length: maxLabels}).map((_, i) => (
                <div
                    key={i}
                    style={{
                        color: "#bbb",
                        position: "absolute",
                        left: i * LABEL_INTERVAL * TICK_INTERVAL - 50 + PADDING_LEFT,
                        top: 5,
                        width: 100,
                        textAlign: "center"
                    }}
                >
                    <span>{i * 5}</span>
                </div>
            ))}
        </Box>
    );
}