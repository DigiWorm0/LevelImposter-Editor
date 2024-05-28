import { useTranslation } from "react-i18next";
import InputGroup from "../input/InputGroup";
import PanelContainer from "../util/PanelContainer";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import { SwapHoriz, SwapVert, ZoomIn } from "@mui/icons-material";

export default function CamPanel() {
    const { t } = useTranslation();
    const isCamera = useIsSelectedElemType("util-cam");
    const isBinoculars = useIsSelectedElemType("util-cams4");
    const isDisplay = useIsSelectedElemType("util-display");

    if (!isCamera && !isBinoculars && !isDisplay)
        return null;

    return (
        <PanelContainer title={t("cameras.title") as string}>
            <InputGroup>
                <ElementPropNumericInput
                    name={t("cameras.offsetx")}
                    prop="camXOffset"
                    defaultValue={0}
                    icon={<SwapHoriz />}
                    stepSize={0.5}
                    color={"success"}
                />
                <ElementPropNumericInput
                    name={t("cameras.offsety")}
                    prop="camYOffset"
                    defaultValue={0}
                    icon={<SwapVert />}
                    stepSize={0.5}
                    color={"success"}
                />
            </InputGroup>
            <ElementPropNumericInput
                name={t("cameras.zoom")}
                prop="camZoom"
                defaultValue={3}
                icon={<ZoomIn />}
                min={0}
                stepSize={0.5}
                color={"success"}
            />
        </PanelContainer>
    );
}
