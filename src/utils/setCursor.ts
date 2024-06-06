import { KonvaEventObject } from "konva/lib/Node";

export default function setCursor(e: KonvaEventObject<any>, cursor: string) {
    const stage = e.target.getStage();
    if (!stage)
        return;
    stage.container().style.cursor = cursor;
}