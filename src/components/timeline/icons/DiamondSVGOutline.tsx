export interface SVGProps {
    size?: number;
    color?: string;
}

export default function DiamondSVGOutline(props: SVGProps) {
    return (
        <svg
            width={props.size ?? 800}
            height={props.size ?? 800}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill={props.color ?? "currentColor"}
        >
            <path
                fill={props.color ?? "currentColor"}
                d="M7.468 1.813L1.81 7.47a.75.75 0 000 1.06l5.657 5.657a.75.75 0 001.06 0l5.657-5.656a.75.75 0 000-1.061L8.528 1.813a.75.75 0 00-1.06 0zM.75 6.41L6.407.753a2.25 2.25 0 013.182 0l5.657 5.656a2.25 2.25 0 010 3.182l-5.657 5.657a2.25 2.25 0 01-3.182 0L.75 9.591a2.25 2.25 0 010-3.182z"
                clipRule={"evenodd"}
            />
        </svg>
    );
}