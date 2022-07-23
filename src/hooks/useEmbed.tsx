import { useSetAtom } from "jotai";
import React from "react";
import { camZAtom } from "./jotai/Jotai";

export default function useEmbed() {
    const setZoom = useSetAtom(camZAtom);
    const [isEmbeded, setIsEmbeded] = React.useState(false);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("embed")) {
            setIsEmbeded(true);
            setZoom(0.2);
        }
    }, []);

    return isEmbeded;
}