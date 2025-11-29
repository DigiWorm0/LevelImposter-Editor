import {RefObject} from "react";
import {Container} from "pixi.js";
import {useTick} from "@pixi/react";
import primaryStore from "../primaryStore";
import {playheadAtom} from "./usePlayhead";
import GUID from "../../types/common/GUID";
import {animTargetAtomFamily} from "./useAnimTarget";
import LIAnimPropertyType from "../../types/li/LIAnimPropertyType";
import lerp from "../../utils/common/lerp";
import degToRad from "../../utils/common/degToRad";
import {UNITY_SCALE} from "../../types/amongus/Constants";
import LIAnimKeyframe from "../../types/li/LIAnimKeyframe";
import useIsAnimTarget from "./useIsAnimTarget";

/**
 * Hook to update a Sprite's properties based on animation playback
 * @param id - The GUID of the animation target
 * @param ref - The ref to the Sprite to update
 */
export default function useAnimationPlayback(
    id: GUID,
    ref: RefObject<Container | null>
) {
    const isAnimTarget = useIsAnimTarget(id);

    useTick(() => {
        // Check if the target is an animation target
        if (!isAnimTarget)
            return;

        // Check if Sprite ref is valid
        if (!ref.current)
            return;

        // Get playback state
        const t = primaryStore.get(playheadAtom);

        // Update each property of the anim target
        ref.current.x = getPropertyValueAtTime(id, "x", t) * UNITY_SCALE;
        ref.current.y = -getPropertyValueAtTime(id, "y", t) * UNITY_SCALE;
        ref.current.rotation = -degToRad(getPropertyValueAtTime(id, "rotation", t));
        ref.current.scale.x = getPropertyValueAtTime(id, "xScale", t, 1);
        ref.current.scale.y = getPropertyValueAtTime(id, "yScale", t, 1);
        ref.current.alpha = getPropertyValueAtTime(id, "opacity", t, 1);
    });
}

/**
 * Gets the interpolated property value at time t for a given animation target and property
 * @param id - The GUID of the animation target
 * @param property - The property type
 * @param t - The time to get the property value at
 * @param defaultValue - The default value to return if no keyframes exist
 * @returns The interpolated property value at time t
 */
function getPropertyValueAtTime(
    id: GUID,
    property: LIAnimPropertyType,
    t: number,
    defaultValue = 0
): number {

    // Get adjecent keyframes
    const prevKeyframe = getPreviousKeyframe(id, property, t);
    const nextKeyframe = getNextKeyframe(id, property, t);

    // If no adjecent keyframes, fallback to edge values
    if (!nextKeyframe)
        return prevKeyframe?.value ?? defaultValue;
    if (!prevKeyframe)
        return nextKeyframe.value ?? defaultValue;

    // Interpolate between the two keyframes
    return lerpBetweenKeyframes(prevKeyframe, nextKeyframe, t);
}

/**
 * Interpolates between two keyframes based on time t.
 * Switches interpolation method based on the curve type of the previous keyframe.
 * @param prevKeyframe - The previous keyframe
 * @param nextKeyframe - The next keyframe
 * @param t - The current time between the two keyframes (0 <= t <= 1)
 * @returns The interpolated value at time t
 */
export function lerpBetweenKeyframes(
    prevKeyframe: LIAnimKeyframe,
    nextKeyframe: LIAnimKeyframe,
    t: number
): number {

    // Linear interpolation
    const interpT = (t - prevKeyframe.t) / (nextKeyframe.t - prevKeyframe.t);
    const curve = prevKeyframe.nextCurve;

    // Ease in
    if (curve === "easeIn")
        return lerp(prevKeyframe.value, nextKeyframe.value, interpT * interpT);

    // Ease out
    else if (curve === "easeOut")
        return lerp(prevKeyframe.value, nextKeyframe.value, interpT * (2 - interpT));

    // Ease in and out
    else if (curve === "easeInOut" && interpT < 0.5)
        return lerp(prevKeyframe.value, nextKeyframe.value, 2 * interpT * interpT);
    else if (curve === "easeInOut" && interpT >= 0.5)
        return lerp(prevKeyframe.value, nextKeyframe.value, -1 + (4 - 2 * interpT) * interpT);

    // No curve, default to linear
    return lerp(prevKeyframe.value, nextKeyframe.value, interpT);
}

/**
 * Gets the previous keyframe for a given property of an animation target before or at time t
 * @param id - The GUID of the animation target
 * @param property - The property type
 * @param t - The time to find the previous keyframe before or at
 * @returns The previous keyframe before or at time t, or null if none exists
 */
export function getPreviousKeyframe(id: GUID, property: LIAnimPropertyType, t: number) {
    const keyframes = getKeyframesOfProperty(id, property);

    // Filter keyframes to only those before or at time t
    const previousKeyframes = keyframes.filter(k => k.t <= t);
    if (previousKeyframes.length === 0)
        return null;

    // Return the keyframe with the greatest time t
    return previousKeyframes.reduce((prev, current) => (prev.t > current.t) ? prev : current);
}

/**
 * Gets the next keyframe for a given property of an animation target after time t
 * @param id - The GUID of the animation target
 * @param property - The property type
 * @param t - The time to find the next keyframe after
 * @returns The next keyframe after time t, or null if none exists
 */
export function getNextKeyframe(id: GUID, property: LIAnimPropertyType, t: number) {
    const keyframes = getKeyframesOfProperty(id, property);

    // Filter keyframes to only those after time t
    const nextKeyframes = keyframes.filter(k => k.t > t);
    if (nextKeyframes.length === 0)
        return null;

    // Return the keyframe with the smallest time t
    return nextKeyframes.reduce((prev, current) => (prev.t < current.t) ? prev : current);
}

/**
 * Gets a list of keyframes for a given property of an animation target
 * @param id - The GUID of the animation target
 * @param property - The property type
 * @returns An array of keyframes for the specified property
 */
export function getKeyframesOfProperty(id: GUID, property: LIAnimPropertyType) {
    const animTarget = primaryStore.get(animTargetAtomFamily(id));
    const properties = animTarget?.properties[property];
    if (properties)
        return properties.keyframes;

    return [];
}