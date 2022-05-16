import GUID from "../generic/GUID";
import LIProperties from "./LIProperties";

export default interface LIElement {
    id: GUID;
    name: string;
    type: string;
    x: number;
    y: number;
    z: number;
    xScale: number;
    yScale: number;
    rotation: number;
    properties: LIProperties;
}