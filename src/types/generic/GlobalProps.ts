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
    },
    {
        prop: "parent",
        types: [
            "sab-btnreactor",
            "sab-reactorleft",
            "sab-reactorright",
        ]
    },
    {
        prop: "parent",
        types: [
            "sab-btnlights",
            "sab-electric",
        ]
    },
    {
        prop: "parent",
        types: [
            "sab-btnoxygen",
            "sab-oxygen1",
            "sab-oxygen2",
        ]
    },
    {
        prop: "parent",
        types: [
            "sab-btncomms",
            "sab-comms",
        ]
    }
];

export default GLOBAL_PROPERTIES;