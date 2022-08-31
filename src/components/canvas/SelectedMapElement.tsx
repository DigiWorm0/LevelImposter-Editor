import { Group } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { UNITY_SCALE } from "../../types/generic/Constants";
import CameraRender from "./CameraRender";
import ColliderEditor from "./ColliderEditor";
import ColliderPreview from "./ColliderPreview";
import ConsoleRange from "./ConsoleRange";
import FloatingRender from "./FloatingRender";
import LadderRange from "./LadderRange";
import MinimapPreview from "./MinimapPreview";
import PlatformRange from "./PlatformRange";
import SpawnRange from "./SpawnRange";
import StarfieldRender from "./StarfieldRender";
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
            <SpawnRange />
            <LadderRange />
            <TaskParent />
            <CameraRender />
            <PlatformRange />
            <MinimapPreview />

            <Group
                x={selectedElem.x * UNITY_SCALE}
                y={-selectedElem.y * UNITY_SCALE}
                scaleX={selectedElem.xScale}
                scaleY={selectedElem.yScale}
                rotation={-selectedElem.rotation}>

                <ColliderPreview />
                <ColliderEditor />
                <StarfieldRender />
                <FloatingRender />

            </Group>
        </>
    );
}