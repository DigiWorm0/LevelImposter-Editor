import { Switch } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import MapError from "./MapError";
import PanelContainer from "./PanelContainer";

export default function RoomPanel() {
    const { t } = useTranslation();
    const [element, setElement] = useSelectedElem();

    if (!element
        || element.type !== "util-room")
        return null;

    const hasCollider = element.properties.colliders !== undefined && element.properties.colliders.length > 0;

    return (
        <>
            <PanelContainer title={t("room.title") as string}>
                <Switch
                    checked={element.properties.isRoomNameVisible !== false}
                    label={t("room.showName") as string}
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
                    label={t("room.showOnAdmin") as string}
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
            <MapError isVisible={!hasCollider}>
                {t("room.errorNoCollider") as string}
            </MapError>
        </>
    );
}
