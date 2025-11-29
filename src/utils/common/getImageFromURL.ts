export default function getImageFromURL(url: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve) => {
        const img = new window.Image();
        img.src = url;
        img.onload = () => resolve(img);

        // We don't care about errors here
        //img.onerror = console.error;
    });
}