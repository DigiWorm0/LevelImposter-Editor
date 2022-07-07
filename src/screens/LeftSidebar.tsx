import React from "react";
import MapElement from "../components/scenegraph/MapElement";
import MapHierarchy from "../components/scenegraph/MapHierarchy";
import MapName from "../components/scenegraph/MapName";
import { getElement } from "../hooks/useElement";
import useMap from "../hooks/useMap";

export default function LeftSidebar() {
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [map] = useMap();

    const handleModalOpen = () => {
        setModalVisible(true);
    }
    const handleModalClose = () => {
        setModalVisible(false);
    }

    return (
        <div className="left-sidebar">
            <MapHierarchy />
        </div>
    );
}