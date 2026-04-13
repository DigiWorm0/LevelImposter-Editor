import React from "react";
import {useTranslation} from "react-i18next";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import PanelContainer from "../util/PanelContainer";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";

export default function LobbyPanel() {
    const {t} = useTranslation();
    const isLobby = useIsSelectedElemType("util-lobbyoptions");

    if (!isLobby)
        return null;
    return (
        <PanelContainer title={t("lobby.title") as string}>
            <SoundEditorPanel
                title={t("lobby.ambientNoise") as string}
                soundType="lobbyAmbientNoise"
                defaultSoundURL="lobbyAmbientNoise.wav"
            />
            <SoundEditorPanel
                title={t("lobby.lobbyMusic") as string}
                soundType="lobbyMusic"
                defaultSoundURL="lobbyMusic.wav"
            />
            <SoundEditorPanel
                title={t("lobby.spawnInNoise") as string}
                soundType="lobbySpawnInNoise"
                defaultSoundURL="lobbySpawnInNoise.wav"
            />
        </PanelContainer>
    );
}
