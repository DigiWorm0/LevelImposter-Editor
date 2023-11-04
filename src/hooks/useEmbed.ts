import { useSetAtom } from "jotai";
import React from "react";
import { camZAtom } from "./jotai/useCamera";

export default function useEmbed() {
    const [isEmbeded, setIsEmbeded] = React.useState(false);
    const setZoom = useSetAtom(camZAtom);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("embed")) {
            setIsEmbeded(true);
            setZoom(0.2);
        }
    }, []);

    return isEmbeded;
}