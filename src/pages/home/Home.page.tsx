import { WorkHooks } from "@/entities/works/hooks";
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
import { useState } from "react";
import { InfinityWorkList } from "@/shared/custom-ui/InfinityWorkList";

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

  return (
    <div className="w-full flex justify-around gap-20 px-15 py-10">
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
            <InfinityWorkList
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              works={allWorks}
              isFetchingNextPage={isFetchingNextPage}
            />
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
