
export enum ResourceType {
    Any = 'Any',
    Dial = 'Dial',
    Navigation = 'Navigation',
    Engineering = 'Engineering',
    Squadron = 'Squadron',
    ConcentrateFire = 'ConcentrateFire'
}

export interface Resources {
    quantity: number;
    types: ResourceType[];
}