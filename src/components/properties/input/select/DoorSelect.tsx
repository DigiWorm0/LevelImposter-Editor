import { useTranslation } from "react-i18next";
import ElementSelect from "./ElementSelect";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";

export interface DoorSelectProps {
    prop: "doorA" | "doorB";
}

export default function DoorSelect(props: DoorSelectProps) {
    const { t } = useTranslation();
    const [doorID, setDoorID] = useSelectedElemProp(props.prop);

    return (
        <ElementSelect
            typeFilter="sab-door"
            noElementsText={t("door.errorNoDoors")}
            defaultText={t("door.none")}
            selectedID={doorID}
            onPick={(elem) => setDoorID(elem.id)}
            onReset={() => setDoorID(undefined)}
        />
    )
}