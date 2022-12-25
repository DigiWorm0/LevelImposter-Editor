export const EXILE_IDS: string[] = [
    "Skeld",
    "MiraHQ",
    "Polus",
    "Airship"
];

export const PRESET_RESOURCE_IDS: Record<string, string[]> = {
    "Carpet": [
        "FootstepCarpet01.wav",
        "FootstepCarpet02.wav",
        "FootstepCarpet03.wav",
        "FootstepCarpet04.wav",
        "FootstepCarpet05.wav",
        "FootstepCarpet06.wav",
        "FootstepCarpet07.wav",
    ],
    "Dirt": [
        "FootstepDirt01.wav",
        "FootstepDirt02.wav",
        "FootstepDirt03.wav",
        "FootstepDirt04.wav",
        "FootstepDirt05.wav",
        "FootstepDirt06.wav",
        "FootstepDirt07.wav",
    ],
    "Glass": [
        "FootstepGlass01.wav",
        "FootstepGlass02.wav",
        "FootstepGlass03.wav",
        "FootstepGlass04.wav",
        "FootstepGlass05.wav",
        "FootstepGlass06.wav",
        "FootstepGlass07.wav",
    ],
    "Metal": [
        "FootstepMetal01.wav",
        "FootstepMetal02.wav",
        "FootstepMetal03.wav",
        "FootstepMetal04.wav",
        "FootstepMetal05.wav",
        "FootstepMetal06.wav",
        "FootstepMetal07.wav",
        "FootstepMetal08.wav",
    ],
    "Plastic": [
        "FootstepPlastic01.wav",
        "FootstepPlastic02.wav",
        "FootstepPlastic03.wav",
        "FootstepPlastic04.wav",
        "FootstepPlastic05.wav",
    ],
    "Snow": [
        "FootstepSnow01.wav",
        "FootstepSnow02.wav",
        "FootstepSnow03.wav",
        "FootstepSnow04.wav",
        "FootstepSnow05.wav",
        "FootstepSnow06.wav",
        "FootstepSnow07.wav",
    ],
    "Tile": [
        "FootstepTile01.wav",
        "FootstepTile02.wav",
        "FootstepTile03.wav",
        "FootstepTile04.wav",
        "FootstepTile05.wav",
        "FootstepTile06.wav",
        "FootstepTile07.wav",
    ],
    "Wood": [
        "FootstepWood01.wav",
        "FootstepWood02.wav",
        "FootstepWood03.wav",
        "FootstepWood04.wav",
        "FootstepWood05.wav",
        "FootstepWood06.wav",
        "FootstepWood07.wav",
    ]
};

export const RESOURCE_PRESET_IDS: string[] = Object.values(PRESET_RESOURCE_IDS).flat();

