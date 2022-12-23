import LIProperties from "../li/LIProperties";

export interface GlobalProp {
    prop: keyof LIProperties,
    types: string[]
}

const GLOBAL_PROPERTIES: GlobalProp[] = [
    {
        prop: "doorType",
        types: [
            "sab-doorv",
            "sab-doorh",
        ]
    }
];

export default GLOBAL_PROPERTIES;