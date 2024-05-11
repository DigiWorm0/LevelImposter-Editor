import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import ImageUpload from "../util/ImageUpload";
import PanelContainer from "../util/PanelContainer";
import MapAsset from "../../../types/li/MapAssetDB";

export default function MeetingPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const onUploadSprite = React.useCallback((asset: MapAsset) => {
        if (!selectedElem)
            return;
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                meetingBackgroundID: asset.id
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
                meetingBackgroundID: undefined
            }
        });
    }, [selectedElem, setSelectedElem]);

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
                        assetID={selectedElem.properties.meetingBackgroundID}
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
        </>
    );
}
