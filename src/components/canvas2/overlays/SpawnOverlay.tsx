import GUID from "../../../types/common/GUID";
import {useElementValue} from "../../../hooks/elements/useElements";
import {DEFAULT_SPAWN_RANGE, SPAWN_PLAYER_COUNT, UNITY_SCALE} from "../../../types/amongus/Constants";
import useTextureOfType from "../../../hooks/texture/useTextureOfType";

export interface SpawnOverlayProps {
    elementID: GUID;
}

export default function SpawnOverlay(props: SpawnOverlayProps) {
    const element = useElementValue(props.elementID);
    const sprite = useTextureOfType("util-dummy");

    const isSpawningDummies = element?.properties.spawnDummies ?? false;
    const radius = element?.properties.range ?? DEFAULT_SPAWN_RANGE;
    const dummyArray = new Array(SPAWN_PLAYER_COUNT).fill(0);

    if (!sprite || sprite.destroyed)
        return null;
    if (!element || !element.type.startsWith("util-spawn"))
        return null;
    return (
        <pixiContainer
            sortableChildren={true}
            eventMode={"none"}
        >
            {dummyArray.map((_, i) => {
                const x = Math.cos(2 * Math.PI * (i / SPAWN_PLAYER_COUNT) + (Math.PI / 2)) * radius;
                const y = Math.sin(2 * Math.PI * (i / SPAWN_PLAYER_COUNT) + (Math.PI / 2)) * radius;

                return (
                    <pixiSprite
                        key={i}
                        alpha={isSpawningDummies ? 1.0 : 0.3}
                        anchor={0.5}
                        x={x * UNITY_SCALE}
                        y={y * UNITY_SCALE}
                        zIndex={y}
                        texture={sprite}
                    />
                );
            })}
        </pixiContainer>
    );
}