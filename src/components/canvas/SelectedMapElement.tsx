import { Group } from "react-konva";
import useElement from "../../hooks/useElement";
import useSelected from "../../hooks/useSelected";
import CameraRender from "./CameraRender";
import ColliderRender from "./ColliderRender";
import VentConnections from "./VentConnections";

const UNITY_SCALE = 100;

export default function SelectedMapElement() {
    const [selectedID] = useSelected();
    const [elem] = useElement(selectedID);

    return (
        <>
            <VentConnections elementID={selectedID} />

            <Group
                x={elem.x * UNITY_SCALE}
                y={-elem.y * UNITY_SCALE}
                scaleX={elem.xScale}
                scaleY={elem.yScale}
                rotation={-elem.rotation}>

                <ColliderRender elementID={selectedID} />
                <CameraRender elementID={selectedID} />

            </Group>
        </>
    );
}