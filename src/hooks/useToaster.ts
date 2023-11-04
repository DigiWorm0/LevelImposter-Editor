import { Intent, Toaster } from "@blueprintjs/core";

const toaster = Toaster.create({
    maxToasts: 5
});

export default function useToaster() {
    const success = (message: string, link?: string) => {
        console.log("Toast Success", message, link);
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

    const danger = (message: string, link?: string) => {
        console.log("Toast Danger", message, link);
        toaster.show({
            intent: Intent.DANGER,
            message,
            icon: "error",
            action: link ? {
                icon: "share",
                onClick: () => {
                    if (link)
                        window.open(link, "_blank");
                }
            } : undefined
        });
    }

    const warning = (message: string) => {
        console.log("Toast Warning", message);
        toaster.show({
            intent: Intent.WARNING,
            message,
            icon: "warning-sign",
        });
    }

    const info = (message: string) => {
        console.log("Toast Info", message);
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