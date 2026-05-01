import InfinityTable from "@/shared/custom-ui/InfinityTable";
import { reportHooks } from "@/entities/reports/hooks";
import { getReportColumns } from "./columns";
import { DesignPreview } from "./report-target-preview/DesignPreview";
import { useState } from "react";
import { UserPreview } from "./report-target-preview/UserPreview";
import { CommentPreview } from "./report-target-preview/CommentPreview";

export const ManageReportTable = () => {
    const [openDesignPreview, setOpenDesignPreview] = useState(false)
    const [designId, setDesignId] = useState<string>("")
    const [openUserPreview, setOpenUserPreview] = useState(false)
    const [userId, setUserId] = useState<string>("")
    const [openCommentPreview, setOpenCommentPreview] = useState(false)
    const [commentId, setCommentId] = useState<string>("")

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = reportHooks.useInfinityReportsQuery();
    const { mutate } = reportHooks.useResolveReportMutation()

    return (
        <div>
            <InfinityTable
                isLoading={isLoading}
                fetchNextPage={fetchNextPage}
                data={data?.pages.flatMap((page) => page.data) || []}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                columns={getReportColumns(
                    mutate,
                    setOpenDesignPreview,
                    setDesignId,
                    setOpenUserPreview,
                    setUserId,
                    setOpenCommentPreview,
                    setCommentId
                )} />
            <DesignPreview open={openDesignPreview} onOpenChange={setOpenDesignPreview} designId={designId} />
            <UserPreview open={openUserPreview} onOpenChange={setOpenUserPreview} userId={userId} />
            <CommentPreview open={openCommentPreview} onOpenChange={setOpenCommentPreview} commentId={commentId} />
        </div>
    )
}