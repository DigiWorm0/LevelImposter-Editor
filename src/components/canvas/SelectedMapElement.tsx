import { Group } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { UNITY_SCALE } from "../../types/generic/Constants";
import CameraRender from "./CameraRender";
import ColliderEditor from "./ColliderEditor";
import ColliderRender from "./ColliderRender";
import ConsoleRange from "./ConsoleRange";
import LadderRange from "./LadderRange";
import PlatformRange from "./PlatformRange";
import TaskParent from "./TaskParent";
import VentConnections from "./VentConnections";

export default function SelectedMapElement() {
    const selectedElem = useSelectedElemValue();

    if (!selectedElem)
        return null;
    return (
        <>
            <VentConnections />
            <ConsoleRange />
            <LadderRange />
            <TaskParent />
            <CameraRender />
            <PlatformRange />

            <Group
                x={selectedElem.x * UNITY_SCALE}
                y={-selectedElem.y * UNITY_SCALE}
                scaleX={selectedElem.xScale}
                scaleY={selectedElem.yScale}
                rotation={-selectedElem.rotation}>

                <ColliderRender />
                <ColliderEditor />

            </Group>
        </>
    );
}