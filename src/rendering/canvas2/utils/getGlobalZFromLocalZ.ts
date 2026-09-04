/**
 * Calculates the global Z index from the local Z and Y values
 * to account for change in Z index based on Y position.
 * @param localZ - The local Z index value.
 * @param localY - The local Y position value.
 * @return The global Z index value.
 */
export default function getGlobalZFromLocalZ(localZ: number, localY: number): number {
    return localZ + (localY / 1000);
}