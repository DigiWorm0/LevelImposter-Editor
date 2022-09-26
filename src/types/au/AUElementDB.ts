import AUElement from "./AUElement";

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

const AUElementDB: AUElement[] = [
    // Utilities
    {
        name: "Skeld / Polus Button",
        type: "util-button1"
    }, {
        name: "Mira Button",
        type: "util-button2"
    }, {
        name: "Tall Ladder",
        type: "util-ladder1"
    }, {
        name: "Short Ladder",
        type: "util-ladder2"
    }, {
        name: "Admin Table",
        type: "util-admin"
    }, {
        name: "Vitals",
        type: "util-vitals"
    }, {
        name: "Freeplay Laptop",
        type: "util-computer"
    }, {
        name: "Room",
        type: "util-room"
    }, {
        name: "Dummy",
        type: "util-dummy"
    }, {
        name: "Skeld / Mira Vent",
        type: "util-vent1"
    }, {
        name: "Polus Vent",
        type: "util-vent2"
    }, {
        name: "Camera",
        type: "util-cam"
    }, {
        name: "Polus Camera Panel",
        type: "util-cams"
    }, {
        name: "Skeld Camera Panel",
        type: "util-cams2"
    }, {
        name: "Airship Camera Panel",
        type: "util-cams3"
    }, {
        name: "Initial Spawnpoint",
        type: "util-spawn1"
    }, {
        name: "Meeting Spawnpoint",
        type: "util-spawn2"
    }, {
        name: "Minimap",
        type: "util-minimap"
    }, {
        name: "Moving Platform",
        type: "util-platform"
    }, {
        name: "Star Field",
        type: "util-starfield"
    }, {
        name: "Ambient Sound",
        type: "util-sound1"
    }, {
        name: "Footstep Sound",
        type: "util-sound2"
    }, {
        name: "Floating Sprite",
        type: "util-blankfloat"
    }, {
        name: "Teleporter",
        type: "util-tele"
    }, {
        name: "Trigger Sprite",
        type: "util-blanktrigger"
    }, {
        name: "Trigger Area",
        type: "util-triggerarea"
    }, {
        name: "Trigger Console",
        type: "util-triggerconsole"
    }, {
        name: "Trigger Repeater",
        type: "util-triggerrepeat"
    }, {
        name: "Trigger Timer",
        type: "util-triggertimer"
    },
    // Tasks
    {
        name: "Card Swipe",
        type: "task-id"
    }, {
        name: "Keys",
        type: "task-keys"
    }, {
        name: "Scan Pass",
        type: "task-pass"
    }, {
        name: "Simon Says",
        type: "task-simonsays"
    }, {
        name: "Gas Canister",
        type: "task-fuel1"
    }, {
        name: "Gas Output",
        type: "task-fuel2"
    }, {
        name: "Water Wheel",
        type: "task-waterwheel1"
    }, {
        name: "Inspect Samples",
        type: "task-samples"
    }, {
        name: "Water Jug 1",
        type: "task-waterjug1"
    }, {
        name: "Water Jug 2",
        type: "task-waterjug2"
    }, {
        name: "Weather Node",
        type: "task-node"
    }, {
        name: "Reboot Router",
        type: "task-router"
    }, {
        name: "Monitor Tree",
        type: "task-tree"
    }, {
        name: "Unlock Manifolds",
        type: "task-counting"
    }, {
        name: "Sort Artifacts",
        type: "task-artifacts"
    }, {
        name: "O2 Canisters",
        type: "task-oxygen"
    }, {
        name: "Garbage",
        type: "task-garbage"
    }, {
        name: "Chart Course",
        type: "task-chart"
    }, {
        name: "Medscan",
        type: "task-medscan"
    }, {
        name: "Weapons",
        type: "task-weapons"
    }, {
        name: "Telescope",
        type: "task-telescope"
    }, {
        name: "Drill",
        type: "task-drill"
    }, {
        name: "Temp 1",
        type: "task-temp1"
    }, {
        name: "Temp 2",
        type: "task-temp2"
    }, {
        name: "Node Switches",
        type: "task-nodeswitch"
    }, {
        name: "Enter ID Code",
        type: "task-code"
    }, {
        name: "Divert Power 1",
        type: "task-divert1"
    }, {
        name: "Divert Power 2",
        type: "task-divert2"
    }, {
        name: "Get Water Can",
        type: "task-plants1"
    }, {
        name: "Water Plants",
        type: "task-plants2"
    }, {
        name: "Assemble Artifact",
        type: "task-crystal"
    }, {
        name: "Sort Samples",
        type: "task-sort"
    }, {
        name: "Prime Shields",
        type: "task-shields"
    }, {
        name: "Measure Weather",
        type: "task-weather"
    }, {
        name: "Vending Machine",
        type: "task-vending"
    }, {
        name: "Process Data",
        type: "task-process"
    }, {
        name: "Run Diagnostics",
        type: "task-diagnostics"
    }, {
        name: "Align Engine",
        type: "task-align1"
    }, {
        name: "Stabilize Steering",
        type: "task-stabilize"
    }, {
        name: "Fix Showers",
        type: "task-showers"
    }, {
        name: "Make Burger",
        type: "task-burger"
    }, {
        name: "Decontaminate",
        type: "task-decontaminate"
    }, {
        name: "Rifles 1",
        type: "task-rifles1"
    }, {
        name: "Rifles 2",
        type: "task-rifles2"
    }, {
        name: "Pistols 1",
        type: "task-pistols1"
    }, {
        name: "Pistols 2",
        type: "task-pistols2"
    }, {
        name: "Records Folder",
        type: "task-records1"
    }, {
        name: "Records Shelf",
        type: "task-records2"
    }, {
        name: "Dress Mannequin",
        type: "task-mannequin"
    }, {
        name: "Clean Toilet",
        type: "task-toilet"
    }, {
        name: "Towel Basket",
        type: "task-towels1"
    }, {
        name: "Wet Towel",
        type: "task-towels2"
    }, {
        name: "Dry Towel",
        type: "task-towels3"
    }, {
        name: "Bunched Towel",
        type: "task-towels4"
    }, {
        name: "Hanging Towel",
        type: "task-towels5"
    }, {
        name: "Steering (Airship)",
        type: "task-stabilize2"
    }, {
        name: "Polish Ruby",
        type: "task-ruby"
    }, {
        name: "Rewind Tapes",
        type: "task-tapes"
    }, {
        name: "Develop Photos",
        type: "task-photos"
    }, {
        name: "Blue Trash (Airship)",
        type: "task-garbage2"
    }, {
        name: "Grey Trash (Airship)",
        type: "task-garbage3"
    }, {
        name: "Green Trash (Airship)",
        type: "task-garbage4"
    }, {
        name: "Trash Part 2 (Airship)",
        type: "task-garbage5"
    }, {
        name: "Unlock Safe",
        type: "task-safe"
    }, {
        name: "Reset Breakers",
        type: "task-breakers"
    }, {
        name: "Start Fans 1",
        type: "task-fans1"
    }, {
        name: "Start Fans 2",
        type: "task-fans2"
    }, {
        name: "Calibrate Distributer",
        type: "task-distributor"
    }, {
        name: "Wires",
        type: "task-wires"
    },
    // Decoration
    {
        name: "Rock 1",
        type: "dec-rock1"
    }, {
        name: "Rock 2",
        type: "dec-rock2"
    }, {
        name: "Rock 3",
        type: "dec-rock3"
    }, {
        name: "Rock 4",
        type: "dec-rock4"
    }, {
        name: "Rock 5",
        type: "dec-rock5"
    }, {
        name: "Snowman",
        type: "dec-snowman"
    }, {
        name: "Dead Snowman",
        type: "dec-snowmanded"
    }, {
        name: "Vending Machine 1",
        type: "dec-vending2"
    }, {
        name: "Vending Machine 1",
        type: "dec-vending3"
    }, {
        name: "Barrier",
        type: "dec-barrier"
    }, {
        name: "Bench 1",
        type: "dec-bench1"
    }, {
        name: "Bench 2",
        type: "dec-bench2"
    }, {
        name: "Table 1",
        type: "dec-table1"
    }, {
        name: "Table 2",
        type: "dec-table2"
    }, {
        name: "Table 3",
        type: "dec-table3"
    }, {
        name: "Table 4",
        type: "dec-table4"
    }, {
        name: "Table 5",
        type: "dec-table5"
    }, {
        name: "Table 6",
        type: "dec-table6"
    }, {
        name: "Table 7",
        type: "dec-table7"
    }, {
        name: "Table 8",
        type: "dec-table8"
    }, {
        name: "Table 9",
        type: "dec-table9"
    }, {
        name: "Table 10",
        type: "dec-table10"
    }, {
        name: "Table 11",
        type: "dec-table11"
    }, {
        name: "Table 12",
        type: "dec-table12"
    }, {
        name: "Table 13",
        type: "dec-table13"
    }, {
        name: "Table 14",
        type: "dec-table14"
    }, {
        name: "Skeld Engine",
        type: "dec-engine1"
    }, {
        name: "Box 1",
        type: "dec-box1"
    }, {
        name: "Box 2",
        type: "dec-box2"
    }, {
        name: "Box 3",
        type: "dec-box3"
    }, {
        name: "Box 4",
        type: "dec-box4"
    }, {
        name: "Box 5",
        type: "dec-box5"
    }, {
        name: "Box 6",
        type: "dec-box6"
    }, {
        name: "Box 7",
        type: "dec-box7"
    }, {
        name: "Box 8",
        type: "dec-box8"
    }, {
        name: "Box 9",
        type: "dec-box9"
    }, {
        name: "Diving Board",
        type: "dec-divingboard"
    }, {
        name: "Projector",
        type: "dec-projector"
    }, {
        name: "Bed 1",
        type: "dec-bed1"
    }, {
        name: "Bed 2",
        type: "dec-bed2"
    }, {
        name: "Bathroom Stalls",
        type: "dec-bathroom"
    }, {
        name: "Airship Cargo",
        type: "dec-cargo1"
    }, {
        name: "Chair 1",
        type: "dec-chair1"
    }, {
        name: "Chair 2",
        type: "dec-chair2"
    }, {
        name: "Chair 3",
        type: "dec-chair3"
    }, {
        name: "Panel 1",
        type: "dec-panel1"
    }, {
        name: "Panel 2",
        type: "dec-panel2"
    }, {
        name: "Pool Table 1",
        type: "dec-pool1"
    }, {
        name: "Pool Table 2",
        type: "dec-pool2"
    }, {
        name: "Scale",
        type: "dec-scale"
    }, {
        name: "Kitchen Shelf",
        type: "dec-shelf1"
    }, {
        name: "Bookshelf",
        type: "dec-shelf2"
    }, {
        name: "Gun Statue",
        type: "dec-statue1"
    }, {
        name: "Sword Statue",
        type: "dec-statue2"
    }, {
        name: "Stove 1",
        type: "dec-stove1"
    }, {
        name: "Stove 2",
        type: "dec-stove2"
    },
    //      Rooms
    {
        name: "Polus Admin",
        type: "room-polusadmin"
    }, {
        name: "Polus Comms",
        type: "room-poluscomms"
    }, {
        name: "Polus Electric",
        type: "room-poluselectric"
    }, {
        name: "Polus Medbay",
        type: "room-polusmedbay"
    }, {
        name: "Polus O2",
        type: "room-poluso2"
    }, {
        name: "Polus Specimen",
        type: "room-polusspecimen"
    }, {
        name: "Polus Spec Hall 1",
        type: "room-polusspecimenhallway1"
    }, {
        name: "Polus Spec Hall 2",
        type: "room-polusspecimenhallway2"
    }, {
        name: "Polus Storage",
        type: "room-polusstorage"
    }, {
        name: "Polus Weapons",
        type: "room-polusweapons"
    }, {
        name: "Skeld Cafe",
        type: "room-skeldcafe"
    }, {
        name: "Skeld Electric",
        type: "room-skeldelectric"
    }, {
        name: "Skeld Engine 1",
        type: "room-skeldengine1"
    }, {
        name: "Skeld Engine 2",
        type: "room-skeldengine2"
    }, {
        name: "Skeld Medbay",
        type: "room-skeldmedbay"
    }, {
        name: "Skeld Admin Hall",
        type: "room-skeldadminhallway"
    }, {
        name: "Skeld Nav Hall",
        type: "room-skeldnavhallway"
    }, {
        name: "Skeld O2",
        type: "room-skeldo2"
    }, {
        name: "Skeld Reactor Hall",
        type: "room-skeldreactorhallway"
    }, {
        name: "Skeld Security",
        type: "room-skeldsecurity"
    }, {
        name: "Skeld Storage",
        type: "room-skeldstorage"
    }, {
        name: "Skeld Shields Hall",
        type: "room-skeldshieldhall"
    }, {
        name: "Mira Medbay / Comms",
        type: "room-miramedbaycomms"
    }, {
        name: "Mira Y Hall",
        type: "room-mirayhall"
    }, {
        name: "Mira Reactor",
        type: "room-mirareactor"
    }, {
        name: "Mira Launchpad",
        type: "room-miralaunchpad"
    }, {
        name: "Mira O2 / Admin",
        type: "room-mirao2admin"
    }, {
        name: "Mira Cafe",
        type: "room-miracafe"
    }, {
        name: "Dropship",
        type: "room-dropship"
    }, {
        name: "Dropship Top",
        type: "room-dropshiptop"
    }, {
        name: "Dropship Rear",
        type: "room-dropshiprear"
    }, {
        name: "Dropship Ramp",
        type: "room-dropshipramp"
    }, {
        name: "Airship Armory",
        type: "room-airshiparmory"
    }, {
        name: "Airship Brig",
        type: "room-airshipbrig"
    }, {
        name: "Airship Cockpit",
        type: "room-airshipcockpit"
    }, {
        name: "Airship Comms",
        type: "room-airshipcomms"
    }, {
        name: "Airship Plank",
        type: "room-airshipejection"
    }, {
        name: "Airship Electrical",
        type: "room-airshipelctrical"
    }, {
        name: "Airship Engines",
        type: "room-airshipengines"
    }, {
        name: "Airship Gap",
        type: "room-airshipgap"
    }, {
        name: "Airship Hallway 1",
        type: "room-airshiphallway"
    }, {
        name: "Airship Kitchen",
        type: "room-airshipkitchen"
    }, {
        name: "Airship Lounge",
        type: "room-airshiplounge"
    }, {
        name: "Airship Hallway 2",
        type: "room-airshipmainhall"
    }, {
        name: "Airship Medbay",
        type: "room-airshipmedbay"
    }, {
        name: "Airship Meeting",
        type: "room-airshipmeeting"
    }, {
        name: "Airship Meeting 2",
        type: "room-airshipmeeting2"
    }, {
        name: "Airship Balcony",
        type: "room-airshipoutside"
    }, {
        name: "Airship Portraits",
        type: "room-airshipportraits"
    }, {
        name: "Airship Security",
        type: "room-airshipsecurity"
    }, {
        name: "Airship Showers",
        type: "room-airshipshowers"
    }, {
        name: "Airship Storage",
        type: "room-airshipstorage"
    }, {
        name: "Airship Vault",
        type: "room-airshipvault"
    }, {
        name: "Airship Shaft",
        type: "room-airshipvent"
    }, {
        name: "Airship Records",
        type: "room-airshiprecords"
    },
    //      Sabotagesz
    {
        name: "Lights Panel",
        type: "sab-electric"
    }, {
        name: "Left Reactor",
        type: "sab-reactorleft"
    }, {
        name: "Right Reactor",
        type: "sab-reactorright"
    }, {
        name: "O2 Panel 1",
        type: "sab-oxygen1"
    }, {
        name: "O2 Panel 2",
        type: "sab-oxygen2"
    }, {
        name: "Comms Panel",
        type: "sab-comms"
    }, {
        name: "Reator Button",
        type: "sab-btnreactor"
    }, {
        name: "O2 Button",
        type: "sab-btnoxygen"
    }, {
        name: "Lights Button",
        type: "sab-btnlights"
    }, {
        name: "Comms Button",
        type: "sab-btncomms"
    }
]

export default AUElementDB;