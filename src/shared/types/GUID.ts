import {v4} from "uuid";

/**
 * Wrapper around strings to represent
 * a universally unique identifier (UUID/GUID).
 */
type GUID = string & { __GUID: true };
export default GUID;
export type MaybeGUID = GUID | undefined;

/**
 *  Generates a version 4 (randomly-generated) UUID/GUID.
 *
 *  While the probability this UUID is already in use isn't zero,
 *  it is close enough to zero to be negligible since there are
 *  2^122 total possible combinations.
 */
export const generateGUID = () => v4() as GUID;

/**
 * Represents a default/empty GUID/UUID value.
 */
export const EmptyGUID = "00000000-0000-0000-0000-000000000000" as GUID;