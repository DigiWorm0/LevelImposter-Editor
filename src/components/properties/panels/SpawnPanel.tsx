import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/elements/useSelectedElem";
import { DEFAULT_SPAWN_RANGE } from "../../../types/generic/Constants";
import NumericPanelInput from "../input/NumericPanelInput";
import SwitchPanelInput from "../input/SwitchPanelInput";
import PanelContainer from "../util/PanelContainer";

export default function SpawnPanel() {
    const { t } = useTranslation();
    const element = useSelectedElemValue();

    if (!element || !element.type.startsWith("util-spawn"))
        return null;

    return (
        <PanelContainer title={t("spawn.title") as string}>
            <NumericPanelInput
                name="spawn.radius"
                prop="range"
                defaultValue={DEFAULT_SPAWN_RANGE}
                icon="TripOrigin"
                minorStepSize={0.01}
                stepSize={0.1}
                majorStepSize={0.5}
                color="warning"
            />
            <SwitchPanelInput
                name="spawn.spawnDummies"
                prop="spawnDummies"
                defaultValue={false}
            />
        </PanelContainer>
    );
}
