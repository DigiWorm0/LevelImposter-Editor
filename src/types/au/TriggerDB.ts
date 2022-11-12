const OutputTriggerDB: Record<string, string[]> = {
    "util-triggerarea": [
        "onEnter",
        "onExit",
    ],
    "util-triggerconsole": [
        "onUse",
    ],
    "util-triggertimer": [
        "onStart",
        "onFinish",
    ],
    "util-triggerrepeat": [
        "onRepeat 1",
        "onRepeat 2",
        "onRepeat 3",
        "onRepeat 4",
        "onRepeat 5",
        "onRepeat 6",
        "onRepeat 7",
        "onRepeat 8",
    ],
    "util-triggeronce": [
        "onTrigger",
    ],
};

const InputTriggerDB: Record<string, string[]> = {
    "util-blanktrigger": [
        "Show",
        "Hide"
    ],
    "util-triggerrepeat": [
        "Repeat",
    ],
    "util-triggertimer": [
        "Start Timer",
    ],
    "util-triggeronce": [
        "Trigger",
    ],
    "util-triggersound": [
        "Play Sounds",
        "Stop Sounds",
    ],
};

export { InputTriggerDB, OutputTriggerDB };
