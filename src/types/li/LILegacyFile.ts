import Point from '../generic/Point';

export default interface LILegacyFile {
    name: string;
    map: string;
    btn: string;
    exile: number;
    objs: LILegacyObject[];
}

export interface LILegacyObject {
    name: string;
    id: number;

    x: number;
    y: number;
    z: number;
    xScale: number;
    yScale: number;
    rotation: number;

    flipX: boolean;
    flipY: boolean;

    onlyFromBottom: boolean;

    colliders: LILegacyCollider[];

    targetIds: Array<number>;

    spriteType: string;
    type: string;
}

export interface LILegacyCollider {
    blocksLight: boolean;
    isClosed: boolean;
    points: Point[];
}