import {
    Build,
    Camera,
    Chair,
    Computer,
    CrisisAlert,
    Flag,
    Folder,
    Handyman,
    Help,
    Interests,
    Language,
    Map,
    MonitorHeart,
    Person,
    PlayArrow,
    Room,
    Star,
    SwapHoriz,
    SwapVert,
    Warning
} from "@mui/icons-material";

export interface SceneGraphElementIconProps {
    type: string;
}

const ICON_DB: Record<string, JSX.Element> = {
    "util-blank": <Interests />,
    "util-minimap": <Map />,
    "util-cam": <Camera />,
    "util-dummy": <Person />,
    "util-vitals": <MonitorHeart />,
    "util-room": <Room />,
    "util-computer": <Computer />,
    "util-admin": <Language />,
    "util-platform": <SwapHoriz />,
    "util-ladder1": <SwapVert />,
    "util-ladder2": <SwapVert />,
    "util-starfield": <Star />,
    "util-button1": <CrisisAlert />,
    "util-button2": <CrisisAlert />,
    "util-spawn1": <Flag />,
    "util-spawn2": <Flag />,
    "util-cams1": <PlayArrow />,
    "util-cams2": <PlayArrow />,
    "util-cams3": <PlayArrow />,
    "util-layer": <Folder />
}

export default function SceneGraphElementIcon(props: SceneGraphElementIconProps) {

    // Icon DB
    const icon = ICON_DB[props.type];
    if (icon)
        return icon;

    // Other Types
    if (props.type.startsWith("task-"))
        return <Handyman />
    else if (props.type.startsWith("sab-"))
        return <Warning />
    else if (props.type.startsWith("util-"))
        return <Build />
    else if (props.type.startsWith("dec-") || props.type.startsWith("room-"))
        return <Chair />
    else
        return <Help />
}