import { useMapValue } from "./useMap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/Firebase";

export default function useIsPublished() {
    const map = useMapValue();
    const [user] = useAuthState(auth);

    return map.authorID === user?.uid && map.id !== "";
}