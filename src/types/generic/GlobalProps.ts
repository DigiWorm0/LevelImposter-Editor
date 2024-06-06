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
        prop: "description",
        types: [
            "task-temp1",
            "task-temp2",
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
    },
    {
        prop: "sounds",
        types: [
            "util-vent1",
            //"util-vent2", // Polus Vents don't have SpriteAnim so they don't play sounds
        ]
    },
    {
        prop: "towelPickupCount",
        "types": [
            "task-towels1",
            "task-towels2",
            "task-towels3",
            "task-towels4",
            "task-towels5",
        ]
    },
    {
        prop: "customText",
        types: [
            "util-button1",
            "util-button2",
        ]
    }
];

export default GLOBAL_PROPERTIES;