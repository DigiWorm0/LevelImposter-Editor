import primaryStore from "@/shared/store";
import {buildLogAtom} from "@editor/build/buildStore";

const BuildOperationLog = {
    _log: (message: string) => {
        primaryStore.set(buildLogAtom, [
            ...primaryStore.get(buildLogAtom),
            message
        ]);
    },
    info: (message: string) => {
        BuildOperationLog._log(`<span style="color: gray;">${message}</span>`);
        console.log(message);
    },
    success: (message: string) => {
        BuildOperationLog._log(`<span style="color: green;">Success ✔</span> ${message}`);
        console.log(message);
    },
    error: (message: string) => {
        BuildOperationLog._log(`<span style="color: red;">Error ×</span> ${message}`);
        console.error(message);
    },
    warn: (message: string) => {
        BuildOperationLog._log(`<span style="color: yellow;">Warning ⚠</span> ${message}`);
        console.warn(message);
    }
};

export default BuildOperationLog;