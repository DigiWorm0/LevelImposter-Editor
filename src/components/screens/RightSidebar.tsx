import SoundPanel from "../properties/panels/SoundPanel";
import CamPanel from "../properties/panels/CamPanel";
import ColliderPanel from "../properties/panels/ColliderPanel";
import ConsolePanel from "../properties/panels/ConsolePanel";
import DebugPanel from "../properties/panels/DebugPanel";
import DisplayPanel from "../properties/panels/DisplayPanel";
import FloatingPanel from "../properties/panels/FloatingPanel";
import LadderPanel from "../properties/panels/LadderPanel";
import MinimapPanel from "../properties/panels/MinimapPanel";
import PlatformPanel from "../properties/panels/PlatformPanel";
import RoomPanel from "../properties/panels/RoomPanel";
import SabPanel from "../properties/panels/SabPanel";
import SpritePanel from "../properties/panels/SpritePanel/SpritePanel";
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
import {Box, Paper, Typography} from "@mui/material";
import CustomTextPanel from "../properties/panels/CustomTextPanel";
import DeathTriggerPanel from "../properties/panels/DeathTriggerPanel";
import CameraShakePanel from "../properties/panels/CameraShakePanel";
import React from "react";
import ErrorBoundary from "../utils/ErrorBoundary";
import AnimationPanel from "../properties/panels/AnimationPanel";
import usePanelSize from "../../hooks/ui/usePanelSize";
import useSetFocus, {Scope} from "../../hooks/input/useFocus";
import EjectPanel from "../properties/panels/EjectPanel";
import ValuePanel from "../properties/panels/ValuePanel";
import GatePanel from "../properties/panels/GatePanel";
import ComparatorPanel from "../properties/panels/ComparatorPanel";

export default function RightSidebar() {
    //const dragRef = React.useRef<HTMLDivElement>(null);
    const [_size] = usePanelSize("right-sidebar");
    const size = _size ?? 300;
    const setFocus = useSetFocus();

    return (
        <Paper
            elevation={1}
            square
            sx={{
                width: size,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "0 10px",
                overflowX: "hidden",
                overflowY: "auto",
                pointerEvents: "auto",
                position: "relative",
                zIndex: -10
            }}
            onMouseDown={() => setFocus(Scope.Inspector)}
        >
            <Box
                sx={{
                    overflowX: "hidden",
                    overflowY: "auto"
                }}
            >
                <ErrorBoundary
                    fallback={
                        <Typography
                            variant={"body2"}
                            color={"textSecondary"}
                            sx={{textAlign: "center", mt: 4}}
                        >
                            Error loading inspector, <br/>
                            see console for more details
                        </Typography>
                    }
                >
                    <TransformPanel/>
                    <DebugPanel/>
                    <SpritePanel/>
                    <RoomPanel/>
                    <TaskPanel/>
                    <DoorPanel/>
                    <SabPanel/>
                    <MinigamePanel/>
                    <ConsolePanel/>
                    <StarfieldPanel/>
                    <FloatingPanel/>
                    <ScrollingPanel/>
                    <LadderPanel/>
                    <MeetingPanel/>
                    <SabotagesPanel/>
                    <VentPanel/>
                    <TelePanel/>
                    <DisplayPanel/>
                    <CamPanel/>
                    <SpawnPanel/>
                    <PlatformPanel/>
                    <SoundPanel/>
                    <StepSoundPanel/>
                    <TimerPanel/>
                    <OneWayColliderPanel/>
                    <DecontaminationPanel/>
                    <SporePanel/>
                    <DeathTriggerPanel/>
                    <CameraShakePanel/>
                    <AnimationPanel/>
                    <EjectPanel/>
                    <ValuePanel/>
                    <GatePanel/>
                    <ComparatorPanel/>

                    <CustomTextPanel/>
                    <TriggerPanel/>
                    <ColliderPanel/>
                    <MinimapPanel/>
                    <MinimapSpritePanel/>
                </ErrorBoundary>

                <div style={{minHeight: 150}}/>
            </Box>

            {/*<Draggable*/}
            {/*    nodeRef={dragRef}*/}
            {/*    axis="x"*/}
            {/*    position={{x: -size, y: 0}}*/}
            {/*    onDrag={(_, {x}) => setSize(-x)}*/}
            {/*    bounds={{right: -220}}*/}
            {/*>*/}
            {/*    <div*/}
            {/*        ref={dragRef}*/}
            {/*        style={{*/}
            {/*            position: "absolute",*/}
            {/*            top: 0,*/}
            {/*            right: 6,*/}
            {/*            width: 12,*/}
            {/*            height: "100%",*/}
            {/*            cursor: "ew-resize",*/}
            {/*            backgroundColor: "transparent"*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</Draggable>*/}
        </Paper>
    );
}