import { Icon } from '@mui/material';
import * as Icons from '@mui/icons-material';
import { SvgIconComponent } from '@mui/icons-material';

export type IconName = keyof typeof Icons;

export interface MaterialIconProps {
    icon: IconName;
    size?: number;
}

export default function MaterialIcon(props: MaterialIconProps) {
    const IconComponent = Icons[props.icon] as SvgIconComponent | undefined;

    if (!IconComponent) {
        console.warn(`Icon "${props.icon}" not found.`);
        return null;
    }

    return <Icon style={{ fontSize: props.size }} component={IconComponent} />;
}