import { Switch } from "@blueprintjs/core";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import PanelContainer from "./PanelContainer";

export default function RoomPanel() {
    const [element, setElement] = useSelectedElem();

    if (!element
        || element.type !== "util-room")
        return null;

    return (
        <PanelContainer title="Room">
            <Switch
                checked={element.properties.isRoomNameVisible !== false}
                label="Show Room Name"
                style={{ textAlign: "center", marginTop: 10, marginBottom: 15 }}
                onChange={(e) => {
                    setElement({
                        ...element,
                        properties: {
                            ...element.properties,
                            isRoomNameVisible: e.currentTarget.checked
                        }
                    });
                }}
            />
        </PanelContainer>
    );
}
