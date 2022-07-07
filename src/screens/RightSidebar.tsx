import React from "react";
import ColliderPanel from "../components/properties/ColliderPanel";
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
            <VentPanel />
            <ColliderPanel />
            <div style={{ height: 40 }} />
        </div>
    );
}