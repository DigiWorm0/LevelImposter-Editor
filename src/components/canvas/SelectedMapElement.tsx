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
import ElemConnections from "./ElemConnections";
import MinimapElement from "./MinimapElement";
import PlayerZRender from "./PlayerZRender";
import RoomText from "./RoomText";
import StarfieldRender from "./StarfieldRender";

export default function SelectedMapElement() {
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