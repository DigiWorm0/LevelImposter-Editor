import CamPanel from "../components/properties/CamPanel";
import ColliderPanel from "../components/properties/ColliderPanel";
import SpritePanel from "../components/properties/SpritePanel";
import TaskPanel from "../components/properties/TaskPanel";
import TransformPanel from "../components/properties/TransformPanel";
import VentPanel from "../components/properties/VentPanel";
import useSelected from "../hooks/useSelected";

export default function RightSidebar() {
    const [selectedID] = useSelected();
    return (
        <div className="right-sidebar">
            <TransformPanel elementID={selectedID} />
            <SpritePanel elementID={selectedID} />
            <TaskPanel elementID={selectedID} />
            <VentPanel elementID={selectedID} />
            <CamPanel elementID={selectedID} />
            <ColliderPanel elementID={selectedID} />
            <div style={{ height: 40 }} />
        </div>
    );
}