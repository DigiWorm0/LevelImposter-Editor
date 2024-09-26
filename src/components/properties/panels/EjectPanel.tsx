import {useTranslation} from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import {ArrowBack, ArrowForward, Logout, TextFields} from "@mui/icons-material";
import MapError from "../util/MapError";

export default function EjectPanel() {
    const {t} = useTranslation();
    const isEject = useIsSelectedElemType("util-eject");

    if (!isEject)
        return null;

    return (
        <>
            <PanelContainer title={t("eject.title") as string}>
                <ElementPropNumericInput
                    name={t("eject.pretextduration")}
                    prop="ejectPreTextDuration"
                    defaultValue={2}
                    icon={<ArrowBack/>}
                    min={0}
                    stepSize={0.25}
                    label={t("eject.seconds")}
                />
                <ElementPropNumericInput
                    name={t("eject.textduration")}
                    prop="ejectTextDuration"
                    defaultValue={2}
                    icon={<TextFields/>}
                    min={0}
                    stepSize={0.25}
                    label={t("eject.seconds")}
                />
                <ElementPropNumericInput
                    name={t("eject.posttextduration")}
                    prop="ejectPostTextDuration"
                    defaultValue={2}
                    icon={<ArrowForward/>}
                    min={0}
                    stepSize={0.25}
                    label={t("eject.seconds")}
                />
            </PanelContainer>
            <MapError
                info
                icon={<Logout/>}
            >
                {t("eject.infoEject")}
            </MapError>
        </>
    );
}
