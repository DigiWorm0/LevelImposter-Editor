import React from "react";
import { useSelectedElemIDValue } from "../../hooks/map/elements/useSelectedElem";
import { useSettingsValue } from "../../hooks/useSettings";

export default function SceneScroller() {
    const settings = useSettingsValue();
    const selectedID = useSelectedElemIDValue();

    React.useEffect(() => {
        if (!selectedID)
            return;
        const elem = document.getElementById(selectedID);
        if (elem && settings.scrollToSelection !== false) {
            elem.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [selectedID, settings]);

    return null;
}