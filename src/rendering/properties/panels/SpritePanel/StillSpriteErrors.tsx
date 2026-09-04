import {useTranslation} from "react-i18next";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";
import getIsElementInteractable from "@editor/document/elements/types/getIsElementInteractable";
import MapError from "../../util/MapError";
import {Padding, PlayArrow, Visibility} from "@mui/icons-material";
import {useAtomValue} from "jotai";
import {selectedElementTypeAtom} from "@editor/selection/stores/elementSelectionStore";

export default function StillSpriteErrors() {
    const {t} = useTranslation();
    const [spriteID] = useSelectedElemProp("spriteID");
    const selectedType = useAtomValue(selectedElementTypeAtom);

    const isConsole = selectedType !== undefined && getIsElementInteractable(selectedType);
    return (
        <>
            <MapError
                info
                isVisible={selectedType?.startsWith("util-vent")}
                icon={<PlayArrow/>}
            >
                {t("sprite.ventInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedType?.startsWith("sab-door")}
                icon={<PlayArrow/>}
            >
                {t("sprite.doorInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedType === "util-cam"}
                icon={<PlayArrow/>}
            >
                {t("sprite.camInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={spriteID !== undefined && isConsole}
                icon={<Padding/>}
            >
                {t("sprite.paddingInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedType === "util-filter"}
                icon={<Visibility/>}
            >
                {t("sprite.filterInfo") as string}
            </MapError>
        </>
    );
}