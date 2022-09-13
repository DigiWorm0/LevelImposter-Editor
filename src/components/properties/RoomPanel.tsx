import { Switch } from "@blueprintjs/core";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useTranslation from "../../hooks/useTranslation";
import PanelContainer from "./PanelContainer";

export default function RoomPanel() {
    const translation = useTranslation();
    const [element, setElement] = useSelectedElem();

    if (!element
        || element.type !== "util-room")
        return null;

    return (
        <PanelContainer title={translation.Room}>
            <Switch
                checked={element.properties.isRoomNameVisible !== false}
                label={translation.ShowName}
                style={{ textAlign: "center", marginTop: 5, marginBottom: 10 }}
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
            <Switch
                checked={element.properties.isRoomAdminVisible !== false}
                label={translation.ShowAdminTable}
                style={{ textAlign: "center", marginTop: 5, marginBottom: 15 }}
                onChange={(e) => {
                    setElement({
                        ...element,
                        properties: {
                            ...element.properties,
                            isRoomAdminVisible: e.currentTarget.checked
                        }
                    });
                }}
            />
        </PanelContainer>
    );
}
