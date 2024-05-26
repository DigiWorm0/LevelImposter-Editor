import { useTranslation } from "react-i18next";
import ElementSelect from "./ElementSelect";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";

export default function TeleSelect() {
    const { t } = useTranslation();
    const [teleporterID, setTeleporterID] = useSelectedElemProp("teleporter");

    return (
        <ElementSelect
            typeFilter="util-tele"
            noElementsText={t("tele.errorNoTeles")}
            defaultText={t("tele.noConnection")}
            selectedID={teleporterID}
            onPick={(elem) => setTeleporterID(elem.id)}
            onReset={() => setTeleporterID(undefined)}
        />
    )
}