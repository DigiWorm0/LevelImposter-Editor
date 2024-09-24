import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

export type Toastable = string | Error | any;

// List of error codes that shouldn't be shown to the user
const DISABLED_CODES = [
    "auth/popup-closed-by-user",
    "auth/user-cancelled",
];

export default function useToaster() {
    const { t, i18n } = useTranslation();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const toast = (message: Toastable, variant: "success" | "error" | "warning" | "info") => {

        // Get the text from the message
        const isError = message instanceof Error;
        let text = isError ? message.message : message;

        // Get the code from the message
        const code = message.code;
        if (code) {
            // Check if the error code is disabled
            if (DISABLED_CODES.includes(code))
                return;

            // Check if the error code has a translation
            const translationID = `errorCode.${message.code}`;
            if (i18n.exists(translationID))
                text = t(translationID);
        }

        // Log the message to the console
        if (variant === "error")
            console.error(message);
        else if (variant === "warning")
            console.warn(message);
        else
            console.log(message);

        // Show the toast
        return enqueueSnackbar(text, {
            variant,
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "center"
            }
        });
    };

    const success = (message: Toastable) => toast(message, "success");
    const error = (message: Toastable) => toast(message, "error");
    const warn = (message: Toastable) => toast(message, "warning");
    const info = (message: Toastable) => toast(message, "info");

    return {
        dismiss: closeSnackbar,
        success,
        error,
        warn,
        info,
    };
}