import InfinityTable from "@/shared/custom-ui/InfinityTable";
import { reportHooks } from "@/entities/reports/hooks";
import { getReportColumns } from "./columns";

export const ManageReportTable = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = reportHooks.useInfinityReportsQuery();
    const { mutate } = reportHooks.useResolveReportMutation()

    return (
        <div>
            <InfinityTable
                fetchNextPage={fetchNextPage}
                data={data?.pages.flatMap((page) => page.data) || []}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                columns={getReportColumns(mutate)} />
        </div>
    )
}