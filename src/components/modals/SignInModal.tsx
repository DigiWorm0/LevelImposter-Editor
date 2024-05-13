import { Button, ButtonGroup, Classes, Dialog, Divider, FormGroup, InputGroup } from "@blueprintjs/core";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth, githubProvider, googleProvider, microsoftProvider } from "../../utils/Firebase";
import { useSettingsValue } from "../../hooks/useSettings";
import useToaster from "../../hooks/useToaster";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";


const SIGN_UP_PAGE = "https://levelimposter.net/#/login";
const GOOGLE_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-google"
         viewBox="0 0 16 16">
        <path
            d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
    </svg>
);
const GITHUB_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-github"
         viewBox="0 0 16 16">
        <path
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
);
const MICROSOFT_SVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-microsoft"
         viewBox="0 0 16 16">
        <path d="M7.462 0H0v7.19h7.462zM16 0H8.538v7.19H16zM7.462 8.211H0V16h7.462zm8.538 0H8.538V16H16z" />
    </svg>
);

export interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignInModal(props: SignInModalProps) {
    const { t } = useTranslation();
    const { isDarkMode } = useSettingsValue();
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
        <Dialog
            isOpen={props.isOpen && !isLoggedIn}
            onClose={props.onClose}
            portalClassName={isDarkMode ? "bp5-dark" : ""}
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
                <ButtonGroup large minimal style={{ marginBottom: 10 }}>
                    <Button
                        icon={GOOGLE_SVG}
                        onClick={signInWithGoogle}
                    />
                    <Button
                        icon={GITHUB_SVG}
                        onClick={signInWithGithub}
                    />
                    <Button
                        icon={MICROSOFT_SVG}
                        onClick={signInWithMicrosoft}
                    />
                </ButtonGroup>
                <FormGroup fill>
                    <Divider style={{ margin: 10 }} />
                    <p style={{ textAlign: "center" }} className={Classes.TEXT_MUTED}>
                        {t("account.orUseEmail")}
                    </p>
                    <InputGroup
                        leftIcon={"envelope"}
                        placeholder={t("account.email") as string}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                signInWithEmail();
                        }}
                    />
                    <InputGroup
                        leftIcon={"lock"}
                        placeholder={t("account.password") as string}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                signInWithEmail();
                        }}
                    />
                </FormGroup>
                <ButtonGroup>
                    <Button
                        text={t("account.signIn") as string}
                        onClick={signInWithEmail}
                        disabled={!email || !password}
                    />
                    <Button
                        text={t("account.signUp") as string}
                        onClick={signUp}
                        rightIcon={"share"}
                    />
                </ButtonGroup>
            </div>
        </Dialog>
    );
}