export type Status = "Pending" | "Resolved" | "Dismissed";
export type TargetType = "Design" | "Comment" | "User";

export const Reason = {
    SPAM: "Spam",
    HARASSMENT: "Harassment",
    COPYRIGHT_VIOLATION: "Copyright Violation",
    OTHER: "Other",
    INAPPROPRIATE_CONTENT: "Inappropriate Content",
} as const;

export type ReasonValue = (typeof Reason)[keyof typeof Reason];

export type Report = {
    _id: string;
    reporterId: string;
    targetId: string;
    targetType: TargetType;
    reason: ReasonValue;
    description: string;
    status: Status;
    resolvedAt: string;
    createdAt: string;
}

export type CreateReport = {
    targetId: string;
    targetType: TargetType;
    reason: ReasonValue;
    description: string;
}

export type ResolveReport = {
    status: 'Resolved' | 'Dismissed';
}