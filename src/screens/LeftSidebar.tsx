import LayerHierarchy from "../components/scenegraph/LayerHierarchy";
import MapHierarchy from "../components/scenegraph/MapHierarchy";
import SceneScroller from "../components/scenegraph/SceneScroller";

export default function LeftSidebar() {

    return (
        <div className="left-sidebar">
            <LayerHierarchy />
            <MapHierarchy />
            <SceneScroller />
        </div>
    );
}