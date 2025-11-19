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
import { useState } from "react";

export function HomePage() {
  const [params, setParams] = useState<WorkQueryParams>({
    categories: null,
    tags: null,
    limit: 6,
    skip: 0,
  });

  console.log("Current WorkQueryParams:", params);

  const {
    data: works,
    isLoading,
    isError,
  } = WorkHooks.useGetAllWorksQuery(params);

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
          ) : works && works.length > 0 ? (
            <div className="flex flex-wrap justify-between gap-3">
              {works?.map((work) => (
                <WorkCard key={work.id} {...work} />
              ))}
            </div>
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
