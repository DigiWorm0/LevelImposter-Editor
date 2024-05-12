import { AnchorButton, Classes } from "@blueprintjs/core";
import { useSettingsValue } from "../../hooks/useSettings";

export default function MagicButton() {
    const { isDevMode } = useSettingsValue();

    if (!isDevMode)
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