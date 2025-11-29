import TickingGraphics from "./TickingGraphics";

const RADIUS = 20;
const SPEED = 4;
const SIZE = 0.5;

export default function Spinner() {
    return (
        <TickingGraphics
            draw={(g) => {
                const time = Date.now() / 1000;

                const rotation = (time * SPEED) % (Math.PI * 2);

                g.arc(
                    0,
                    0,
                    RADIUS,
                    rotation,
                    rotation + Math.PI * SIZE,
                    false
                )
                    .stroke({color: 0xffffff, width: 4});
            }}
        />
    )
}