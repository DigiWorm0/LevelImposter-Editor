import React from "react";
import GUID, {MaybeGUID} from "@shared/types/GUID";
import mapElementEventEmitter from "@/rendering/canvas2/element/mapElementEventEmitter";

export default function useIsHoveringOverMapElement(elementID: MaybeGUID) {
    const [isHovering, setIsHovering] = React.useState(false);

    React.useEffect(() => {
        const handleMouseOver = (id: GUID) => {
            if (id === elementID)
                setIsHovering(true);
        };

        const handleMouseOut = (id: GUID) => {
            if (id === elementID)
                setIsHovering(false);
        };

        mapElementEventEmitter.on("mouseOver", handleMouseOver);
        mapElementEventEmitter.on("mouseOut", handleMouseOut);

        return () => {
            mapElementEventEmitter.off("mouseOver", handleMouseOver);
            mapElementEventEmitter.off("mouseOut", handleMouseOut);
        };

    }, [elementID]);

    return isHovering;
}