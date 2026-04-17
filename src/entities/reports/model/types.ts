export type Reason = "Spam" | "Harassment" | "Copyright" | "Other" | "Inappropriate Content";
export type Status = "Pending" | "Resolved" | "Rejected";
export type TargetType = "Design" | "Comment" | "User";

export type Report = {
    _id: string;
    reporterId: string;
    targetId: string;
    targetType: TargetType;
    reason: Reason;
    description: string;
    status: Status;
    resolvedAt: string;
    createdAt: string;
}

export type CreateReport = {
    targetId: string;
    targetType: TargetType;
    reason: Reason;
    description: string;
}

export type ResolveReport = {
    status: Status;
}