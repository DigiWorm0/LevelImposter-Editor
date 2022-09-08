import { ButtonGroup } from "@blueprintjs/core";
import AddObjectButton from './AddObjectButton';
import DeleteObjectButton from './DeleteObjectButton';

export default function MapButtons() {
    return (
        <ButtonGroup fill style={{ padding: 5 }} minimal>

            <AddObjectButton
                isSidePanel={true} />

            <DeleteObjectButton
                isSidePanel={true} />

        </ButtonGroup>
    );
}