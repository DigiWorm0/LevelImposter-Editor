import { Button } from "@blueprintjs/core";
import useMap, { useMapValue } from "../hooks/jotai/useMap";
import useEmbed from "../hooks/useEmbed";

export default function OpenInEditor() {
    const map = useMapValue();
    const isEmbed = useEmbed();

    if (!isEmbed)
        return null;

    const url = new URL(window.location.href);
    url.searchParams.delete("embed");
    url.searchParams.set("id", map.id);
    const urlString = url.toString();

    return (
        <div className="open-in-editor">
            <Button
                large
                text="Open in Editor"
                onClick={() => {
                    window.open(urlString, "_blank");
                }}
                icon="open-application"
            />
        </div>
    );
}