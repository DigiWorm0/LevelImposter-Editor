import { ControlGroup } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import NumericPanelInput from "../input/NumericPanelInput";
import PanelContainer from "../util/PanelContainer";
import { DEFAULT_SPAWN_RANGE } from "../../../types/generic/Constants";

export default function SpawnPanel() {
    const { t } = useTranslation();
    const element = useSelectedElemValue();

    if (!element || !element.type.startsWith("util-spawn"))
        return null;

    return (
        <PanelContainer title={t("spawn.title") as string}>
            <ControlGroup fill>
                <NumericPanelInput
                    name="spawn.radius"
                    prop="range"
                    defaultValue={DEFAULT_SPAWN_RANGE}
                    icon="circle"
                    minorStepSize={0.01}
                    stepSize={0.1}
                    majorStepSize={0.5}
                />
            </ControlGroup>
        </PanelContainer>
    );
}
