import usePlayhead from "../../hooks/timeline/usePlayhead";
import Draggable from "react-draggable";

const TICK_INTERVAL = 8; // px
const PADDING_LEFT = 6; // px

export default function TimelinePlayheadHandle() {
    const [t, setT] = usePlayhead();

    return (
        <Draggable
            axis="x"
            position={{x: t * TICK_INTERVAL + PADDING_LEFT, y: 0}}
            grid={[TICK_INTERVAL, 0]}
            onDrag={(_, {x}) => {
                setT((x - PADDING_LEFT) / TICK_INTERVAL);
            }}
            positionOffset={{x: -6, y: 0}}
            bounds={{left: PADDING_LEFT}}
        >
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: 12,
                    height: 20,
                    zIndex: 10,
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,

                    backgroundColor: "red",
                    cursor: "ew-resize"
                }}
            />
        </Draggable>

    );
}