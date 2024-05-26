import React from "react";
import { useTranslation } from "react-i18next";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import ImageUpload from "../util/ImageUpload";
import PanelContainer from "../util/PanelContainer";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import { Box } from "@mui/material";

export default function MeetingPanel() {
    const { t } = useTranslation();
    const isMeeting = useIsSelectedElemType("util-meeting");
    const [meetingBackgroundID, setMeetingBackgroundID] = useSelectedElemProp("meetingBackgroundID");

    if (!isMeeting)
        return null;
    return (
        <PanelContainer title={t("meeting.title") as string}>
            <Box sx={{ ps: 2, pe: 2, pt: 1 }}>
                <ImageUpload
                    name={t("meeting.bg") as string}
                    showName
                    defaultSpriteURL={"/sprites/util-meetingbackground.png"}
                    assetID={meetingBackgroundID}
                    onUpload={asset => setMeetingBackgroundID(asset.id)}
                    onReset={() => setMeetingBackgroundID(undefined)}
                />
            </Box>
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
    );
}
