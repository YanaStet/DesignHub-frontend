import InfinityTable from "@/shared/custom-ui/InfinityTable";
import { getCommentColumns } from "./columns";
import { commentHooks } from "@/entities/comments/hooks";

export const ManageCommentTable = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = commentHooks.useInfinityCommentsQuery();

    const { mutate } = commentHooks.useBanCommentMutation();

    return (
        <div>
            <InfinityTable
                fetchNextPage={fetchNextPage}
                data={data?.pages.flatMap((page) => page.data) || []}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                columns={getCommentColumns(mutate)} />
        </div>
    )
}