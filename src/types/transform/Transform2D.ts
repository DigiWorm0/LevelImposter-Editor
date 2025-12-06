import Vector3 from "./Vector3";
import Vector2 from "./Vector2";
import {Matrix} from "pixi.js";

export default interface Transform2D {
    // Local properties
    localPosition: Vector3;
    localScale: Vector2;
    localRotation: number;

    // Global properties
    position: Vector3;
    scale: Vector2;
    rotation: number;

    // Matrix representation
    matrix: Matrix;
}