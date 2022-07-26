import AddObjectButton from "../components/dialogs/AddObjectButton";
import MapHierarchy from "../components/scenegraph/MapHierarchy";

export default function LeftSidebar() {
    return (
        <div className="left-sidebar">
            <AddObjectButton />
            <div style={{ margin: 8 }} />
            <MapHierarchy />
        </div>
    );
}