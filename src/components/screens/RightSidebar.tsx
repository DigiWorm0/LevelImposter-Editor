import SoundPanel from "../properties/panels/SoundPanel";
import CamPanel from "../properties/panels/CamPanel";
import ColliderPanel from "../properties/panels/ColliderPanel";
import ConsolePanel from "../properties/panels/ConsolePanel";
import DebugPanel from "../properties/panels/DebugPanel";
import DisplayPanel from "../properties/panels/DisplayPanel";
import FloatingPanel from '../properties/panels/FloatingPanel';
import LadderPanel from "../properties/panels/LadderPanel";
import MinimapPanel from "../properties/panels/MinimapPanel";
import PlatformPanel from "../properties/panels/PlatformPanel";
import RoomPanel from "../properties/panels/RoomPanel";
import SabPanel from "../properties/panels/SabPanel";
import SpritePanel from "../properties/panels/SpritePanel";
import StarfieldPanel from "../properties/panels/StarfieldPanel";
import StepSoundPanel from "../properties/panels/StepSoundPanel";
import TaskPanel from "../properties/panels/TaskPanel";
import TelePanel from "../properties/panels/TelePanel";
import TimerPanel from "../properties/panels/TimerPanel";
import TransformPanel from "../properties/panels/TransformPanel";
import TriggerPanel from "../properties/panels/TriggerPanel";
import VentPanel from "../properties/panels/VentPanel";
import DoorPanel from "../properties/panels/DoorPanel";
import MinimapSpritePanel from "../properties/panels/MinimapSpritePanel";
import MinigamePanel from "../properties/panels/MinigamePanel";
import SpawnPanel from "../properties/panels/SpawnPanel";
import MeetingPanel from "../properties/panels/MeetingPanel";
import ScrollingPanel from "../properties/panels/ScrollingPanel";
import OneWayColliderPanel from "../properties/panels/OneWayColliderPanel";
import DecontaminationPanel from "../properties/panels/DecontaminationPanel";
import SabotagesPanel from "../properties/panels/SabotagesPanel";
import SporePanel from "../properties/panels/SporePanel";
import { Paper } from "@mui/material";

export default function RightSidebar() {

    return (
        <Paper className="right-sidebar">
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
            <ScrollingPanel />
            <LadderPanel />
            <MeetingPanel />
            <SabotagesPanel />
            <VentPanel />
            <TelePanel />
            <DisplayPanel />
            <CamPanel />
            <SpawnPanel />
            <PlatformPanel />
            <SoundPanel />
            <StepSoundPanel />
            <TimerPanel />
            <OneWayColliderPanel />
            <DecontaminationPanel />
            <SporePanel />

            <TriggerPanel />
            <ColliderPanel />
            <MinimapPanel />
            <MinimapSpritePanel />

            <div
                style={{
                    height: 200
                }}
            />
        </Paper>
    );
}