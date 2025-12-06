/**
 * Uses PCA Endpoint Selection to choose two endpoint colors from a set of colors.
 * @param colors - An array of colors, each represented as an array of RGBA values.
 * @param skipTransparentColors - If true, skips fully transparent colors when selecting endpoints.
 * @return An object containing the two endpoint colors: {color0, color1}.
 */
export default function chooseEndpointColors(
    colors: number[][],
    skipTransparentColors: boolean
): { color0: number[], color1: number[] } {
    
    // Find non-transparent colors
    const validColors = skipTransparentColors ?
        colors.filter(color => color[3] !== 0) :
        colors;

    // If no valid colors, return black
    if (validColors.length === 0) {
        return {
            color0: [0, 0, 0, 0],
            color1: [0, 0, 0, 0]
        };
    }

    // Build covariance matrix
    const covarianceMatrix = buildCovarianceMatrix(validColors);

    // Perform power iteration to find dominant eigenvector
    const dominantEigenvector = powerIteration(covarianceMatrix);

    // Project colors onto the dominant eigenvector to find min and max points
    const axisColors = projectColorsOntoAxis(validColors, dominantEigenvector);

    return {
        color0: axisColors.minPoint,
        color1: axisColors.maxPoint
    };
}

/**
 * Calculates the mean color from an array of colors.
 * Chooses the average of each RGBA channel.
 * @param colors - An array of colors, each represented as an array of RGBA values.
 * @return The mean color as an array of RGBA values.
 */
function getMeanColor(colors: number[][]): number[] {
    const meanColor = [0, 0, 0, 0];

    for (const color of colors) {
        meanColor[0] += color[0];
        meanColor[1] += color[1];
        meanColor[2] += color[2];
        meanColor[3] += color[3];
    }

    meanColor[0] /= colors.length;
    meanColor[1] /= colors.length;
    meanColor[2] /= colors.length;
    meanColor[3] /= colors.length;

    return meanColor;
}

/**
 * Builds the covariance matrix from an array of colors.
 * @param colors - An array of colors, each represented as an array of RGBA values.
 * @return The covariance matrix as a 3x3 array.
 */
function buildCovarianceMatrix(colors: number[][]) {
    // Compute mean color
    const meanColor = getMeanColor(colors);

    // Compute covariance matrix
    const covarianceMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    for (const color of colors) {
        const rDiff = color[0] - meanColor[0];
        const gDiff = color[1] - meanColor[1];
        const bDiff = color[2] - meanColor[2];

        covarianceMatrix[0][0] += rDiff * rDiff;
        covarianceMatrix[0][1] += rDiff * gDiff;
        covarianceMatrix[0][2] += rDiff * bDiff;

        covarianceMatrix[1][0] += gDiff * rDiff;
        covarianceMatrix[1][1] += gDiff * gDiff;
        covarianceMatrix[1][2] += gDiff * bDiff;

        covarianceMatrix[2][0] += bDiff * rDiff;
        covarianceMatrix[2][1] += bDiff * gDiff;
        covarianceMatrix[2][2] += bDiff * bDiff;
    }

    return covarianceMatrix;
}

/**
 * Performs power iteration to find the dominant eigenvector of a matrix.
 * @param matrix - A 3x3 matrix represented as a 2D array.
 * @param numIterations - The number of iterations to perform.
 * @return The dominant eigenvector as an array.
 */
function powerIteration(
    matrix: number[][],
    numIterations: number = 5
): number[] {

    // Start with a random vector
    let vector = [1, 1, 1];

    for (let i = 0; i < numIterations; i++) {

        // Multiply: vector = matrix * vector
        const next_b_k = [
            matrix[0][0] * vector[0] +
            matrix[0][1] * vector[1] +
            matrix[0][2] * vector[2],

            matrix[1][0] * vector[0] +
            matrix[1][1] * vector[1] +
            matrix[1][2] * vector[2],

            matrix[2][0] * vector[0] +
            matrix[2][1] * vector[1] +
            matrix[2][2] * vector[2],
        ];

        // Normalize the vector
        vector = normalizeVector(next_b_k);
    }

    return vector;
}

/**
 * Normalizes a vector.
 * @param vector - The vector to normalize.
 * @return The normalized vector.
 */
function normalizeVector(vector: number[]): number[] {
    const norm = Math.hypot(...vector) || 1;
    return vector.map(v => v / norm);
}

/**
 * Projects colors onto a given axis and finds the min and max projected points.
 * @param colors - An array of colors, each represented as an array of RGBA values.
 * @param vector - The axis vector to project onto.
 * @return An object containing the min and max projected points: {minPoint, maxPoint}.
 */
function projectColorsOntoAxis(
    colors: number[][],
    vector: number[]
): { minPoint: number[], maxPoint: number[] } {

    let minProj = Infinity;
    let maxProj = -Infinity;
    let minPoint: number[] = [];
    let maxPoint: number[] = [];

    for (const color of colors) {
        const proj =
            color[0] * vector[0] +
            color[1] * vector[1] +
            color[2] * vector[2];

        if (proj < minProj) {
            minProj = proj;
            minPoint = color;
        }
        if (proj > maxProj) {
            maxProj = proj;
            maxPoint = color;
        }
    }

    return {minPoint, maxPoint};
}