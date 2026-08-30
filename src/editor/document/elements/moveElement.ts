import GUID from "@shared/types/GUID";
import Vector2 from "@shared/types/Vector2";
import {EditorCommand} from "../../history/executeCommand";

export const moveElement = (id: GUID, newPosition: Vector2): EditorCommand => map => {
    const element = map.elements[id];
    element.x = newPosition.x;
    element.y = newPosition.y;
};