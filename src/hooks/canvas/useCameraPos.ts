import { atom, useSetAtom } from "jotai";
import React from "react";
import Konva from "konva";
import { UNITY_SCALE } from "../../types/generic/Constants";

export const cameraXAtom = atom(0);
export const cameraYAtom = atom(0);

export default function useUpdateCameraPos(stageRef: React.RefObject<Konva.Stage>) {
    const setCameraX = useSetAtom(cameraXAtom);
    const setCameraY = useSetAtom(cameraYAtom);

    return React.useCallback(() => {
        const stage = stageRef.current;
        if (!stage)
            return;

        const scale = stage.scaleX();

        let stageX = stage.x();
        let stageY = stage.y();

        stageX -= window.innerWidth / 2;
        stageY -= window.innerHeight / 2;


        stageX /= -scale;
        stageY /= scale;

        stageX /= UNITY_SCALE;
        stageY /= UNITY_SCALE;

        setCameraX(stageX);
        setCameraY(stageY);
    }, [stageRef, setCameraX, setCameraY]);
}
