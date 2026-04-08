import { useState, useEffect } from "react"; // Додайте import useState та useEffect
import { tagHooks } from "@/entities/tags/hooks";
import type { WorkQueryParams } from "@/entities/works/model";
import { Loader } from "@/shared/custom-ui/Loader";
import { Checkbox } from "@/shared/shadcn-ui/ui/checkbox";
import { Label } from "@/shared/shadcn-ui/ui/label";
import { Typography } from "@/shared/shadcn-ui/ui/typography";

type WorkFiltersProps = {
  setParams: (params: WorkQueryParams) => void;
};

export function WorkFilters({ setParams }: WorkFiltersProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: tags, isLoading: isLoadingTags } =
    tagHooks.useGetAllTagsQuery();

  useEffect(() => {
    const newParams: WorkQueryParams = {
      limit: 6,
      skip: null,
      tags: selectedTags.length > 0 ? selectedTags : null,
      q: null,
    };

    setParams(newParams);
  }, [selectedTags, setParams]);

  const handleTagChange = (tagName: string, checked: boolean) => {
    setSelectedTags((prev) => {
      if (checked) {
        return [...new Set([...prev, tagName])];
      } else {
        return prev.filter((name) => name !== tagName);
      }
    });
  };

  return (
    <div className="p-6 rounded-2xl bg-primary-1 w-80">
      <Typography variant="h2" className="text-gray-4 mb-4">
        Filters
      </Typography>

      <div>
        <Typography variant="h4" className="text-gray-4 mb-4">
          Tags
        </Typography>
        <div className="flex flex-col gap-3 max-h-70 overflow-y-scroll custom-scrollbar-container">
          {isLoadingTags && <Loader />}
          {!isLoadingTags &&
            tags?.map((tag) => (
              <div key={tag._id} className="flex items-center gap-3">
                <Checkbox
                  className="cursor-pointer border-gray-6"
                  id={`tag-${tag._id}`}
                  checked={selectedTags.includes(tag.name)}
                  onCheckedChange={(checked) =>
                    handleTagChange(tag.name, !!checked)
                  }
                />
                <Label htmlFor={`tag-${tag._id}`} className="text-gray-4">
                  {tag.name}
                </Label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
