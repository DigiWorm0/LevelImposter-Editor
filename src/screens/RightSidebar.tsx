import AmbientSoundPanel from "../components/properties/AmbientSoundPanel";
import CamPanel from "../components/properties/CamPanel";
import ColliderPanel from "../components/properties/ColliderPanel";
import ConsolePanel from "../components/properties/ConsolePanel";
import DebugPanel from "../components/properties/DebugPanel";
import FloatingPanel from '../components/properties/FloatingPanel';
import LadderPanel from "../components/properties/LadderPanel";
import MinimapPanel from "../components/properties/MinimapPanel";
import PlatformPanel from "../components/properties/PlatformPanel";
import RoomPanel from "../components/properties/RoomPanel";
import SabPanel from "../components/properties/SabPanel";
import SpritePanel from "../components/properties/SpritePanel";
import StarfieldPanel from "../components/properties/StarfieldPanel";
import StepSoundPanel from "../components/properties/StepSoundPanel";
import TaskPanel from "../components/properties/TaskPanel";
import TelePanel from "../components/properties/TelePanel";
import TransformPanel from "../components/properties/TransformPanel";
import VentPanel from "../components/properties/VentPanel";

export default function RightSidebar() {

    return (
        <div className="right-sidebar">
            <TransformPanel />
            <DebugPanel />
            <SpritePanel />
            <RoomPanel />
            <TaskPanel />
            <SabPanel />
            <ConsolePanel />
            <StarfieldPanel />
            <FloatingPanel />
            <LadderPanel />
            <VentPanel />
            <TelePanel />
            <CamPanel />
            <PlatformPanel />
            <AmbientSoundPanel />
            <StepSoundPanel />
            <ColliderPanel />
            <MinimapPanel />


            <div style={{ height: 40 }} />
        </div>
    );
}