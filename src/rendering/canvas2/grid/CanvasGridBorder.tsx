export interface CanvasGridBorderProps {
    alpha: number;
    scale: number;
    size: number;
}

export default function CanvasGridBorder(props: CanvasGridBorderProps) {
    const x = -props.size;
    const y = -props.size;
    const width = props.size * 2;
    const height = props.size * 2;
    const alpha = props.alpha;

    return (
        <pixiGraphics
            draw={(g) => {
                g.clear();
                g.moveTo(x, y)
                    .lineTo(x + width, y)
                    .lineTo(x + width, y + height)
                    .lineTo(x, y + height)
                    .lineTo(x, y)
                    .stroke({color: 0x5F6B7C, alpha, width: 1 / props.scale})
                    .closePath();
            }}
        />
    );
}