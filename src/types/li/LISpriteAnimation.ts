import GUID from "../common/GUID";
import LISpriteAnimationFrame from "./LISpriteAnimationFrame";

export default interface LISpriteAnimation {
    id: GUID;
    frames: LISpriteAnimationFrame[];
}