export interface SVGProps {
    size?: number;
    color?: string;
}

export default function LinearSVG(props: SVGProps) {
    return (
        <svg
            width={props.size ?? 800}
            height={props.size ?? 800}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill={"none"}
        >
            <path
                d="M3 20L21 4"
                stroke={props.color ?? "currentColor"}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}