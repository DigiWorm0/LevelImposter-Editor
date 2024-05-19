import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth, githubProvider, googleProvider, microsoftProvider } from "../../utils/Firebase";
import useToaster from "../../hooks/useToaster";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button, ButtonGroup, Divider, InputAdornment, TextField, Typography } from "@mui/material";
import { Email, GitHub, Google, Microsoft, OpenInNew, Password } from "@mui/icons-material";
import GenericModal from "./GenericModal";


const SIGN_UP_PAGE = "https://levelimposter.net/#/login";

export interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignInModal(props: SignInModalProps) {
    const { t } = useTranslation();
    const [user] = useAuthState(auth);
    const isLoggedIn = user !== null;
    const toaster = useToaster();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const signInWithGithub = () => {
        signInWithPopup(auth, githubProvider).catch((e) => {
            toaster.danger(e.message);
        });
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider).catch((e) => {
            toaster.danger(e.message);
        });
    }

    const signInWithEmail = () => {
        signInWithEmailAndPassword(auth, email, password).catch((e) => {
            toaster.danger(e.message);
        });
    }

    const signInWithMicrosoft = () => {
        signInWithPopup(auth, microsoftProvider).catch((e) => {
            toaster.danger(e.message);
        });
    }

    const signUp = () => {
        window.open(SIGN_UP_PAGE, "_blank");
    }

    return (
        <GenericModal
            open={props.isOpen && !isLoggedIn}
            onClose={props.onClose}
        >
            <div
                style={{
                    margin: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <h2>
                    {t("account.signInWithSocial")}
                </h2>
                <ButtonGroup style={{ marginBottom: 10 }}>
                    <Button onClick={signInWithGoogle} size={"large"}>
                        <Google />
                    </Button>
                    <Button onClick={signInWithGithub} size={"large"}>
                        <GitHub />
                    </Button>
                    <Button onClick={signInWithMicrosoft} size={"large"}>
                        <Microsoft />
                    </Button>
                </ButtonGroup>
                <Divider
                    sx={{ width: "100%" }}
                />
                <Typography
                    variant={"body2"}
                    sx={{ color: "text.secondary", margin: 1 }}
                    style={{ textAlign: "center" }}
                >
                    {t("account.orUseEmail")}
                </Typography>

                <TextField
                    size={"small"}
                    fullWidth
                    variant={"outlined"}
                    style={{ marginBottom: 5 }}
                    placeholder={t("account.email") as string}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            signInWithEmail();
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position={"start"}><Email /></InputAdornment>
                    }}
                />
                <TextField
                    size={"small"}
                    fullWidth
                    variant={"outlined"}
                    style={{ marginBottom: 10 }}
                    placeholder={t("account.password") as string}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            signInWithEmail();
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position={"start"}><Password /></InputAdornment>
                    }}
                />
                <ButtonGroup>
                    <Button
                        onClick={signInWithEmail}
                        disabled={!email || !password}
                    >
                        {t("account.signIn") as string}
                    </Button>
                    <Button
                        onClick={signUp}
                        endIcon={<OpenInNew />}
                    >
                        {t("account.signUp") as string}
                    </Button>
                </ButtonGroup>
            </div>
        </GenericModal>
    );
}