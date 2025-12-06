/**
 * @description Operation to perform when selecting an item within a set.
 *
 * - `set`: Deselects all items and selects the specified item.
 * - `add`: Adds the specified item to the selection without deselecting others.
 * - `remove`: Removes the specified item from the selection.
 * - `toggle`: Toggles the selection state of the specified item (selects if not selected, deselects if already selected).
 */
type SelectOperation = "set" | "add" | "remove" | "toggle";
export default SelectOperation;