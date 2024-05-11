import MapHierarchy from "../scenegraph/MapHierarchy";
import SceneScroller from "../scenegraph/SceneScroller";

export default function LeftSidebar() {

    return (
        <div className="left-sidebar">
            <MapHierarchy />
            <SceneScroller />
        </div>
    );
}