const AUElementDB: string[] = [
    "util-button1",
    "util-button2",
    "util-ladder1",
    "util-ladder2",
    "util-admin",
    "util-vitals",
    "util-computer",
    "util-room",
    "util-dummy",
    "util-vent1",
    "util-vent2",
    "util-cam",
    "util-cams",
    "util-cams2",
    "util-cams3",
    "util-spawn1",
    "util-spawn2",
    "util-minimap",
    "util-platform",
    "util-starfield",
    "util-sound1",
    "util-sound2",
    "util-blankfloat",
    "util-tele",
    "util-blanktrigger",
    "util-triggerarea",
    "util-triggerconsole",
    "util-triggersound",
    "util-triggerrepeat",
    "util-triggertimer",
    "util-triggerstart",
    "sab-doorv",
    "sab-doorh",
    "task-id",
    "task-keys",
    "task-pass",
    "task-simonsays",
    "task-fuel1",
    "task-fuel2",
    "task-waterwheel1",
    "task-samples",
    "task-waterjug1",
    "task-waterjug2",
    "task-node",
    "task-router",
    "task-tree",
    "task-counting",
    "task-artifacts",
    "task-oxygen",
    "task-garbage",
    "task-chart",
    "task-medscan",
    "task-weapons",
    "task-telescope",
    "task-drill",
    "task-temp1",
    "task-temp2",
    "task-nodeswitch",
    "task-code",
    "task-divert1",
    "task-divert2",
    "task-plants1",
    "task-plants2",
    "task-crystal",
    "task-sort",
    "task-shields",
    "task-weather",
    "task-vending",
    "task-process",
    "task-diagnostics",
    "task-align1",
    "task-stabilize",
    "task-showers",
    "task-burger",
    "task-decontaminate",
    "task-rifles1",
    "task-rifles2",
    "task-pistols1",
    "task-pistols2",
    "task-records1",
    "task-records2",
    "task-mannequin",
    "task-toilet",
    "task-towels1",
    "task-towels2",
    "task-towels3",
    "task-towels4",
    "task-towels5",
    "task-stabilize2",
    "task-ruby",
    "task-tapes",
    "task-photos",
    "task-garbage2",
    "task-garbage3",
    "task-garbage4",
    "task-garbage5",
    "task-safe",
    "task-breakers",
    "task-fans1",
    "task-fans2",
    "task-distributor",
    "task-wires",
    "dec-rock1",
    "dec-rock2",
    "dec-rock3",
    "dec-rock4",
    "dec-rock5",
    "dec-snowman",
    "dec-snowmanded",
    "dec-vending2",
    "dec-vending3",
    "dec-barrier",
    "dec-bench1",
    "dec-bench2",
    "dec-table1",
    "dec-table2",
    "dec-table3",
    "dec-table4",
    "dec-table5",
    "dec-table6",
    "dec-table7",
    "dec-table8",
    "dec-table9",
    "dec-table10",
    "dec-table11",
    "dec-table12",
    "dec-table13",
    "dec-table14",
    "dec-engine1",
    "dec-box1",
    "dec-box2",
    "dec-box3",
    "dec-box4",
    "dec-box5",
    "dec-box6",
    "dec-box7",
    "dec-box8",
    "dec-box9",
    "dec-divingboard",
    "dec-projector",
    "dec-bed1",
    "dec-bed2",
    "dec-bathroom",
    "dec-cargo1",
    "dec-chair1",
    "dec-chair2",
    "dec-chair3",
    "dec-panel1",
    "dec-panel2",
    "dec-pool1",
    "dec-pool2",
    "dec-scale",
    "dec-shelf1",
    "dec-shelf2",
    "dec-statue1",
    "dec-statue2",
    "dec-stove1",
    "dec-stove2",
    "room-polusadmin",
    "room-poluscomms",
    "room-poluselectric",
    "room-polusmedbay",
    "room-poluso2",
    "room-polusspecimen",
    "room-polusspecimenhallway1",
    "room-polusspecimenhallway2",
    "room-polusstorage",
    "room-polusweapons",
    "room-skeldcafe",
    "room-skeldelectric",
    "room-skeldengine1",
    "room-skeldengine2",
    "room-skeldmedbay",
    "room-skeldadminhallway",
    "room-skeldnavhallway",
    "room-skeldo2",
    "room-skeldreactorhallway",
    "room-skeldsecurity",
    "room-skeldstorage",
    "room-skeldshieldhall",
    "room-miramedbaycomms",
    "room-mirayhall",
    "room-mirareactor",
    "room-miralaunchpad",
    "room-mirao2admin",
    "room-miracafe",
    "room-dropship",
    "room-dropshiptop",
    "room-dropshiprear",
    "room-dropshipramp",
    "room-airshiparmory",
    "room-airshipbrig",
    "room-airshipcockpit",
    "room-airshipcomms",
    "room-airshipejection",
    "room-airshipelctrical",
    "room-airshipengines",
    "room-airshipgap",
    "room-airshiphallway",
    "room-airshipkitchen",
    "room-airshiplounge",
    "room-airshipmainhall",
    "room-airshipmedbay",
    "room-airshipmeeting",
    "room-airshipmeeting2",
    "room-airshipoutside",
    "room-airshipportraits",
    "room-airshipsecurity",
    "room-airshipshowers",
    "room-airshipstorage",
    "room-airshipvault",
    "room-airshipvent",
    "room-airshiprecords",
    "sab-electric",
    "sab-reactorleft",
    "sab-reactorright",
    "sab-oxygen1",
    "sab-oxygen2",
    "sab-comms",
    "sab-btnreactor",
    "sab-btnoxygen",
    "sab-btnlights",
    "sab-btncomms",
    "sab-btndoors"
];

export default AUElementDB;