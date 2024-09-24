export interface SVGProps {
    size?: number;
    color?: string;
}

export default function DiamondSVG(props: SVGProps) {
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
                d="M6.407.753L.75 6.409a2.25 2.25 0 000 3.182l5.657 5.657a2.25 2.25 0 003.182 0l5.657-5.657a2.25 2.25 0 000-3.182L9.589.753a2.25 2.25 0 00-3.182 0z"
            />
        </svg>
    );
}