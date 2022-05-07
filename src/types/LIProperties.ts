import LICollider from "./LICollider";

export default interface LIProperties {
    leftVent?: string;
    middleVent?: string;
    rightVent?: string;

    onlyFromBelow?: boolean;
    range?: number;

    spriteData?: string;
    colliders?: LICollider[];
}