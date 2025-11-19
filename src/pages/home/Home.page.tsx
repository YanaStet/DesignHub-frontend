import { WorkHooks } from "@/entities/works/hooks";
import { WorkCard } from "./work-card/WorkCard";
import { Loader } from "@/shared/custom-ui/Loader";
import { Search } from "lucide-react";
import { WorkFilters } from "./work-filters/WorkFilters";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/shadcn-ui/ui/input-group";
import { Button } from "@/shared/shadcn-ui/ui/button";
import type { WorkQueryParams } from "@/entities/works/model";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function HomePage() {
  const [params, setParams] = useState<Omit<WorkQueryParams, "skip" | "limit">>(
    {
      categories: null,
      tags: null,
    }
  );

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = WorkHooks.useWorkInfiniteQuery(params);

  const allWorks = data?.pages.flatMap((page) => page.data) || [];

  const { ref, inView } = useInView({
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full flex justify-around gap-10">
      <div>
        <WorkFilters setParams={setParams} />
      </div>
      <div>
        <div className="min-w-175 flex items-center flex-col gap-3">
          <div className="flex gap-3 min-w-175">
            <InputGroup className="w-full">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <Button>Search</Button>
          </div>
          {isLoading && !isError ? (
            <Loader className="h-[calc(100vh-64px-120px)]" />
          ) : allWorks && allWorks.length > 0 ? (
            <div className="flex flex-wrap justify-between gap-3">
              {allWorks.map((work, index) => (
                <div
                  key={work.id}
                  ref={allWorks.length - 1 === index ? ref : null}
                >
                  <WorkCard {...work} />
                </div>
              ))}
            </div>
          ) : isFetchingNextPage ? (
            <Loader />
          ) : (
            <Typography variant="h4" className="text-gray-3 mt-30">
              No works found
            </Typography>
          )}

          {!hasNextPage && allWorks.length > 0 && (
            <Typography variant="body3" className="text-gray-3 mt-4">
              You have reached the end.
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
