import { useTranslation } from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import { Timer } from "@mui/icons-material";

export default function TimerPanel() {
    const { t } = useTranslation();
    const isTimer = useIsSelectedElemType("util-triggertimer");

    if (!isTimer)
        return null;

    return (
        <PanelContainer title={t("timer.title") as string}>
            <ElementPropNumericInput
                name={t("timer.duration")}
                prop="triggerTime"
                defaultValue={1}
                icon={<Timer />}
                label="seconds"
                min={0}
                stepSize={1}
            />
            <ElementPropSwitch
                prop={"triggerLoop"}
                name={t("timer.isRepeat")}
                defaultValue={false}
                tooltip={t("timer.isRepeatTooltip")}
            />
        </PanelContainer>
    );
}
