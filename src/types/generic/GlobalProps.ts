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
        prop: "description",
        types: [
            "sab-btnreactor",
            "sab-reactorleft",
            "sab-reactorright",
        ]
    },
    {
        prop: "description",
        types: [
            "sab-btnlights",
            "sab-electric",
        ]
    },
    {
        prop: "description",
        types: [
            "sab-btnoxygen",
            "sab-oxygen1",
            "sab-oxygen2",
        ]
    },
    {
        prop: "description",
        types: [
            "sab-btncomms",
            "sab-comms",
        ]
    },
    {
        prop: "description",
        types: [
            "sab-btncomms",
            "sab-comms",
        ]
    },
    {
        prop: "sabDuration",
        types: [
            "sab-btnoxygen",
            "sab-oxygen1",
            "sab-oxygen2",
        ]
    },
    {
        prop: "sabDuration",
        types: [
            "sab-btnreactor",
            "sab-reactorleft",
            "sab-reactorright",
        ]
    }
];

export default GLOBAL_PROPERTIES;