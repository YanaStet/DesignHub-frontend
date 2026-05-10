import { DesignerProfileHooks } from "@/entities/designer-profile/hooks";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/shadcn-ui/ui/avatar";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { useParams } from "react-router-dom";
import { WorkHooks } from "@/entities/works/hooks";
import { InfinityWorkList } from "@/shared/custom-ui/InfinityWorkList";
import { UserHooks } from "@/entities/users/hooks";
import { Button } from "@/shared/shadcn-ui/ui/button";
import { Icon } from "@/shared/shadcn-ui/ui/icon";
import { ReportDialog } from "@/shared/custom-ui/ReportDialog";
import { useState } from "react";
import { Spinner } from "@/shared/shadcn-ui/ui/spinner";

export function DesignerProfilePage() {
  const [openReportDialog, setOpenReportDialog] = useState(false)
  const { userId } = useParams();
  const { data } = DesignerProfileHooks.useDesignerProfileByIdQuery(
    userId || ""
  );
  const {
    data: works,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = WorkHooks.useWorkByDesignerIdInfiniteQuery(userId || "", {
    q: null,
    tags: null,
  });
  const { data: user, isLoading: isUserLoading } = UserHooks.useGetUserByIdQuery(userId || "");

  const allWorks = works?.pages.flatMap((page) => page.data) || [];

  return (
    <div>
      <div>
        {data?.header_image ? (
          <div className="w-full max-h-35 2xl:max-h-60 overflow-hidden">
            <img
              src={data?.header_image}
              alt="Photo"
              className="object-cover h-full w-full"
            />
          </div>
        ) : (
          <div className="w-full h-60 bg-gray-2 flex items-center justify-around">
            <div className="w-20 h-20 rounded-full bg-gray-3" />
            <div className="w-20 h-20 rounded-full bg-gray-3" />
            <div className="w-20 h-20 rounded-full bg-gray-3" />
          </div>
        )}
      </div>
      <div className="px-15 py-10 relative flex gap-35">
        <div>
          <Avatar className="w-37 h-37 absolute top-[-75px]">
            <AvatarImage
              src={data?.avatar || undefined}
              alt="@shadcn"
              className="object-cover"
            />
            <AvatarFallback>
              {user?.firstName[0]}
              {user?.lastName[0]}
            </AvatarFallback>
          </Avatar>
          {isUserLoading ? <Spinner /> : <><div className="flex gap-3 mt-10 items-center">
            <Typography variant="h3" className="text-gray-4">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Button onClick={() => setOpenReportDialog(true)} className="bg-transparent hover:bg-transparent hover:scale-120 transition-all cursor-pointer duration-300">
              <Icon name="Report" className="w-5 text-white" />
            </Button>
          </div>
            <Typography variant="body3" className="text-gray-4 mt-5 max-w-60">
              {data?.bio}
            </Typography>
            <Typography variant="body3" className="text-gray-4 mt-5 max-w-60">
              Experience: {data?.experience} years
            </Typography></>}
        </div>
        <div className="w-325">
          <div className="w-full h-px bg-gray-6"></div>
          <Typography variant="h4" className="text-gray-4 my-5">
            Projects
          </Typography>

          <InfinityWorkList
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            works={allWorks}
          />
        </div>
      </div>
      <ReportDialog open={openReportDialog} setOpen={setOpenReportDialog} type={"User"} targetId={user?._id || ""} />
    </div>
  );
}
