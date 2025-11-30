import React from "react";
import {Sprite, Texture} from "pixi.js";
import {Application, useApplication} from "@pixi/react";

export interface SpriteWindowProps {
    sprite: Texture | null | undefined;
    maxSize: number;
}

export default function SpriteWindow(props: SpriteWindowProps) {
    if (!props.sprite)
        return null;
    return (
        <Application
            backgroundAlpha={0}
            width={props.maxSize}
            height={props.maxSize}
        >
            <SpriteWindowChild
                sprite={props.sprite}
                maxSize={props.maxSize}
            />
        </Application>
    );
}

function SpriteWindowChild(props: SpriteWindowProps) {
    const {app} = useApplication();
    const spriteRef = React.useRef<Sprite | null>(null);

    React.useEffect(() => {
        if (!spriteRef.current || !props.sprite)
            return;

        // Scale up the sprite to fit the window, keeping the aspect ratio
        let width = Math.min(props.maxSize, props.sprite.width);
        let height = Math.min(props.maxSize, props.sprite.height);
        const aspectRatio = props.sprite.width / props.sprite.height;

        // Width is the limiting factor
        if (props.sprite.width > props.sprite.height)
            height = width / aspectRatio;

        // Height is the limiting factor
        else
            width = height * aspectRatio;

        // Set the sprite's position/size
        spriteRef.current.width = width;
        spriteRef.current.height = height;
        spriteRef.current.x = width / 2;
        spriteRef.current.y = height / 2;

        // Set the app's size to match the sprite size
        app.renderer?.resize(width, height);
    }, [app, props.sprite]);

    if (!props.sprite || props.sprite.destroyed)
        return null;
    return (
        <pixiSprite
            ref={spriteRef}
            texture={props.sprite}
            anchor={0.5}
        />
    );
}