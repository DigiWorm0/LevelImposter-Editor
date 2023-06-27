import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import CameraRender from "./CameraRender";
import DisplayRender from "./DisplayRender";
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
            <DisplayRender />
            <PlatformRange />
            <MinimapPreview />
            <MinimapElement />
            <ColliderPreview />
            <ColliderEditor />
            <PlayerZRender />
            <FloatingRender />
            <StarfieldRender />
            <ElemConnections />
            <RoomText />
        </>
    );
}