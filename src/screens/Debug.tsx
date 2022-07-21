import { useAtomsDebugValue } from 'jotai/devtools';

export default function Debug() {
    useAtomsDebugValue();
    return null;
}