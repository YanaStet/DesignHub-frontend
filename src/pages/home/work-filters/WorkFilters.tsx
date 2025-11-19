import { useState, useEffect } from "react"; // Додайте import useState та useEffect
import { categoryHooks } from "@/entities/categories/hooks";
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: tags, isLoading: isLoadingTags } =
    tagHooks.useGetAllTagsQuery();
  const { data: categories, isLoading: isLoadingCategories } =
    categoryHooks.useGetAllCategoriesQuery();

  useEffect(() => {
    const newParams: WorkQueryParams = {
      limit: 6,
      skip: null,
      categories: selectedCategories.length > 0 ? selectedCategories : null,
      tags: selectedTags.length > 0 ? selectedTags : null,
    };

    setParams(newParams);
  }, [selectedCategories, selectedTags, setParams]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories((prev) => {
      if (checked) {
        return [...new Set([...prev, categoryId])];
      } else {
        return prev.filter((id) => id !== categoryId);
      }
    });
  };

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
      <Typography variant="h2" className="text-white mb-4">
        Filters
      </Typography>

      <div className="mb-5">
        <Typography variant="h4" className="text-gray-4 mb-4">
          Categories
        </Typography>
        <div className="flex flex-col gap-3 max-h-30 overflow-y-scroll custom-scrollbar-container">
          {isLoadingCategories && <Loader />}
          {!isLoadingCategories &&
            categories?.map((category) => (
              <div key={category.id} className="flex items-center gap-3">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id.toString())}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category.id.toString(), !!checked)
                  }
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="text-gray-4"
                >
                  {category.name}
                </Label>
              </div>
            ))}
        </div>
      </div>

      <div>
        <Typography variant="h4" className="text-gray-4 mb-4">
          Tags
        </Typography>
        <div className="flex flex-col gap-3 max-h-30 overflow-y-scroll custom-scrollbar-container">
          {isLoadingTags && <Loader />}
          {!isLoadingTags &&
            tags?.map((tag) => (
              <div key={tag.id} className="flex items-center gap-3">
                <Checkbox
                  id={`tag-${tag.id}`}
                  checked={selectedTags.includes(tag.name)}
                  onCheckedChange={(checked) =>
                    handleTagChange(tag.name, !!checked)
                  }
                />
                <Label htmlFor={`tag-${tag.id}`} className="text-gray-4">
                  {tag.name}
                </Label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
