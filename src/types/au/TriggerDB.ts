const OutputTriggerDB: Record<string, string[]> = {
    "util-triggerarea": [
        "onEnter",
        "onExit",
    ],
    "util-triggerconsole": [
        "onUse",
    ],
};

const InputTriggerDB: Record<string, string[]> = {
    "util-blanktrigger": [
        "Show",
        "Hide"
    ]
};

export { InputTriggerDB, OutputTriggerDB };
