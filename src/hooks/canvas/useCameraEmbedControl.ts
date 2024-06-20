import useEmbed from "../embed/useEmbed";
import React from "react";
import zoomCanvas from "../../utils/canvas/zoomCanvas";
import Konva from "konva";
import useUpdateCameraPos from "./useCameraPos";

export default function useCameraEmbedControl(stageRef: React.RefObject<Konva.Stage>) {
    const isEmbedded = useEmbed();
    const updateCameraPos = useUpdateCameraPos(stageRef);

    // Embed
    React.useEffect(() => {
        const stage = stageRef.current;
        if (!stage || !isEmbedded)
            return;

        zoomCanvas(stage, -800, {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        });
        updateCameraPos();
    }, [isEmbedded]);
}