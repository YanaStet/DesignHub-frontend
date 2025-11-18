import { Typography } from "@/shared/shadcn-ui/ui/typography";

export function WorkFilters() {
  return (
    <div className="p-6 rounded-2xl bg-primary-1 w-80">
      <Typography variant="h2" className="text-white mb-4">
        Filters
      </Typography>
      <div>
        <Typography variant="h4" className="text-gray-4 mb-2">
          Categories
        </Typography>
      </div>
      <div>
        <Typography variant="h4" className="text-gray-4 mb-2">
          Tags
        </Typography>
      </div>
    </div>
  );
}
