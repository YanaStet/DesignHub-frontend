import type { Work } from "@/entities/works/model";
import { Typography } from "../shadcn-ui/ui/typography";
import { WorkCard } from "@/shared/custom-ui/WorkCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { WorksPageData } from "@/entities/works/hooks/useWorkInfiniteQuery";
import clsx from "clsx";
import { Loader } from "./Loader";

type InfinityWorkListProps = {
  works: Work[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<WorksPageData, unknown>,
      AxiosError<unknown, any>
    >
  >;
  classNames?: string;
  myProfile?: boolean;
};

export function InfinityWorkList({
  works,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  classNames,
  myProfile,
}: InfinityWorkListProps) {
  const { ref, inView } = useInView({
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div
      className={clsx(
        "flex flex-wrap justify-around gap-3 max-h-[375px] xl:max-h-[400px] 2xl:max-h-[700px] pr-3 overflow-y-auto rounded-2xl custom-scrollbar-container",
        classNames
      )}
    >
      {works.map((work, index) => (
        <div key={work.id} ref={works.length - 1 === index ? ref : null}>
          <WorkCard work={work} myProfile={myProfile} />
        </div>
      ))}
      {isFetchingNextPage && <Loader />}
      {!hasNextPage && works.length > 0 && (
        <div className="w-full flex justify-center">
          <Typography variant="body3" className="text-gray-3 mt-4">
            You have reached the end.
          </Typography>
        </div>
      )}
    </div>
  );
}
