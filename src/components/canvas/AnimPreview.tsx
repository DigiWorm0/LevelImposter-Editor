export default function AnimPreview() {
    // const isAnim = useIsSelectedElemType("util-triggeranim");
    // const _animKeyframes = useSelectedElemPropValue("animKeyframes");
    // const targetID = useSelectedElemPropValue("animTargetID");
    // const { animPreview } = useSettingsValue();
    // const { relativeToAbsolute } = useAdjustPoint(targetID);
    //
    // const animKeyframes = _animKeyframes ?? DEFAULT_KEYFRAMES;
    //
    // if (!animPreview || !isAnim)
    //     return null;
    // return (
    //     <Shape
    //         sceneFunc={(ctx, shape) => {
    //             if (animKeyframes.length <= 0)
    //                 return;
    //
    //             ctx.beginPath();
    //
    //             const initialPoint = relativeToAbsolute({
    //                 x: animKeyframes[0].x ?? 0,
    //                 y: -(animKeyframes[0].y ?? 0)
    //             });
    //
    //             ctx.ellipse(initialPoint.x, initialPoint.y, 2, 2, 0, 0, Math.PI * 2);
    //             ctx.moveTo(initialPoint.x, initialPoint.y);
    //             animKeyframes.forEach(k => {
    //                 const point = relativeToAbsolute({
    //                     x: k.x ?? 0,
    //                     y: -(k.y ?? 0)
    //                 });
    //                 ctx.lineTo(point.x, point.y);
    //                 ctx.moveTo(point.x, point.y);
    //                 ctx.ellipse(point.x, point.y, 2, 2, 0, 0, Math.PI * 2);
    //                 ctx.moveTo(point.x, point.y);
    //             });
    //
    //             ctx.fillStrokeShape(shape);
    //         }}
    //         stroke={"#1c983a"}
    //         fill={"#1c983a"}
    //         strokeWidth={2}
    //         opacity={0.5}
    //         listening={false}
    //     />
    // );
    return null;
}