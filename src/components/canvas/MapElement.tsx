import React from "react";
import { Image, Rect } from "react-konva";
import useElement from "../../hooks/useElement";
import GUID from "../../types/generic/GUID";

const UNITY_SCALE = 100;
export default function MapElement(props: { elementID: GUID }) {
    const [elem, setElement] = useElement(props.elementID);
    const [sprite, setSprite] = React.useState<HTMLImageElement | null>(null);

    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);

    React.useEffect(() => {
        const url = elem.properties.spriteData ?
            elem.properties.spriteData :
            "/sprites/" + elem.type + ".png";

        const img = new window.Image();
        img.src = url;
        img.onload = () => setSprite(img);
    }, [elem]);

    React.useEffect(() => {
        if (sprite) {
            const w = sprite.width / elem.xScale;
            const h = sprite.height / elem.yScale;

            setWidth(w);
            setHeight(h);
            setX((elem.x * UNITY_SCALE) - (w / 2));
            setY((elem.y * UNITY_SCALE) - (h / 2));
        }
    }, [sprite, elem]);

    return (
        <Image
            x={x}
            y={y}
            image={sprite as CanvasImageSource}
            width={width}
            height={height}
            rotation={elem.rotation}
            onDragMove={(e) => {
                setX(e.target.x());
                setY(e.target.y());
            }}
            onDragEnd={(e) => {
                setElement({
                    ...elem,
                    x: (e.target.x() + (width / 2)) / UNITY_SCALE,
                    y: (e.target.y() + (height / 2)) / UNITY_SCALE,
                });
            }}
            draggable
        />
    );
}