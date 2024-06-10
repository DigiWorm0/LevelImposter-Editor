export default function getIsConsole(type: string) {
    const isVent = type.startsWith("util-vent");
    const isSpore = type === "util-spore";
    return type.startsWith("task-")
        || (type.startsWith("sab-") && !type.startsWith("sab-btn") && !type.startsWith("sab-door"))
        || type.startsWith("util-button")
        || type.startsWith("util-cams")
        || type === "util-admin"
        || type === "util-vitals"
        || type === "util-computer"
        || type === "util-triggerconsole"
        || isVent
        || isSpore;
}