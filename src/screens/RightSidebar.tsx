import SoundPanel from "../components/properties/panels/SoundPanel";
import CamPanel from "../components/properties/panels/CamPanel";
import ColliderPanel from "../components/properties/panels/ColliderPanel";
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
import StepSoundPanel from "../components/properties/panels/StepSoundPanel";
import TaskPanel from "../components/properties/panels/TaskPanel";
import TelePanel from "../components/properties/panels/TelePanel";
import TimerPanel from "../components/properties/panels/TimerPanel";
import TransformPanel from "../components/properties/panels/TransformPanel";
import TriggerPanel from "../components/properties/panels/TriggerPanel";
import VentPanel from "../components/properties/panels/VentPanel";
import DoorPanel from "../components/properties/panels/DoorPanel";
import MinimapSpritePanel from "../components/properties/panels/MinimapSpritePanel";
import MinigamePanel from "../components/properties/panels/MinigamePanel";
import SpawnPanel from "../components/properties/panels/SpawnPanel";
import MeetingPanel from "../components/properties/panels/MeetingPanel";

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
            <MinigamePanel />
            <ConsolePanel />
            <StarfieldPanel />
            <FloatingPanel />
            <LadderPanel />
            <MeetingPanel />
            <VentPanel />
            <TelePanel />
            <CamPanel />
            <SpawnPanel />
            <PlatformPanel />
            <SoundPanel />
            <StepSoundPanel />
            <TimerPanel />
            <TriggerPanel />
            <ColliderPanel />
            <MinimapPanel />
            <MinimapSpritePanel />

            <div
                style={{
                    height: 200
                }}
            />
        </div>
    );
}