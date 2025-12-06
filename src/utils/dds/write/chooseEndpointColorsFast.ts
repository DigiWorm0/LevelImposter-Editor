/**
 * Uses RGBA per-channel min/max to quickly choose endpoint colors.
 * @param colors - An array of colors, each represented as an array of RGBA values.
 * @param skipTransparentColors - If true, skips fully transparent colors when selecting endpoints.
 * @return An object containing the two endpoint colors: {color0, color1}.
 */
export default function chooseEndpointColorsFast(
    colors: number[][],
    skipTransparentColors: boolean
): { color0: number[], color1: number[] } {

    // Find non-transparent colors
    const validColors = skipTransparentColors ?
        colors.filter(color => color[3] !== 0) :
        colors;

    // Find min/max per channel
    const minColor = [255, 255, 255, 255];
    const maxColor = [0, 0, 0, 0];

    for (const color of validColors) {
        for (let i = 0; i < 4; i++) {
            if (color[i] < minColor[i]) minColor[i] = color[i];
            if (color[i] > maxColor[i]) maxColor[i] = color[i];
        }
    }

    return {
        color0: minColor,
        color1: maxColor
    };
}