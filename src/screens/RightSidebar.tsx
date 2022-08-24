import React from 'react';
import AmbientSoundPanel from "../components/properties/AmbientSoundPanel";
import CamPanel from "../components/properties/CamPanel";
import ColliderPanel from "../components/properties/ColliderPanel";
import ConsolePanel from "../components/properties/ConsolePanel";
import DebugPanel from "../components/properties/DebugPanel";
import LadderPanel from "../components/properties/LadderPanel";
import MinimapPanel from "../components/properties/MinimapPanel";
import PlatformPanel from "../components/properties/PlatformPanel";
import RoomPanel from "../components/properties/RoomPanel";
import SabPanel from "../components/properties/SabPanel";
import SpritePanel from "../components/properties/SpritePanel";
import StarfieldPanel from "../components/properties/StarfieldPanel";
import StepSoundPanel from "../components/properties/StepSoundPanel";
import TaskPanel from "../components/properties/TaskPanel";
import TransformPanel from "../components/properties/TransformPanel";
import VentPanel from "../components/properties/VentPanel";
import { useSelectedElemIDValue } from "../hooks/jotai/useSelectedElem";

export default function RightSidebar() {
    const selectedID = useSelectedElemIDValue();

    React.useEffect(() => {
        if (!selectedID)
            return;
        const elem = document.getElementById(selectedID);
        if (elem) {
            elem.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [selectedID]);

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
            <LadderPanel />
            <VentPanel />
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