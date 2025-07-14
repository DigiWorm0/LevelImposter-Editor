export interface CanvasGridAxisProps {
    top: number;
    left: number;
    right: number;
    bottom: number;
    scale: number;
}

export default function CanvasGridAxis(props: CanvasGridAxisProps) {
    const {left, top, right, bottom, scale} = props;

    return (
        <pixiGraphics
            x={0}
            y={0}
            draw={(g) => {
                g.clear();

                // X-Axis
                g.moveTo(left, 0)
                    .lineTo(right, 0)
                    .stroke({color: 0x0000FF, alpha: 0.5, width: 2 / scale});

                // Y-Axis
                g.moveTo(0, top)
                    .lineTo(0, bottom)
                    .stroke({color: 0xFF0000, alpha: 0.5, width: 2 / scale});
            }}
        />
    )
}