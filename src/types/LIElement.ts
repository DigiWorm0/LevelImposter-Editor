import LIProperties from "./LIProperties";

export default interface LIElement {
    id: string;
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