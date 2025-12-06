import {Graphics} from "pixi.js";

/**
 * Draws a checkerboard alpha grid pattern on a Graphics object.
 * Similar to the background used in image editing software to indicate transparency.
 * @param g - The Graphics object to draw on
 * @param width - The width of the grid
 * @param height - The height of the grid
 * @param cellSize - The size of each cell in the grid
 */
export default function drawAlphaGrid(
    g: Graphics,
    width: number,
    height: number,
    cellSize: number
) {
    g.clear();

    for (let x = 0; x < width; x += cellSize) {
        for (let y = 0; y < height; y += cellSize) {
            const isEvenCell = ((x / cellSize) + (y / cellSize)) % 2 === 0;
            const cellWidth = Math.min(cellSize, width - x);
            const cellHeight = Math.min(cellSize, height - y);
            g.rect(x, y, cellWidth, cellHeight)
                .fill(isEvenCell ? 0x444444 : 0x555555)
                .closePath();
        }
    }
}