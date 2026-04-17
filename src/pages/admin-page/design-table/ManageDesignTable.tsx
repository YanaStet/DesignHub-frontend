import InfinityTable from "@/shared/custom-ui/InfinityTable";
import { WorkHooks } from "@/entities/works/hooks";
import { getWorkColumns } from "./columns";

export const ManageDesignTable = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = WorkHooks.useWorkInfiniteQuery({ q: "", tags: [] });

    const { mutate } = WorkHooks.useDeleteWorkMutation("");

    return (
        <div>
            <InfinityTable
                fetchNextPage={fetchNextPage}
                data={data?.pages.flatMap((page) => page.data) || []}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                columns={getWorkColumns(mutate)} />
        </div>
    )
}