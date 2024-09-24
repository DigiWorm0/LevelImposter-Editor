import {useTranslation} from "react-i18next";
import React from "react";
import TimelineRow from "../TimelineRow";
import {Button, Paper} from "@mui/material";
import {Add} from "@mui/icons-material";
import AddTargetModal from "../../modals/AddTargetModal";
import TimelinePlayhead from "../body/TimelinePlayhead";

export default function TimelineAddRow() {
    const {t} = useTranslation();
    const [isAddModalVisible, setAddModalVisible] = React.useState(false);

    return (
        <>
            <TimelineRow
                header={(
                    <Button
                        variant={"text"}
                        size={"small"}
                        onClick={() => setAddModalVisible(true)}
                    >
                        <Add/>
                        {t("anim.addTarget")}
                    </Button>
                )}
            >
                <Paper
                    elevation={5}
                    square
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <TimelinePlayhead/>
                </Paper>
            </TimelineRow>
            <AddTargetModal
                isOpen={isAddModalVisible}
                onClose={() => setAddModalVisible(false)}
            />
        </>
    );
}