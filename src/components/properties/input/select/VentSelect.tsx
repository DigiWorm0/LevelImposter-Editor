import { useTranslation } from "react-i18next";
import ElementSelect from "./ElementSelect";
import useSelectedElemProp, { useSelectedElemPropValue } from "../../../../hooks/elements/useSelectedElemProperty";
import { MaybeGUID } from "../../../../types/generic/GUID";

export interface VentSelectProps {
    prop: "leftVent" | "middleVent" | "rightVent";
}

export default function VentSelect(props: VentSelectProps) {
    const { t } = useTranslation();
    const [ventID, setVentID] = useSelectedElemProp<MaybeGUID>(props.prop)
    const leftVent = useSelectedElemPropValue<MaybeGUID>("leftVent");
    const middleVent = useSelectedElemPropValue<MaybeGUID>("middleVent");
    const rightVent = useSelectedElemPropValue<MaybeGUID>("rightVent");

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
    )
}