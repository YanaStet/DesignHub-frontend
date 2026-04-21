import InfinityTable from "@/shared/custom-ui/InfinityTable";
import { getCommentColumns } from "./columns";
import { commentHooks } from "@/entities/comments/hooks";
import { useState } from "react";
import { ModerLogDialog } from "../moder-log-dialog/ModerLogDialog";

export const ManageCommentTable = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = commentHooks.useInfinityCommentsQuery();

    const { mutate } = commentHooks.useBanCommentMutation();
    const [open, setOpen] = useState(false);

    return (
        <div>
            <InfinityTable
                fetchNextPage={fetchNextPage}
                data={data?.pages.flatMap((page) => page.data) || []}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                columns={getCommentColumns(mutate, setOpen)} />
            <ModerLogDialog open={open} onOpenChange={setOpen} />
        </div>
    )
}