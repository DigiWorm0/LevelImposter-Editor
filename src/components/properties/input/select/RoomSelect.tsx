import { useTranslation } from "react-i18next";
import ElementSelect from "./ElementSelect";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";

export interface RoomSelectProps {
    useDefault: boolean;
    label?: string;
}

export default function RoomSelect(props: RoomSelectProps) {
    const { t } = useTranslation();
    const [parent, setParent] = useSelectedElemProp("parent");

    return (
        <ElementSelect
            label={props.label}
            typeFilter="util-room"
            noElementsText={t("room.errorNoRooms")}
            defaultText={props.useDefault ? t("room.default") : t("room.none")}
            selectedID={parent}
            onPick={(elem) => setParent(elem.id)}
            onReset={() => setParent(undefined)}
        />
    );
}