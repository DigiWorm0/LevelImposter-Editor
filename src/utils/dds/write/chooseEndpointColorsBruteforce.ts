import {getDistanceBetweenColors} from "./writeDXT1Texture";

/**
 * Uses brute force to choose the best two endpoint colors from a set of colors.
 * @param colors - An array of colors, each represented as an array of RGBA values.
 * @param skipTransparentColors - If true, skips fully transparent colors when selecting endpoints.
 * @return An object containing the two endpoint colors: {color0, color1}.
 */
export default function chooseEndpointColorsBruteforce(
    colors: number[][],
    skipTransparentColors: boolean
): { color0: number[], color1: number[] } {

    // Find non-transparent colors
    const validColors = skipTransparentColors ?
        colors.filter(color => color[3] !== 0) :
        colors;

    let bestColor0: number[] = [0, 0, 0];
    let bestColor1: number[] = [0, 0, 0];
    let lowestError = Number.MAX_VALUE;

    // Brute-force search through all pairs of colors
    for (let i = 0; i < validColors.length; i++) {
        for (let j = 0; j < validColors.length; j++) {
            const color0 = validColors[i];
            const color1 = validColors[j];

            // Get the four interpolated colors
            const palette = getInterpolatedColors(color0, color1);

            // Calculate total error for this pair
            let totalError = 0;
            for (const pixelColor of validColors) {
                const closestColor = getClosestColorInPalette(pixelColor, palette);
                totalError += getDistanceBetweenColors(pixelColor, closestColor);
            }

            // Update best pair if this is the lowest error so far
            if (totalError < lowestError) {
                lowestError = totalError;
                bestColor0 = color0;
                bestColor1 = color1;
            }
        }
    }

    return {
        color0: bestColor0,
        color1: bestColor1
    };
}

/**
 * Finds the closest color in the palette to the given pixel color.
 * @param pixelColor - The RGBA color of the pixel.
 * @param palette - An array of colors representing the palette.
 * @return The closest color from the palette.
 */
function getClosestColorInPalette(pixelColor: number[], palette: number[][]): number[] {
    let minDist = Number.MAX_VALUE;
    let closestIndex = 0;
    for (let i = 0; i < palette.length; i++) {
        const palColor = palette[i];
        const dist = getDistanceBetweenColors(pixelColor, palColor);
        if (dist < minDist) {
            minDist = dist;
            closestIndex = i;
        }
    }
    return palette[closestIndex];
}

/**
 * Generates the four interpolated colors between two endpoint colors.
 * @param color0 - The first endpoint color.
 * @param color1 - The second endpoint color.
 * @return An array of four colors: [color0, color1, color2, color3].
 */
function getInterpolatedColors(color0: number[], color1: number[]): number[][] {
    const colors: number[][] = [];
    colors[0] = color0;
    colors[1] = color1;
    colors[2] = [
        Math.round((2 * color0[0] + 1 * color1[0]) / 3),
        Math.round((2 * color0[1] + 1 * color1[1]) / 3),
        Math.round((2 * color0[2] + 1 * color1[2]) / 3)
    ];
    colors[3] = [
        Math.round((1 * color0[0] + 2 * color1[0]) / 3),
        Math.round((1 * color0[1] + 2 * color1[1]) / 3),
        Math.round((1 * color0[2] + 2 * color1[2]) / 3)
    ];
    return colors;
}