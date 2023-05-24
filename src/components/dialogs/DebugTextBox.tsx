import { Button, H3, H6 } from "@blueprintjs/core";
import { useDebugTextValue } from "../../hooks/jotai/useDebugText";
import { useSettingsValue } from "../../hooks/jotai/useSettings";

export default function DebugTextBox() {
    const settings = useSettingsValue();
    const debugText = useDebugTextValue();

    if (settings.isDevMode !== true)
        return null;
    return (
        <>
            <Button
                disabled
                small
                minimal
            >
                {debugText}
            </Button>
        </>
    );
}