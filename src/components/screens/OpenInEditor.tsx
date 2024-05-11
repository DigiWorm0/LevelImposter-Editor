import { AnchorButton } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import { DEFAULT_GUID } from "../../utils/generateGUID";
import { useMapValue } from "../../hooks/map/useMap";
import useEmbed from "../../hooks/embed/useEmbed";

export default function OpenInEditor() {
    const map = useMapValue();
    const isEmbed = useEmbed();
    const { t } = useTranslation();

    if (!isEmbed || map.id === DEFAULT_GUID)
        return null;

    const url = new URL(window.location.href);
    url.searchParams.delete("embed");
    url.searchParams.set("id", map.id);
    const urlString = url.toString();

    const canRemix = map.properties.canRemix !== false;

    return (
        <div className="open-in-editor">

            <Tooltip2
                content={!canRemix ? (t("map.errorRemix") as string) : undefined}
                position="bottom">

                <AnchorButton
                    large
                    text={t("embed.openInEditor")}
                    onClick={() => {
                        window.open(urlString, "_blank");
                    }}
                    icon="open-application"
                    disabled={!canRemix}
                />

            </Tooltip2>
        </div>
    );
}