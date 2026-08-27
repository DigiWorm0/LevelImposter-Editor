import primaryStore from "../../hooks/primaryStore";
import {appendOptimizeLogAtom} from "@/hooks/optimize/useAppendOptimizeLog";

const BuildOperationLog = {
    info: (message: string) => {
        primaryStore.set(appendOptimizeLogAtom, `<span style="color: gray;">${message}</span>`);
        console.log(message);
    },
    success: (message: string) => {
        primaryStore.set(appendOptimizeLogAtom, `<span style="color: green;">Success ✔</span> ${message}`);
        console.log(message);
    },
    error: (message: string) => {
        primaryStore.set(appendOptimizeLogAtom, `<span style="color: red;">Error ×</span> ${message}`);
        console.error(message);
    },
    warn: (message: string) => {
        primaryStore.set(appendOptimizeLogAtom, `<span style="color: yellow;">Warning ⚠</span> ${message}`);
        console.warn(message);
    }
};

export default BuildOperationLog;