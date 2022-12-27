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
    "sab-doorv": [
        "onOpen",
        "onClose",
    ],
    "sab-doorh": [
        "onOpen",
        "onClose",
    ],
};

const InputTriggerDB: Record<string, string[]> = {
    "util-blanktrigger": [
        "show",
        "hide"
    ],
    "util-triggerrepeat": [
        "repeat",
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
    "util-triggerconsole": [
        "show",
        "hide",
    ],
    "sab-doorv": [
        "open",
        "close",
    ],
    "sab-doorh": [
        "open",
        "close",
    ],
};

export { InputTriggerDB, OutputTriggerDB };
