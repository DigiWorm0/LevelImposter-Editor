import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useTranslation} from "react-i18next";
import {auth} from "@/utils/Firebase";
import GenericModal from "../GenericModal";
import {Box, Button, Step, StepLabel, Stepper} from "@mui/material";
import PublishModalEditor from "./PublishModalEditor";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import PublishModalTarget from "./PublishModalTarget";
import PublishModalUpload from "./PublishModalUpload";
import OptimizeMapPanel from "../OptimizeMap/OptimizeMapPanel";

export interface PublishModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PublishModal(props: PublishModalProps) {
    const {t} = useTranslation();
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
            DialogProps={{
                maxWidth: "lg"
            }}
        >
            <Stepper
                sx={{mb: 1}}
                activeStep={step}
            >
                <Step>
                    <StepLabel>{t("publish.optimize")}</StepLabel>
                </Step>
                <Step>
                    <StepLabel>{t("publish.enterInfo")}</StepLabel>
                </Step>
                <Step>
                    <StepLabel>{t("publish.chooseTarget")}</StepLabel>
                </Step>
                <Step>
                    <StepLabel>{t("publish.publish")}</StepLabel>
                </Step>
            </Stepper>

            {step === 0 && <OptimizeMapPanel/>}
            {step === 1 && <PublishModalEditor/>}
            {step === 2 && <PublishModalTarget/>}
            {step === 3 && <PublishModalUpload onClose={props.onClose}/>}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2
                }}
            >
                <Button
                    onClick={() => setStep(step - 1)}
                    disabled={step === 0}
                    variant={"contained"}
                    color={"secondary"}
                >
                    <KeyboardArrowLeft/>
                    Back
                </Button>
                <Button
                    onClick={() => setStep(step + 1)}
                    disabled={step === 3}
                    variant={"contained"}
                    color={"primary"}
                >
                    Next
                    <KeyboardArrowRight/>
                </Button>
            </Box>
        </GenericModal>
    );
}