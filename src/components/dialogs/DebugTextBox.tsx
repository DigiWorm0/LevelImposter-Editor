import { Button } from "@blueprintjs/core";
import { useDebugTextValue } from "../../hooks/useDebugText";
import { useSettingsValue } from "../../hooks/useSettings";

export default function DebugTextBox() {
    const { isDevMode } = useSettingsValue();
    const debugText = useDebugTextValue();

    if (!isDevMode)
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