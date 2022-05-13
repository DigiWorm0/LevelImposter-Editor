import GraphicsContext from "../hooks/graphics/GraphicsContext";

export default interface Renderer {
    render: (ctx: GraphicsContext) => void;
}