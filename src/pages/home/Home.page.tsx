import { WorkHooks } from "@/entities/works/hooks";
import { WorkCard } from "./work-card/WorkCard";
import { Loader } from "@/shared/custom-ui/Loader";
import { Input } from "@/shared/shadcn-ui/ui/input";
import { WorkFilters } from "./work-filters/WorkFilters";

export function HomePage() {
  const { data: works, isLoading } = WorkHooks.useGetAllWorksQuery({
    categories: null,
    tags: null,
    limit: 6,
    skip: 0,
  });
  return (
    <div className="w-full flex justify-around gap-10">
      <div>
        <WorkFilters />
      </div>
      <div>
        <div>
          <Input placeholder="Search" className="mb-5" />
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap justify-between gap-3">
              {works?.map((work) => (
                <WorkCard key={work.id} {...work} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
