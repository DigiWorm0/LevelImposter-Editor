import { Intent, Toaster } from "@blueprintjs/core";

const toaster = Toaster.create();

export default function useToaster() {
    const success = (message: string, link?: string) => {
        toaster.show({
            intent: Intent.SUCCESS,
            message,
            icon: "tick",
            action: link ? {
                icon: "share",
                text: "Open",
                onClick: () => {
                    if (link)
                        window.open(link, "_blank");
                }
            } : undefined
        });
    }

    const danger = (message: string) => {
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

    const info = (message: string) => {
        toaster.show({
            intent: Intent.PRIMARY,
            message,
            icon: "info-sign",
        });
    }

    return {
        success,
        danger,
        warning,
        info,
    };
}