import usePlayhead from "../../hooks/timeline/usePlayhead";

const TICK_INTERVAL = 8; // px
const PADDING_LEFT = 6; // px

export default function TimelinePlayhead() {
    const [t] = usePlayhead();

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: t * TICK_INTERVAL + PADDING_LEFT - 1,
                width: 2,
                backgroundColor: "red",
                zIndex: 10,
                pointerEvents: "none"
            }}
        />
    );
}