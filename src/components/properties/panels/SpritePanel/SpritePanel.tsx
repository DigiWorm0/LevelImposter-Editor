import React from "react";
import {useTranslation} from "react-i18next";
import PanelContainer from "../../util/PanelContainer";
import useSelectedElemType from "../../../../hooks/elements/useSelectedElemType";
import StillSpriteErrors from "./StillSpriteErrors";
import StillSpritePanel from "./StillSpritePanel";

const TYPE_BLACKLIST = [
    "util-player",
    "util-room",
    "util-spawn1",
    "util-spawn2",
    "util-sound1",
    "util-sound2",
    "util-tele",
    "util-layer",
    "util-meeting",
    "util-triggerrepeat",
    "util-triggersound",
    "util-triggerrand",
    "util-triggertimer",
    "util-triggerstart",
    "util-triggeranim",
    "util-dummy",
    "util-display",
    "util-onewaycollider",
    "util-decontamination",
    "util-sabotages",
    "util-binocularscollider",
    "util-ghostcollider",
    "util-eject",
    "util-triggergate",
    "util-valuebool",
    "util-valueboolpreset",
    "util-valuecomparator",
    "util-lobbyspawn",
    "util-lobbyoptions"
];

export default function SpritePanel() {
    const {t} = useTranslation();
    const selectedType = useSelectedElemType();

    if (!selectedType || TYPE_BLACKLIST.includes(selectedType))
        return null;

    return (
        <>
            <PanelContainer title={t("sprite.title") as string}>
                <StillSpritePanel/>
            </PanelContainer>
            <StillSpriteErrors/>
        </>
    );
}
