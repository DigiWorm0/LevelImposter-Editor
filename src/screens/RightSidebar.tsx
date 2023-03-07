import SoundPanel from "../components/properties/SoundPanel";
import CamPanel from "../components/properties/panels/CamPanel";
import ColliderPanel from "../components/properties/ColliderPanel";
import ConsolePanel from "../components/properties/panels/ConsolePanel";
import DebugPanel from "../components/properties/panels/DebugPanel";
import FloatingPanel from '../components/properties/panels/FloatingPanel';
import LadderPanel from "../components/properties/panels/LadderPanel";
import MinimapPanel from "../components/properties/panels/MinimapPanel";
import PlatformPanel from "../components/properties/panels/PlatformPanel";
import RoomPanel from "../components/properties/panels/RoomPanel";
import SabPanel from "../components/properties/panels/SabPanel";
import SpritePanel from "../components/properties/panels/SpritePanel";
import StarfieldPanel from "../components/properties/panels/StarfieldPanel";
import StepSoundPanel from "../components/properties/StepSoundPanel";
import TaskPanel from "../components/properties/TaskPanel";
import TelePanel from "../components/properties/TelePanel";
import TimerPanel from "../components/properties/panels/TimerPanel";
import TransformPanel from "../components/properties/TransformPanel";
import TriggerPanel from "../components/properties/TriggerPanel";
import VentPanel from "../components/properties/VentPanel";
import DoorPanel from "../components/properties/DoorPanel";
import MinimapSpritePanel from "../components/properties/MinimapSpritePanel";

export default function RightSidebar() {

    return (
        <div className="right-sidebar">
            <TransformPanel />
            <DebugPanel />
            <SpritePanel />
            <RoomPanel />
            <TaskPanel />
            <DoorPanel />
            <SabPanel />
            <ConsolePanel />
            <StarfieldPanel />
            <FloatingPanel />
            <LadderPanel />
            <VentPanel />
            <TelePanel />
            <CamPanel />
            <PlatformPanel />
            <SoundPanel />
            <StepSoundPanel />
            <TimerPanel />
            <TriggerPanel />
            <ColliderPanel />
            <MinimapPanel />
            <MinimapSpritePanel />

            <div style={{ height: 40 }} />
        </div>
    );
}