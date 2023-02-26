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
import ElemConnections from "./ElemConnections";
import MinimapElement from "./MinimapElement";
import PlayerZRender from "./PlayerZRender";
import RoomText from "./RoomText";

export default function SelectedMapElement() {
    const selectedElem = useSelectedElemValue();

    if (!selectedElem)
        return null;
    return (
        <>
            <ConsoleRange />
            <SpawnRange />
            <LadderRange />
            <CameraRender />
            <PlatformRange />
            <MinimapPreview />
            <MinimapElement />

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
                <PlayerZRender />

            </Group>

            <ElemConnections />
            <RoomText />
        </>
    );
}