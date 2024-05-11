import { AnchorButton, Classes } from "@blueprintjs/core";
import { useSettingsValue } from "../../hooks/useSettings";

export default function MagicButton() {
    const settings = useSettingsValue();

    if (settings.isDevMode !== true)
        return null;
    return (
        <>
            <AnchorButton
                className={Classes.MINIMAL}
                icon={"bug"}
            />
        </>
    );
}