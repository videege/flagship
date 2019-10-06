export enum IssueSeverity {
    Info = 1,
    Warning = 2,
    Error = 3
}

export interface Issue {
    text: string;
    severity: IssueSeverity;
}