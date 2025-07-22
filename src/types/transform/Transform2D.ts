import Vector3 from "./Vector3";
import Vector2 from "./Vector2";
import GUID from "../common/GUID";

export default interface Transform2D {
    elementID: GUID;

    // Local properties
    localPosition: Vector3;
    localScale: Vector2;
    localRotation: number;

    // Global properties
    position: Vector3;
    scale: Vector2;
    rotation: number;

    // Hierarchy
    children: Transform2D[];
}