import { useTranslation } from "react-i18next";
import {
    DEFAULT_STARFIELD_COUNT,
    DEFAULT_STARFIELD_HEIGHT,
    DEFAULT_STARFIELD_LENGTH,
    DEFAULT_STARFIELD_MAXSPEED,
    DEFAULT_STARFIELD_MINSPEED
} from "../../../types/generic/Constants";
import InputGroup from "../input/InputGroup";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";

export default function StarfieldPanel() {
    const { t } = useTranslation();
    const isStarfield = useIsSelectedElemType("util-starfield");

    if (!isStarfield)
        return null;
    return (
        <PanelContainer title={t("starfield.title") as string}>
            <ElementPropNumericInput
                name={t("starfield.count")}
                prop="starfieldCount"
                defaultValue={DEFAULT_STARFIELD_COUNT}
                icon="Workspaces"
                min={1}
                stepSize={5}
                max={10000}
            />
            <InputGroup>
                <ElementPropNumericInput
                    name={t("starfield.length")}
                    prop="starfieldLength"
                    defaultValue={DEFAULT_STARFIELD_LENGTH}
                    icon="SwapHoriz"
                    min={0}
                    stepSize={1}
                    color="warning"
                />
                <ElementPropNumericInput
                    name={t("starfield.height")}
                    prop="starfieldHeight"
                    defaultValue={DEFAULT_STARFIELD_HEIGHT}
                    icon="SwapVert"
                    min={0}
                    stepSize={1}
                    color="warning"
                />
            </InputGroup>
            <InputGroup>
                <ElementPropNumericInput
                    name={t("starfield.minSpeed")}
                    prop="starfieldMinSpeed"
                    defaultValue={DEFAULT_STARFIELD_MINSPEED}
                    icon="FastRewind"
                    min={0}
                    stepSize={1}
                />
                <ElementPropNumericInput
                    name={t("starfield.maxSpeed")}
                    prop="starfieldMaxSpeed"
                    defaultValue={DEFAULT_STARFIELD_MAXSPEED}
                    icon="FastForward"
                    min={0}
                    stepSize={1}
                />
            </InputGroup>
        </PanelContainer>
    );
}
