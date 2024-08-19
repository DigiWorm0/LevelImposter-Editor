import {atomFamily} from "jotai/utils";
import GUID from "../../types/generic/GUID";
import LIAnimPropertyType from "../../types/li/LIAnimPropertyType";
import {animTargetAtomFamily} from "./useAnimTarget";
import {atom, useAtom} from "jotai";
import LIAnimProperty from "../../types/li/LIAnimProperty";

export interface AnimTargetPropertiesOptions {
    targetID: GUID;
    property: LIAnimPropertyType;
}

export const animTargetPropertyAtomFamily = atomFamily((options: AnimTargetPropertiesOptions) => {
    return atom((get) => {
        const animTarget = get(animTargetAtomFamily(options.targetID));
        if (!animTarget)
            return null;

        return animTarget.properties[options.property] ?? {keyframes: []};
    }, (get, set, update: LIAnimProperty) => {
        const animTarget = get(animTargetAtomFamily(options.targetID));
        if (!animTarget)
            return;

        set(animTargetAtomFamily(options.targetID), {
            ...animTarget,
            properties: {
                ...animTarget.properties,
                [options.property]: update
            }
        });
    });
}, (a, b) => a.targetID === b.targetID && a.property === b.property);

export default function useAnimTargetProperty(options: AnimTargetPropertiesOptions) {
    return useAtom(animTargetPropertyAtomFamily(options));
}