import { AnchorButton, Classes, NavbarDivider } from "@blueprintjs/core";
import useTestMapGenerator from "../../hooks/generateTestMap";
import { useSettingsValue } from "../../hooks/jotai/useSettings";

export default function MagicButton() {
    const settings = useSettingsValue();
    const generateTestMap = useTestMapGenerator();

    if (settings.isDevMode !== true)
        return null;
    return (
        <>
            <NavbarDivider />
            <AnchorButton
                className={Classes.MINIMAL}
                icon={"bug"}
                onClick={generateTestMap}
            />
        </>
    );
}