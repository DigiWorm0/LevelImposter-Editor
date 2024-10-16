import { MaybeGUID } from "../../types/generic/GUID";
import React from "react";
import Konva from "konva";
import atomWithListeners from "../../utils/jotai/atomWithListeners";
import { elementFamilyAtom } from "../elements/useElements";
import { UNITY_SCALE } from "../../types/generic/Constants";
import useUpdateCameraPos from "./useCameraPos";

const [cameraElementIDAtom, useCameraElementIDListener] = atomWithListeners<MaybeGUID>(undefined);
export { cameraElementIDAtom };

const ANIM_DURATION = 300;

export default function useCameraJumpControl(stageRef: React.RefObject<Konva.Stage>) {
    const updateCameraPos = useUpdateCameraPos(stageRef);

    useCameraElementIDListener((get, set, cameraElementID) => {
        const cameraElement = get(elementFamilyAtom(cameraElementID));
        if (!cameraElement)
            return;

        const stage = stageRef.current;
        if (!stage)
            return;

        // Get Start/End Position
        const startPosition = stage.position() ?? { x: 0, y: 0 };
        const startScale = stage.scale()?.x ?? 1;
        const endPosition = {
            x: -cameraElement.x * UNITY_SCALE + (window.innerWidth / 2),
            y: cameraElement.y * UNITY_SCALE + (window.innerHeight / 2)
        };
        const endScale = 1;

        // Create Animation
        const animation = new Konva.Animation((frame) => {

            // Nullity Check Frame
            if (!frame)
                return;

            // 0 >>> 1
            const progress = frame.time / ANIM_DURATION;

            // Curves the progress to make it look more natural
            const curvedProgress = Math.sin(progress * Math.PI / 2);

            // Animate Position
            stage.position({
                x: startPosition.x + (endPosition.x - startPosition.x) * curvedProgress,
                y: startPosition.y + (endPosition.y - startPosition.y) * curvedProgress
            });

            // Animate Scale
            stage.scale({
                x: startScale + (endScale - startScale) * curvedProgress,
                y: startScale + (endScale - startScale) * curvedProgress
            });

            // Update Camera Position
            updateCameraPos();

            // Stop Animation
            if (progress >= 1)
                animation.stop();
        });
        animation.start();

        // Reset Camera Element
        set(cameraElementIDAtom, undefined);

    });
}