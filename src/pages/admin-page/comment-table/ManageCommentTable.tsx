import InfinityTable from "@/shared/custom-ui/InfinityTable";
import { commentHooks } from "@/entities/comments/hooks";
import { getCommentColumns } from "./columns";
import { useState } from "react";
import { type Comment } from "@/entities/comments/model";
import { ModerLogDialog } from "../moder-log-dialog/ModerLogDialog";

export const ManageCommentTable = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    commentHooks.useInfinityCommentsQuery();

  const { mutate } = commentHooks.useBanCommentMutation();
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Comment | null>(null);

  return (
    <div>
      <InfinityTable
        fetchNextPage={fetchNextPage}
        data={data?.pages.flatMap((page) => page.data) || []}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        columns={getCommentColumns(setOpen, setSelectedData)}
      />
      <ModerLogDialog
        open={open}
        onOpenChange={setOpen}
        mutate={mutate}
        data={selectedData}
      />
    </div>
  );
};
