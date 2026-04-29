import { UserHooks } from "@/entities/users/hooks"
import InfinityTable from "@/shared/custom-ui/InfinityTable";
import { getUserColumns } from "./columns";
import { useState } from "react";
import { type User } from "@/entities/users/model";
import { ModerLogDialog } from "../moder-log-dialog/ModerLogDialog";

export const ManageUserTable = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = UserHooks.useInfinityUserQuery();

    const { mutate, isPending } = UserHooks.useBanUserMutation();
    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<User | null>(null);

    return (
        <div>
            <InfinityTable
                fetchNextPage={fetchNextPage}
                data={data?.pages.flatMap((page) => page.data) || []}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                columns={getUserColumns(setOpen, setSelectedData)} />
            <ModerLogDialog
                open={open}
                onOpenChange={setOpen}
                mutate={mutate}
                data={selectedData}
                isPending={isPending}
            />
        </div>
    )
}