import { AnchorButton, Classes } from "@blueprintjs/core";
import useTestMapGenerator from "../../hooks/utils/generateTestMap";
import { useSettingsValue } from "../../hooks/jotai/useSettings";

export default function MagicButton() {
    const settings = useSettingsValue();
    const generateTestMap = useTestMapGenerator();

    if (settings.isDevMode !== true)
        return null;
    return (
        <>
            <AnchorButton
                className={Classes.MINIMAL}
                icon={"bug"}
                onClick={generateTestMap}
            />
        </>
    );
}