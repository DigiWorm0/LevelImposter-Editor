import { Intent, Toaster } from "@blueprintjs/core";

const toaster = Toaster.create();

export default function useToaster() {
    const success = (message: string) => {
        toaster.show({
            intent: Intent.SUCCESS,
            message,
            icon: "tick",
        });
    }

    const error = (message: string) => {
        toaster.show({
            intent: Intent.DANGER,
            message,
            icon: "error",
        });
    }

    const warning = (message: string) => {
        toaster.show({
            intent: Intent.WARNING,
            message,
            icon: "warning-sign",
        });
    }

    return {
        success,
        error,
        warning,
    };
}