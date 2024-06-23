import React from "react";
import { Group, Image } from "react-konva";
import useSprite from "../../hooks/canvas/sprite/useSprite";
import { useSelectedElemPropValue } from "../../hooks/elements/useSelectedElemProperty";
import { useElementValue } from "../../hooks/elements/useElements";
import Konva from "konva";
import lerp, { lerpIn, lerpOut, lerpSmooth } from "../../utils/math/lerp";
import floatMod from "../../utils/math/floatMod";
import { DEFAULT_KEYFRAMES } from "../../types/li/LIAnimKeyframe";
import { UNITY_SCALE } from "../../types/generic/Constants";
import useIsSelectedElemType from "../../hooks/elements/useSelectedElemIsType";
import LIAnimCurve from "../../types/li/LIAnimCurve";
import { useSettingsValue } from "../../hooks/useSettings";

export default function AnimRenderer() {
    const isAnim = useIsSelectedElemType("util-triggeranim");
    const { animPreview } = useSettingsValue();
    const animTargetID = useSelectedElemPropValue("animTargetID");
    const _animKeyframes = useSelectedElemPropValue("animKeyframes");
    const animTarget = useElementValue(animTargetID);
    const sprite = useSprite(animTargetID);
    const imageRef = React.useRef<Konva.Group | null>(null);

    const animKeyframes = _animKeyframes ?? DEFAULT_KEYFRAMES;
    const w = (sprite?.width ?? 0) * (animTarget?.xScale ?? 1);
    const h = (sprite?.height ?? 0) * (animTarget?.yScale ?? 1);

    React.useEffect(() => {
        if (!isAnim || !animPreview || !sprite || !animKeyframes)
            return;
        const duration = animKeyframes.reduce((acc, k) => Math.max(acc, k.t), 0) ?? 0;

        const getKeyframeIndex = (t: number) => {
            for (let i = 0; i < animKeyframes.length; i++) {
                if (animKeyframes[i].t > t)
                    return i - 1;
            }
            return animKeyframes.length - 1;
        };

        const lerpWithMethod = (a: number, b: number, t: number, method: LIAnimCurve) => {
            if (method === "easeIn")
                return lerpIn(a, b, t);
            if (method === "easeOut")
                return lerpOut(a, b, t);
            if (method === "easeInOut")
                return lerpSmooth(a, b, t);
            return lerp(a, b, t);
        };

        const animation = new Konva.Animation((frame) => {
            if (!frame)
                return;

            // Get Keyframes
            const t = floatMod(frame.time / 1000, duration);

            const keyframeIndex = getKeyframeIndex(t);
            const prevKeyframe = animKeyframes[keyframeIndex];
            const nextKeyframe = animKeyframes[(keyframeIndex + 1) % animKeyframes.length];

            // Calculate Progress
            const progress = (t - prevKeyframe.t) / (nextKeyframe.t - prevKeyframe.t);

            // Get Lerp Method
            const lerpMethod = prevKeyframe.nextCurve ?? "linear";

            // Lerp Position
            const x = lerpWithMethod(prevKeyframe.x ?? 0, nextKeyframe.x ?? 0, progress, lerpMethod);
            const y = lerpWithMethod(prevKeyframe.y ?? 0, nextKeyframe.y ?? 0, progress, lerpMethod);
            const xScale = lerpWithMethod(prevKeyframe.xScale ?? 1, nextKeyframe.xScale ?? 1, progress, lerpMethod);
            const yScale = lerpWithMethod(prevKeyframe.yScale ?? 1, nextKeyframe.yScale ?? 1, progress, lerpMethod);
            const rotation = lerpWithMethod(prevKeyframe.rotation ?? 0, nextKeyframe.rotation ?? 0, progress, lerpMethod);

            // Update Position
            imageRef.current?.position({
                x: x * UNITY_SCALE,
                y: -y * UNITY_SCALE
            });

            // Update Scale
            imageRef.current?.scale({
                x: xScale,
                y: yScale
            });

            // Update Rotation
            imageRef.current?.rotation(rotation);

            // Redraw
            imageRef.current?.getLayer()?.batchDraw();
        });

        // Start Animation
        animation.start();

        // Cleanup
        return () => {
            animation.stop();
        };
    }, [isAnim, animPreview, sprite, animKeyframes]);

    if (!animTarget || !sprite || !isAnim)
        return null;
    return (
        <Group
            x={0}
            y={0}
            rotation={0}
            ref={imageRef}
            listening={false}
        >
            <Image
                image={sprite}
                x={-w / 2}
                y={-h / 2}
                width={w}
                height={h}

                listening={false}
            />
        </Group>
    );
}