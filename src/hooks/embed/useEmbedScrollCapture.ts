import React from "react";
import useEmbed from "./useEmbed";

/**
 * When in embed mode (inside an iframe), captures wheel events
 * and prevents the default scroll behavior so that the scroll
 * zooms the editor canvas instead of scrolling the parent page.
 */
export default function useEmbedScrollCapture() {
    const isEmbedded = useEmbed();

    React.useEffect(() => {
        if (!isEmbedded)
            return;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
        };

        window.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", onWheel);
        };
    }, [isEmbedded]);
}
