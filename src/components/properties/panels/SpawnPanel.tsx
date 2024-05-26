import { useTranslation } from "react-i18next";
import { DEFAULT_SPAWN_RANGE } from "../../../types/generic/Constants";
import PanelContainer from "../util/PanelContainer";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";

export default function SpawnPanel() {
    const { t } = useTranslation();
    const isSpawn1 = useIsSelectedElemType("util-spawn");
    const isSpawn2 = useIsSelectedElemType("util-spawn2");

    if (!isSpawn1 && !isSpawn2)
        return null;

    return (
        <PanelContainer title={t("spawn.title") as string}>
            <ElementPropNumericInput
                name={t("spawn.radius")}
                prop="range"
                defaultValue={DEFAULT_SPAWN_RANGE}
                icon="TripOrigin"
                stepSize={0.1}
                color="warning"
            />
            <ElementPropSwitch
                name={t("spawn.spawnDummies")}
                prop="spawnDummies"
                defaultValue={false}
            />
        </PanelContainer>
    );
}
