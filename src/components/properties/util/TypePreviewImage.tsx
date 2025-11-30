import React from "react";
import {useTranslation} from "react-i18next";

export interface TypePreviewImageProps {
    type: string;
}

export default function TypePreviewImage(props: TypePreviewImageProps) {
    const {t} = useTranslation();

    return (
        <img
            alt={t(`au.${props.type}`) as string}
            style={{maxWidth: 100, maxHeight: 100}}
            src={`/sprites/${props.type}.png`}
        />
    );
}