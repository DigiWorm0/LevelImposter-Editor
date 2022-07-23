import { Button } from "@blueprintjs/core";
import useEmbed from "../hooks/useEmbed";

export default function OpenInEditor() {
    const isEmbed = useEmbed();

    const url = new URL(window.location.href);
    url.searchParams.delete("embed");
    const urlString = url.toString();

    if (!isEmbed)
        return null;

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