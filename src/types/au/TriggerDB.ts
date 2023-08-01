const OutputTriggerDB: Record<string, string[]> = {
    "util-meeting": [
        "onButton",
        "onReport"
    ],
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
    "util-sabotages": [
        "onOxygenStart",
        "onLightsStart",
        "onCommsStart",
        "onReactorStart",
        "onOxygenEnd",
        "onLightsEnd",
        "onCommsEnd",
        "onReactorEnd",
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
    "util-blankfloat": [
        "show",
        "hide"
    ],
    "util-blankscroll": [
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
        "playonce",
        "playloop",
        "stop",
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
    "util-meeting": [
        "callMeeting",
    ],
    "util-sabotages": [
        "startOxygen",
        "startLights",
        "startComms",
        "startReactor",
        "endOxygen",
        "endLights",
        "endComms",
        "endReactor"
    ],
    "util-triggerconsole": consoleTriggers,
    "util-vitals": consoleTriggers,
    "util-button1": consoleTriggers,
    "util-button2": consoleTriggers,
    "util-admin": consoleTriggers
};

export { InputTriggerDB, OutputTriggerDB };
