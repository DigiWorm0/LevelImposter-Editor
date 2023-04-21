import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import ImageUpload from "../util/ImageUpload";
import PanelContainer from "../util/PanelContainer";
import MapError from "../util/MapError";

export default function MeetingPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const onUploadSprite = React.useCallback((spriteURL: string) => {
        if (!selectedElem)
            return;
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                meetingBackground: spriteURL
            }
        });
    }, [selectedElem, setSelectedElem]);

    const onResetSprite = React.useCallback(() => {
        if (!selectedElem)
            return;
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                meetingBackground: undefined
            }
        });
    }, [selectedElem, setSelectedElem]);

    const isNotWav = React.useMemo(() => {
        return selectedElem?.properties.sounds?.some((s) => !s.data?.startsWith("data:audio/wav;base64,"));
    }, [selectedElem?.properties.sounds]);

    if (!selectedElem || selectedElem.type !== "util-meeting")
        return null;

    return (
        <>
            <PanelContainer title={t("meeting.title") as string}>
                <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
                    <ImageUpload
                        name={t("meeting.bg") as string}
                        showName
                        defaultSpriteURL={"/sprites/util-meetingbackground.png"}
                        spriteURL={selectedElem.properties.meetingBackground}
                        onUpload={onUploadSprite}
                        onReset={onResetSprite}
                    />
                </div>
                <SoundEditorPanel
                    title={t("meeting.buttonStinger") as string}
                    soundType="meetingButtonStinger"
                    defaultSoundURL="meetingButtonStinger.wav"
                />
                <SoundEditorPanel
                    title={t("meeting.reportStinger") as string}
                    soundType="meetingReportStinger"
                    defaultSoundURL="meetingReportStinger.wav"
                />
            </PanelContainer>
            <MapError
                isVisible={isNotWav}
                icon="volume-off"
            >
                {t("audio.errorNotWav") as string}
            </MapError>
        </>
    );
}
