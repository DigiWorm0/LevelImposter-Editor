import GUID from "../common/GUID";
import LISpriteAnimationFrame from "./LISpriteAnimationFrame";

export default interface LISpriteAnimation {
    id: GUID;
    type?: string;
    loop?: boolean;
    frames: LISpriteAnimationFrame[];
}