import InfinityTable from "@/shared/custom-ui/InfinityTable";
import { WorkHooks } from "@/entities/works/hooks";
import { getWorkColumns } from "./columns";
import { useState } from "react";
import { type Work } from "@/entities/works/model";
import { ModerLogDialog } from "../moder-log-dialog/ModerLogDialog";

export const ManageDesignTable = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = WorkHooks.useWorkInfiniteQuery({ q: "", tags: [] });

    const { mutate } = WorkHooks.useBanWorkMutation();
    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<Work | null>(null);

    return (
        <div>
            <InfinityTable
                fetchNextPage={fetchNextPage}
                data={data?.pages.flatMap((page) => page.data) || []}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                columns={getWorkColumns(setOpen, setSelectedData)} />
            <ModerLogDialog
                open={open}
                onOpenChange={setOpen}
                mutate={mutate}
                data={selectedData}
            />
        </div>
    )
}