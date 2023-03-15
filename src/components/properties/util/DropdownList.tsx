import { Collapse, Icon, IconName, Intent, Menu } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";

interface DropdownListProps<T> {
    elements: {
        id: T;
        name: string;
        icon?: IconName;
        intent?: Intent;
    }[];
    selectedID?: T;
    children?: React.ReactNode;

    onSelectID: (id?: T) => void;
}

export default function DropdownList<T>(props: DropdownListProps<T>) {
    return (
        <Menu style={{ backgroundColor: "revert", paddingTop: 0 }}>
            {props.elements?.map((element, index) => (
                <div key={element.id + "-" + index}>
                    <MenuItem2
                        icon={element.icon}
                        text={element.name}
                        labelElement={(
                            <Icon
                                icon="chevron-up"
                                style={{
                                    transform: props.selectedID == element.id ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "transform 0.2s ease-in-out"
                                }}
                            />
                        )}
                        onClick={() => props.onSelectID(element.id == props.selectedID ? undefined : element.id)}
                        active={props.selectedID == element.id}
                        intent={element.intent}
                    />

                    <Collapse isOpen={props.selectedID == element.id}>
                        {props.children}
                    </Collapse>
                </div>
            ))}
        </Menu>
    );
}