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
    "util-triggerstart": [
        "onStart",
    ],
    "util-triggerrand": [
        "onRandom 1",
        "onRandom 2"
    ],
    "sab-doorv": [
        "onOpen",
        "onClose",
        "onUse",
    ],
    "sab-doorh": [
        "onOpen",
        "onClose",
        "onUse",
    ],
};

const consoleTriggers = [
    "show",
    "hide",
    "enable",
    "disable",
];

const InputTriggerDB: Record<string, string[]> = {
    "util-blanktrigger": [
        "show",
        "hide"
    ],
    "util-triggerrepeat": [
        "repeat",
    ],
    "util-triggerrand": [
        "random",
    ],
    "util-triggertimer": [
        "startTimer",
    ],
    "util-triggeronce": [
        "trigger",
    ],
    "util-triggersound": [
        "enable",
        "disable",
    ],
    "sab-doorv": [
        "open",
        "close",
    ],
    "sab-doorh": [
        "open",
        "close",
    ],
    "util-minimapsprite": [
        "show",
        "hide",
    ],
    "util-triggerconsole": consoleTriggers,
    "util-vitals": consoleTriggers,
    "util-button1": consoleTriggers,
    "util-button2": consoleTriggers,
    "util-admin": consoleTriggers
};

export { InputTriggerDB, OutputTriggerDB };
