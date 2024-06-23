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
import StarfieldRender from "./StarfieldRender";
import SporeRange from "./SporeRange";
import ErrorBoundary from "../utils/ErrorBoundary";
import MapElementError from "./MapElementError";
import AnimPreview from "./AnimPreview";

export default function SelectedMapElement() {
    return (
        <>
            <ErrorBoundary fallback={<MapElementError />}>
                <SporeRange />
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
                <AnimPreview />
                <PlayerZRender />
                <FloatingRender />
                <StarfieldRender />
                <ElemConnections />
            </ErrorBoundary>
        </>
    );
}