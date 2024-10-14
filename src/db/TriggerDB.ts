const OutputTriggerDB: Record<string, string[]> = {
    "util-eject": [
        "onEject",
        "onSkip",
        "onFinish"
    ],
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
    "util-triggeranim": [
        "onStart",
        "onFinish",
    ],
    "util-spore": [
        "onActivate",
    ],
    "util-sabotages": [
        "onOxygenStart",
        "onLightsStart",
        "onCommsStart",
        "onReactorStart",
        "onMixupStart",
        "onOxygenEnd",
        "onLightsEnd",
        "onCommsEnd",
        "onReactorEnd",
        "onMixupEnd",
    ],
    "util-valuebool": [
        "onChange"
    ],
    "util-triggergate": [
        "onTrue",
        "onFalse"
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
    "util-physics": [
        "onCollision"
    ]
};

const consoleTriggers = [
    "show",
    "hide",
    "enable",
    "disable",
    "toggle",
];

const showHideTriggers = [
    "show",
    "hide"
];

const InputTriggerDB: Record<string, string[]> = {
    "util-blanktrigger": showHideTriggers,
    "util-blankfloat": showHideTriggers,
    "util-blankscroll": showHideTriggers,
    "util-starfield": showHideTriggers,
    "util-ejectdummy": showHideTriggers,
    "util-ejectdummy2": showHideTriggers,
    "util-ejecthand": showHideTriggers,
    "util-ejectthumb": showHideTriggers,
    "util-minimapsprite": showHideTriggers,
    "util-tele": [
        "enable",
        "disable",
        "toggle",
        "teleportonce"
    ],
    "util-triggerrepeat": [
        "repeat",
    ],
    "util-triggerrand": [
        "random",
    ],
    "util-triggertimer": [
        "startTimer",
        "stopTimer",
    ],
    "util-triggeronce": [
        "trigger",
    ],
    "util-triggersound": [
        "playonce",
        "playloop",
        "stop",
    ],
    "util-triggeranim": [
        "playAnim",
        "pauseAnim",
        "stopAnim"
    ],
    "sab-doorv": [
        "open",
        "close",
    ],
    "sab-doorh": [
        "open",
        "close",
    ],
    "util-meeting": [
        "callMeeting",
    ],
    "util-sabotages": [
        "startOxygen",
        "startLights",
        "startComms",
        "startReactor",
        "startMixup",
        "endOxygen",
        "endLights",
        "endComms",
        "endReactor",
        "endMixup"
    ],
    "util-triggerdeath": [
        "killArea"
    ],
    "util-triggershake": [
        "enable",
        "disable"
    ],
    "util-valuebool": [
        "setValueTrue",
        "setValueFalse",
        "toggleValue"
    ],
    "util-triggergate": [
        "triggerGate"
    ],
    "util-physics": consoleTriggers,
    "util-triggerconsole": consoleTriggers,
    "util-vitals": consoleTriggers,
    "util-button1": consoleTriggers,
    "util-button2": consoleTriggers,
    "util-admin": consoleTriggers
};

export {InputTriggerDB, OutputTriggerDB};
