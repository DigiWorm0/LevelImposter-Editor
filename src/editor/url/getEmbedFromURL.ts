export const getEmbedFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.has("embed");
};

export const isEmbedded = getEmbedFromURL();