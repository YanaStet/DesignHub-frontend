import { UserHooks } from "@/entities/users/hooks"
import InfinityTable from "@/shared/custom-ui/InfinityTable";
import { getUserColumns } from "./columns";

export const ManageUserTable = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = UserHooks.useInfinityUserQuery();

    const { mutate } = UserHooks.useBanUserMutation();

    return (
        <div>
            <InfinityTable
                fetchNextPage={fetchNextPage}
                data={data?.pages.flatMap((page) => page.data) || []}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                columns={getUserColumns(mutate)} />
        </div>
    )
}