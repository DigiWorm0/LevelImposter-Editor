type LITranslation = {
    LanguageName: string;

    // UI
    OpenFile?: string;
    SaveFile?: string;
    NewFile?: string;
    ImportLegacy?: string;
    AddObject?: string;
    DeleteObject?: string;
    Undo?: string;
    Redo?: string;
    Publish?: string;
    Settings?: string;

    // Generic
    Delete?: string;
    Reset?: string;
    Add?: string;
    Remove?: string;
    Height?: string;
    Length?: string;
    Default?: string;
    Create?: string;
    Upload?: string;
    Download?: string;
    Size?: string;

    // Transform
    Name?: string;
    Type?: string;
    X?: string;
    Y?: string;
    Z?: string;
    XScale?: string;
    YScale?: string;
    Rotation?: string;

    // Position
    Offset?: string;
    Zoom?: string;

    // Collider
    Solid?: string;
    Visible?: string;
    BlocksLight?: string;
    Points?: string;
    AddCollider?: string;
    Collider?: string;
    Colliders?: string;

    // Console
    Range?: string;
    OnlyFromBelow?: string;

    // Debug
    PrintToConsole?: string;

    // Moving Platform
    Platform?: string;
    Movement?: string;
    EntranceOffset?: string;
    ExitOffset?: string;

    // Room
    Room?: string;
    ShowName?: string;
    ShowAdminTable?: string;
    
    // Task
    Task?: string;
    DefaultDescription?: string;
    DefaultLength?: string;
    DefaultRoom?: string;

    // Sprite
    Sprite?: string;
    NoShadows?: string;
    NoShadowBehavior?: string;

    // Star Field
    Starfield?: string;
    Count?: string;
    MaxSpeed?: string;
    MinSpeed?: string;

    // Sounds
    AmbientSound?: string;
    StepSound?: string;
    StepSounds?: string;
    StepPresets?: string;
    StepVariants?: string;
    Priority?: string;
    NothingUploaded?: string;
    
    // Panel Names
    Camera?: string;
    Console?: string;
    Debug?: string;
    Ladder?: string;
    Minimap?: string;
    Sabotage?: string;
    Transform?: string;
    Vent?: string;
}

export default LITranslation;