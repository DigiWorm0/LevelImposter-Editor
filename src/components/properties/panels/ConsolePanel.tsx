import { useTranslation } from "react-i18next";
import { DEFAULT_CONSOLE_RANGE } from "../../../types/generic/Constants";
import ElementPropColorInput from "../input/elementProps/ElementPropColorInput";
import PanelContainer from "../util/PanelContainer";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import useSelectedElemType from "../../../hooks/elements/useSelectedElemType";
import getIsConsole from "../../../utils/map/getIsConsole";
import { TripOrigin } from "@mui/icons-material";

export default function ConsolePanel() {
    const { t } = useTranslation();
    const selectedType = useSelectedElemType();
    const isConsole = getIsConsole(selectedType || "")
        && !selectedType?.startsWith("util-vent");
    // <-- Don't allow editing vent consoles, it won't work

    if (!isConsole)
        return null;
    return (
        <PanelContainer title={t("console.title") as string}>
            <ElementPropNumericInput
                name={t("console.range")}
                prop="range"
                defaultValue={DEFAULT_CONSOLE_RANGE}
                icon={<TripOrigin />}
                min={0}
                stepSize={0.2}
                color="warning"
            />
            {selectedType === "util-triggerconsole" && (
                <ElementPropColorInput
                    name={t("console.highlightColor") as string}
                    prop="highlightColor"
                    defaultValue={{ r: 255, g: 255, b: 0, a: 1 }} // Yellow
                />
            )}
            <ElementPropSwitch
                name={t("console.onlyFromBelow")}
                prop="onlyFromBelow"
                defaultValue={false}
            />
            <ElementPropSwitch
                name={t("console.checkCollision")}
                prop="checkCollision"
                defaultValue={false}
            />
        </PanelContainer>
    );
}
