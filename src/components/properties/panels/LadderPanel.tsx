import {useTranslation} from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import {DEFAULT_LADDER_COOLDOWN, DEFAULT_LADDER_HEIGHTS, DEFAULT_LADDER_OFFSET} from "../../../types/generic/Constants";
import {Height, HourglassEmpty, SwapVert} from "@mui/icons-material";

export default function LadderPanel() {
    const {t} = useTranslation();
    const isLadder1 = useIsSelectedElemType("util-ladder1");
    const isLadder2 = useIsSelectedElemType("util-ladder2");

    if (!isLadder1 && !isLadder2)
        return null;
    return (
        <PanelContainer title={t("ladder.title") as string}>
            <ElementPropNumericInput
                name={t("ladder.height")}
                prop="ladderHeight"
                defaultValue={isLadder1 ? DEFAULT_LADDER_HEIGHTS["util-ladder1"] : DEFAULT_LADDER_HEIGHTS["util-ladder2"]}
                icon={<Height/>}
                min={0}
                stepSize={0.1}
                color="warning"
            />
            <ElementPropNumericInput
                name={t("ladder.offset")}
                prop="ladderOffset"
                defaultValue={DEFAULT_LADDER_OFFSET}
                icon={<SwapVert/>}
                min={0}
                stepSize={0.1}
                color="warning"
            />
            <ElementPropNumericInput
                name={t("ladder.cooldown")}
                prop="ladderCooldown"
                defaultValue={DEFAULT_LADDER_COOLDOWN}
                icon={<HourglassEmpty/>}
                min={0}
                stepSize={0.1}
            />
        </PanelContainer>
    );
}
