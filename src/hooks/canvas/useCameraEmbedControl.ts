import useEmbed from "../embed/useEmbed";
import React from "react";
import zoomCanvas from "../../utils/zoomCanvas";
import Konva from "konva";

export default function useCameraEmbedControl(stageRef: React.RefObject<Konva.Stage>) {
    const isEmbedded = useEmbed();

    // Embed
    React.useEffect(() => {
        const stage = stageRef.current;
        if (!stage || !isEmbedded)
            return;

        zoomCanvas(stage, -800, {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        });
    }, [isEmbedded]);
}