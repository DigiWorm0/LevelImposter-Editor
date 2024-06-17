import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { auth } from "../../../utils/Firebase";
import GenericModal from "../GenericModal";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import PublishModalEditor from "./PublishModalEditor";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import PublishModalTarget from "./PublishModalTarget";
import PublishModalUpload from "./PublishModalUpload";

export interface PublishModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PublishModal(props: PublishModalProps) {
    const { t } = useTranslation();
    const [user] = useAuthState(auth);
    const [step, setStep] = React.useState(0);

    const isLoggedIn = user !== null;

    React.useEffect(() => {
        if (props.isOpen)
            setStep(0);
    }, [props.isOpen]);


    return (
        <GenericModal
            open={props.isOpen && isLoggedIn}
            onClose={props.onClose}
            title={t("publish.title")}
        >
            {step === 0 && <PublishModalEditor />}
            {step === 1 && <PublishModalTarget />}
            {step === 2 && <PublishModalUpload onClose={props.onClose} />}

            <Stepper
                sx={{ mt: 1 }}
                activeStep={step}
            >
                <Step>
                    <StepLabel>Enter Info</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Choose Target</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Publish Map</StepLabel>
                </Step>
            </Stepper>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2
                }}
            >
                <Button
                    size={"small"}
                    onClick={() => setStep(step - 1)}
                    disabled={step === 0}
                >
                    <KeyboardArrowLeft />
                    Back
                </Button>
                <Button
                    size={"small"}
                    onClick={() => setStep(step + 1)}
                    disabled={step === 2}
                >
                    Next
                    <KeyboardArrowRight />
                </Button>
            </Box>
        </GenericModal>
    );
}