import CamPanel from "../components/properties/CamPanel";
import ColliderPanel from "../components/properties/ColliderPanel";
import ConsolePanel from "../components/properties/ConsolePanel";
import SabPanel from "../components/properties/SabPanel";
import SpritePanel from "../components/properties/SpritePanel";
import TaskPanel from "../components/properties/TaskPanel";
import TransformPanel from "../components/properties/TransformPanel";
import VentPanel from "../components/properties/VentPanel";

export default function RightSidebar() {
    return (
        <div className="right-sidebar">
            <TransformPanel />
            <SpritePanel />
            <TaskPanel />
            <ConsolePanel />
            <SabPanel />
            <VentPanel />
            <CamPanel />
            <ColliderPanel />
            <div style={{ height: 40 }} />
        </div>
    );
}