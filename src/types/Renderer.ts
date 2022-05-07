import GraphicsContext from "../graphics/GraphicsContext";

export default interface Renderer {
    render: (ctx: GraphicsContext) => void;
}