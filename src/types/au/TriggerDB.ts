const OutputTriggerDB: Record<string, string[]> = {
    "util-button1": [
        "onUse",
    ],
    "util-button2": [
        "onUse",
    ],
    "util-computer": [
        "onUse",
    ]
};

const InputTriggerDB: Record<string, string[]> = {
    "util-admin": [
        "Enable",
        "Disable"
    ],
    "util-cam": [
        "Enable",
        "Disable"
    ],
    "util-vitals": [
        "Enable",
        "Disable"
    ]
};

export { InputTriggerDB, OutputTriggerDB };
