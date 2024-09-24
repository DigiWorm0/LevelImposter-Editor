import { useTranslation } from "react-i18next";
import ElementSelect from "./ElementSelect";
import useSelectedElemProp, { useSelectedElemPropValue } from "../../../../hooks/elements/useSelectedElemProperty";

export interface VentSelectProps {
    prop: "leftVent" | "middleVent" | "rightVent";
}

export default function VentSelect(props: VentSelectProps) {
    const { t } = useTranslation();
    const [ventID, setVentID] = useSelectedElemProp(props.prop);
    const leftVent = useSelectedElemPropValue("leftVent");
    const middleVent = useSelectedElemPropValue("middleVent");
    const rightVent = useSelectedElemPropValue("rightVent");

    return (
        <ElementSelect
            typeFilter="util-vent"
            noElementsText={t("vent.errorNoVents")}
            defaultText={t("vent.noConnection")}
            selectedID={ventID}
            onPick={(elem) => setVentID(elem.id)}
            onReset={() => setVentID(undefined)}
            blacklistedIDs={[leftVent, middleVent, rightVent]}
        />
    );
}