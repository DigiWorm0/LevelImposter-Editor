import GUID from "../../types/common/GUID";
import Vector2 from "../../types/transform/Vector2";
import {MapCommand} from "../history/executeCommand";

export const moveElement = (id: GUID, newPosition: Vector2): MapCommand => map => {
    const element = map.elements.find(e => e.id === id);
    if (!element)
        throw new Error(`Element with ID ${id} not found`);

    element.x = newPosition.x;
    element.y = newPosition.y;
};