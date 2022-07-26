import { Group } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import CameraRender from "./CameraRender";
import ColliderEditor from "./ColliderEditor";
import ColliderRender from "./ColliderRender";
import ConsoleRange from "./ConsoleRange";
import TaskParent from "./TaskParent";
import VentConnections from "./VentConnections";

const UNITY_SCALE = 100;

export default function SelectedMapElement() {
    const selectedElem = useSelectedElemValue();

    if (!selectedElem)
        return null;
    return (
        <>
            <VentConnections />
            <ConsoleRange />
            <TaskParent />
            <CameraRender />

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