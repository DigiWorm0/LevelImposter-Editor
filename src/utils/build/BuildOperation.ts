export default interface BuildOperation {
    run(): Promise<void>;
}