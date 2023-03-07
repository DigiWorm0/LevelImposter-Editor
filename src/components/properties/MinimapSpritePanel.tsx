import { ControlGroup, Switch } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import PanelContainer from "./util/PanelContainer";

export default function MinimapSpritePanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    if (!selectedElem || selectedElem.type !== "util-minimapsprite")
        return null;

    return (
        <PanelContainer title={t("minimap.minimapSprite") as string}>
            <ControlGroup fill style={{ textAlign: "center" }}>
                <Switch
                    key={selectedElem.id + "-imposterOnly"}
                    label={t("minimap.imposterOnly") as string}
                    checked={selectedElem?.properties.imposterOnly === undefined ? false : selectedElem.properties.imposterOnly}
                    onChange={(e) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, imposterOnly: e.currentTarget.checked } });
                    }}
                />
            </ControlGroup>
        </PanelContainer>
    );
}
