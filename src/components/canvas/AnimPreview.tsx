import { Shape } from "react-konva";
import useAdjustPoint from "../../hooks/canvas/useAdjustPoint";
import { useSelectedElemPropValue } from "../../hooks/elements/useSelectedElemProperty";
import { useSettingsValue } from "../../hooks/useSettings";
import useIsSelectedElemType from "../../hooks/elements/useSelectedElemIsType";
import { DEFAULT_KEYFRAMES } from "../../types/li/LIAnimKeyframe";

export default function AnimPreview() {
    const isAnim = useIsSelectedElemType("util-triggeranim");
    const _animKeyframes = useSelectedElemPropValue("animKeyframes");
    const { animPreview } = useSettingsValue();
    const { relativeToAbsolute } = useAdjustPoint();

    const animKeyframes = _animKeyframes ?? DEFAULT_KEYFRAMES;

    if (!animPreview || !isAnim)
        return null;
    return (
        <Shape
            sceneFunc={(ctx, shape) => {
                if (animKeyframes.length <= 0)
                    return;

                ctx.beginPath();

                const initialPoint = relativeToAbsolute({
                    x: animKeyframes[0].x ?? 0,
                    y: -(animKeyframes[0].y ?? 0)
                });

                ctx.moveTo(initialPoint.x, initialPoint.y);
                animKeyframes.forEach(k => {
                    const point = relativeToAbsolute({
                        x: k.x ?? 0,
                        y: -(k.y ?? 0)
                    });
                    ctx.lineTo(point.x, point.y);
                });

                ctx.fillStrokeShape(shape);
            }}
            stroke={"green"}
            strokeWidth={1}
            listening={false}
        />
    );
}