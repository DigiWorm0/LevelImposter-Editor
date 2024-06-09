import { useSetAtom } from "jotai";
import { cameraElementIDAtom } from "./useCameraJumpControl";

export default function useJumpToElement() {
    return useSetAtom(cameraElementIDAtom);
}