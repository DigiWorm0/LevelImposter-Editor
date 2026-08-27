import {MaybeGUID} from "@/types/common/GUID";
import {useAtomValue} from "jotai";

import {elementAtomFamily} from "@editor/state/documentStore";

export const useElement = (id: MaybeGUID) => useAtomValue(elementAtomFamily(id));