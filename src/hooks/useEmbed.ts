import React from "react";

export default function useEmbed() {
    const [isEmbeded, setIsEmbeded] = React.useState(false);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("embed")) {
            setIsEmbeded(true);
        }
    }, []);

    return isEmbeded;
}