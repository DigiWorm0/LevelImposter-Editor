import { Button } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { DEFAULT_GUID } from "../hooks/generateGUID";
import { useMapValue } from "../hooks/jotai/useMap";
import useEmbed from "../hooks/useEmbed";

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

    return (
        <div className="open-in-editor">
            <Button
                large
                text={t("embed.openInEditor")}
                onClick={() => {
                    window.open(urlString, "_blank");
                }}
                icon="open-application"
            />
        </div>
    );
}