import { DesignerProfileHooks } from "@/entities/designer-profile/hooks";
import { BASE_URL } from "@/shared/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/shadcn-ui/ui/avatar";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { useMe } from "@/shared/store/meStore";
import clsx from "clsx";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { WorkHooks } from "@/entities/works/hooks";
import { Icon } from "@/shared/shadcn-ui/ui/icon";
import { InfinityWorkList } from "@/shared/custom-ui/InfinityWorkList";

export type StarIcon = "full" | "half" | "empty";

export function DesignerProfilePage() {
  const { userId } = useParams();
  const { me } = useMe();
  const { data } = DesignerProfileHooks.useDesignerProfileByIdQuery(
    Number(userId)
  );
  const {
    data: works,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = WorkHooks.useWorkByDesignerIdInfiniteQuery(me?.id || -1, {
    categories: null,
    q: null,
    tags: null,
  });

  const allWorks = works?.pages.flatMap((page) => page.data) || [];

  const stars: StarIcon[] = useMemo(() => {
    const s: StarIcon[] = [];
    for (let i = 0; i < Math.floor(data?.rating || 0); i++) {
      s.push("full");
    }
    if (data && data.rating % 1 >= 0.5) {
      s.push("half");
    }
    while (s.length < 5) {
      s.push("empty");
    }
    return s;
  }, [data]);

  return (
    <div>
      <div>
        {data?.header_image_url ? (
          <div className="w-full max-h-35 2xl:max-h-60 overflow-hidden">
            <img
              src={BASE_URL + data?.header_image_url}
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
              src={BASE_URL + data?.avatar_url}
              alt="@shadcn"
              className="object-cover"
            />
            <AvatarFallback>
              {me?.firstName[0]}
              {me?.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <Typography variant="h3" className="text-white mt-10">
            {me?.firstName} {me?.lastName}
          </Typography>
          <Typography variant="body3" className="text-gray-4 mt-5 max-w-60">
            {data?.bio}
          </Typography>
          <div className="flex gap-3 mt-5">
            <Typography variant="body3" className="text-white">
              {data?.rating}
            </Typography>
            <div className="flex items-center">
              {stars?.map((star) => (
                <div className="w-4 h-4">
                  {star === "half" ? (
                    <Icon name="HalfStar" className="text-amber-300"></Icon>
                  ) : (
                    <Icon
                      name="Star"
                      className={clsx(
                        star === "full" && "text-amber-300",
                        star === "empty" && "text-primary-2"
                      )}
                    ></Icon>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-325">
          <div className="w-full h-px bg-primary-1"></div>
          <Typography variant="h4" className="text-white my-5">
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
    </div>
  );
}
