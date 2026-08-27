import {useTranslation} from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import MapError from "../util/MapError";
import useIsSelectedElemType from "../../../hooks/elements/useIsSelectedElemType";

export default function DeathTriggerPanel() {
    const {t} = useTranslation();
    const isTriggerDeath = useIsSelectedElemType("util-triggerdeath");

    if (!isTriggerDeath)
        return null;

    return (
        <>
            <PanelContainer title={t("triggerdeath.title") as string}>
                <ElementPropSwitch
                    prop={"createDeadBody"}
                    name={t("triggerdeath.createDeadBody")}
                    defaultValue={true}
                    tooltip={t("triggerdeath.createDeadBodyTooltip")}
                />
            </PanelContainer>
            <MapError info>
                {t("triggerdeath.triggerDeathInfo") as string}
            </MapError>
        </>
    );
}
