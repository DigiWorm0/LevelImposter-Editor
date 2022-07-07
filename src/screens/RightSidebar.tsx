import React from "react";
import ColliderPanel from "../components/properties/ColliderPanel";
import TaskPanel from "../components/properties/TaskPanel";
import TransformPanel from "../components/properties/TransformPanel";

export default function RightSidebar() {
    return (
        <div className="right-sidebar">
            <TransformPanel />
            <TaskPanel />
            <ColliderPanel />
            <div style={{ height: 40 }} />
        </div>
    );
}