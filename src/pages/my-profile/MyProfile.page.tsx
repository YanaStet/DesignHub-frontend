import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/shadcn-ui/ui/avatar";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { useMe } from "@/shared/store/meStore";
import { useState } from "react";
import { WorkHooks } from "@/entities/works/hooks";
import { InfinityWorkList } from "@/shared/custom-ui/InfinityWorkList";
import { Button } from "@/shared/shadcn-ui/ui/button";
import { AddWorkDialog } from "./add-work-dialog/AddWorkDialog";
import { WORK_KEYS, type WorkRequest } from "@/entities/works/model";
import { showToast } from "@/shared/utils/showToast";
import { useQueryClient } from "@tanstack/react-query";
import { handleApiError } from "@/shared/api/apiError";
import { ManageProfileDialog } from "./manage-profile-dialog/ManageProfileDialog";
import { DesignerProfileHooks } from "@/entities/designer-profile/hooks";
import {
  DESIGNER_PROFILE_KEYS,
  type DesignerProfileRequest,
} from "@/entities/designer-profile/model";
import { Tabs, TabsList, TabsTrigger } from "@/shared/shadcn-ui/ui/tabs";

export function MyProfilePage() {
  const [selectedTab, setSelectedTab] = useState<"projects" | "liked">("projects");
  const [openWorkDialog, setOpenWorkDialog] = useState(false);
  const [openDesignerProfileDialog, setOpenDesignerProfileDialog] =
    useState(false);
  const { me, myProfile, setDesignerProfile } = useMe();
  const queryClient = useQueryClient();

  const {
    data: works,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = WorkHooks.useWorkByDesignerIdInfiniteQuery(me?._id || "", {
    q: null,
    tags: null,
  });
  const {
    data: likedWorks,
    fetchNextPage: fetchNextLikedWorksPage,
    hasNextPage: hasNextLikedWorksPage,
    isFetchingNextPage: isFetchingNextLikedWorksPage,
  } = WorkHooks.useLikedWorksByDesignerIdInfinityQuery(me?._id || "", {
    q: null,
    tags: null
  })

  const { mutate, isPending: isWorkCreateLoading } =
    WorkHooks.useCreateWorkMutation();
  const { mutate: editProfile, isPending: isProfileLoading } =
    DesignerProfileHooks.useUpdateDesignerProfileMutation();


  const allWorks = works?.pages.flatMap((page) => page.data) || [];
  const allLikedWorks = likedWorks?.pages.flatMap((page) => page.data) || [];

  const tabDisplay = {
    projects: allWorks.length > 0 ? (
      <InfinityWorkList
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        works={allWorks}
        myProfile
      />
    ) : (
      <div className="h-full w-full flex justify-center items-center">
        <Typography variant="body2" className="text-gray-3">
          There is no works yet
        </Typography>
      </div>
    ),
    liked: allLikedWorks.length > 0 ? (
      <InfinityWorkList
        works={allLikedWorks}
        fetchNextPage={fetchNextLikedWorksPage}
        hasNextPage={hasNextLikedWorksPage}
        isFetchingNextPage={isFetchingNextLikedWorksPage}
      />
    ) : (
      <div className="h-full w-full flex justify-center items-center">
        <Typography variant="body2" className="text-gray-3">
          There is no liked works yet
        </Typography>
      </div>
    )
  }

  const handleAddWork = (body: WorkRequest) => {
    mutate(body, {
      onSuccess: () => {
        showToast("success", "You created work!");
        queryClient.invalidateQueries({ queryKey: [WORK_KEYS.INFINITE_QUERY] });
        setOpenWorkDialog(false);

      },
      onError: (er) => {
        handleApiError(er);
        setOpenWorkDialog(false);
      },
    });
  };
  const handleUpdateProfile = (values: DesignerProfileRequest) => {
    editProfile(values, {
      onSuccess: (res) => {
        showToast("success", "You successfuly edited your profile.");
        setOpenDesignerProfileDialog(false);
        queryClient.invalidateQueries({
          queryKey: [DESIGNER_PROFILE_KEYS.DESIGNER_PROFILE_ME],
        });
        setOpenDesignerProfileDialog(false);
        setDesignerProfile(res);
      },
      onError: (er) => {
        handleApiError(er);
        setOpenDesignerProfileDialog(false);
      },
    });
  };


  return (
    <div className="w-full h-full">
      {myProfile?.bio && myProfile.specialization ? (
        <>
          <div>
            {myProfile?.header_image ? (
              <div className="w-full max-h-35 2xl:max-h-60 overflow-hidden">
                <img
                  src={myProfile?.header_image}
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
                  src={myProfile.avatar || undefined}
                  alt="@shadcn"
                  className="object-cover"
                />
                <AvatarFallback>
                  {me?.firstName[0]}
                  {me?.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Typography variant="h3" className="text-gray-4 mt-10">
                {me?.firstName} {me?.lastName}
              </Typography>
              <Typography variant="body3" className="text-gray-4 mt-5 max-w-60">
                {myProfile?.bio}
              </Typography>
              <Typography variant="body3" className="text-gray-4 mt-5 max-w-60">
                Experience: {myProfile?.experience} years
              </Typography>

              <Button
                className="mt-5 w-full"
                onClick={() => setOpenDesignerProfileDialog(true)}
              >
                Edit profile
              </Button>
            </div>
            <div className="w-325">
              <div className="w-full h-px bg-gray-6"></div>
              <div className="w-full flex justify-between my-5 items-center">
                <Tabs defaultValue="projects" >
                  <TabsList variant="line">
                    <TabsTrigger value="projects" onClick={() => setSelectedTab("projects")} className="text-lg text-white hover:text-gray-300 data-[state=active]:text-gray-400 after:bg-gray-400">Projects</TabsTrigger>
                    <TabsTrigger value="liked" onClick={() => setSelectedTab("liked")} className="text-lg text-white hover:text-gray-300 data-[state=active]:text-gray-400 after:bg-gray-400">Liked</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button
                  className="cursor-pointer"
                  onClick={() => setOpenWorkDialog(true)}
                >
                  Add work
                </Button>
              </div>

              {selectedTab === 'projects' && tabDisplay.projects}
              {selectedTab === 'liked' && tabDisplay.liked}


            </div>
          </div>
          <AddWorkDialog
            open={openWorkDialog}
            handleCreateWork={handleAddWork}
            setOpen={setOpenWorkDialog}
            isLoading={isWorkCreateLoading}
          />
        </>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <Button
            className="mt-5 w-50"
            onClick={() => setOpenDesignerProfileDialog(true)}
          >
            Add profile
          </Button>
        </div>
      )}
      <ManageProfileDialog
        open={openDesignerProfileDialog}
        setOpen={setOpenDesignerProfileDialog}
        isLoading={isProfileLoading}
        handleUpdateProfile={handleUpdateProfile}
        defaultValues={myProfile || undefined}
      />
    </div>
  );
}
