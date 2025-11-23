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
  const [searchValue, setSearchValue] = useState("");
  const [params, setParams] = useState<Omit<WorkQueryParams, "skip" | "limit">>(
    {
      categories: null,
      tags: null,
      q: null,
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

  const handleSearch = () => {
    setSearchValue(searchValue);
    setParams((prev) => ({
      ...prev,
      q: searchValue,
    }));
  };

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
    <div className="w-full flex justify-around gap-20">
      <div>
        <WorkFilters setParams={setParams} />
      </div>
      <div>
        <div className="min-w-190 flex items-center flex-col gap-3 overflow-x-hidden">
          <div className="flex gap-3 min-w-175">
            <InputGroup className="w-full">
              <InputGroupInput
                className="text-gray-4"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <Button onClick={handleSearch}>Search</Button>
          </div>
          {isLoading && !isError ? (
            <Loader className="h-[calc(100vh-64px-120px)]" />
          ) : isError ? (
            <Typography variant="h4" className="text-gray-3 mt-30">
              Something went wrong...
            </Typography>
          ) : allWorks && allWorks.length > 0 ? (
            <div className="flex flex-wrap justify-around gap-3 max-h-[375px] pr-3 overflow-y-auto rounded-2xl custom-scrollbar-container">
              {allWorks.map((work, index) => (
                <div
                  key={work.id}
                  ref={allWorks.length - 1 === index ? ref : null}
                >
                  <WorkCard {...work} />
                </div>
              ))}
              {!hasNextPage && allWorks.length > 0 && (
                <div className="w-full flex justify-center">
                  <Typography variant="body3" className="text-gray-3 mt-4">
                    You have reached the end.
                  </Typography>
                </div>
              )}
            </div>
          ) : isFetchingNextPage ? (
            <Loader />
          ) : (
            <Typography variant="h4" className="text-gray-3 mt-30">
              No works found
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
