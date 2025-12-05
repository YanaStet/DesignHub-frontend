import { Button } from "@/shared/shadcn-ui/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/shadcn-ui/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/shadcn-ui/ui/form";
import { Input } from "@/shared/shadcn-ui/ui/input";
import { useForm } from "react-hook-form";
import { workCreateSchema, type WorkCreateSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Label } from "@/shared/shadcn-ui/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/shadcn-ui/ui/dropdown-menu";
import { Icon } from "@/shared/shadcn-ui/ui/icon";
import { tagHooks } from "@/entities/tags/hooks";
import type { Category } from "@/entities/categories/model";
import { categoryHooks } from "@/entities/categories/hooks";
import type { Work, WorkRequest } from "@/entities/works/model";
import { imageHooks } from "@/entities/image/hooks";
import { handleApiError } from "@/shared/api/apiError";

type AddWorkDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleCreateWork: (body: WorkRequest) => void;
  isLoading: boolean;
  defaultValues?: Work;
};

export function AddWorkDialog({
  open,
  handleCreateWork,
  setOpen,
  isLoading,
  defaultValues,
}: AddWorkDialogProps) {
  const [img, setImg] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const form = useForm<WorkCreateSchema>({
    resolver: zodResolver(workCreateSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      description: defaultValues?.description || "",
      title: defaultValues?.title || "",
    },
  });

  const { data: tags } = tagHooks.useGetAllTagsQuery();
  const { data: categoris } = categoryHooks.useGetAllCategoriesQuery();
  const { mutate: uploadImage } = imageHooks.useUploadImageMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImg(file);
    }
  };
  const handleAddTag = (name: string) => {
    if (!selectedTags.includes(name)) {
      setSelectedTags([...selectedTags, name]);
    }
  };
  const handleAddCategory = (c: Category) => {
    if (!selectedCategories.includes(c)) {
      setSelectedCategories([...selectedCategories, c]);
    }
  };
  const handleSubmit = (body: WorkCreateSchema) => {
    if (img) {
      uploadImage(img, {
        onSuccess: (data) => {
          handleCreateWork({
            tags_names: selectedTags,
            description: body.description || null,
            title: body.title,
            categories_ids: selectedCategories.map((c) => c.id),
            image_url: data.file_url,
          });
        },
        onError: (er) => handleApiError(er),
      });
    }
    if (defaultValues) {
      handleCreateWork({
        tags_names: selectedTags,
        description: body.description || null,
        title: body.title,
        categories_ids: selectedCategories.map((c) => c.id),
        image_url: defaultValues.image_url,
      });
    }
  };

  useEffect(() => {
    if (defaultValues) {
      setSelectedCategories(defaultValues.categories);
      setSelectedTags(defaultValues.tags.map((t) => t.name));
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <DialogContent className="sm:max-w-[425px] bg-primary-1">
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-gray-6">
                {defaultValues ? "Update your work!" : "Add your own work!"}
              </DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-6 my-3">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      className="text-gray-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-6 my-3">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description"
                      className="text-gray-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="picture" className="text-gray-6 mt-3">
                {defaultValues
                  ? "Leave the field empty, if you want to keep previous image"
                  : "Picture"}
              </Label>
              <Input
                id="picture"
                type="file"
                onChange={handleFileChange}
                className="text-gray-6 file:text-gray-3"
                required={!defaultValues}
              />
            </div>

            <Label className="text-gray-6 mt-3">Tags</Label>
            <div className="mt-3 flex gap-3 flex-wrap">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-gray-2">
                    <Icon name="Plus" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-primary-1 text-gray-4"
                  align="center"
                >
                  <Input
                    placeholder="Add new tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddTag(e.currentTarget.value);
                      }
                    }}
                  />
                  {tags?.map((t, i) => (
                    <DropdownMenuItem
                      onClick={() => handleAddTag(t.name)}
                      key={i}
                    >
                      {t.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {selectedTags.map((name, i) => (
                <div
                  key={i}
                  className="p-2 rounded-2xl bg-gray-2 flex text-gray-4 w-min text-sm gap-2 items-center"
                >
                  {name}
                  <Icon
                    name="Cross"
                    className="text-gray-4 w-4 h-4 cursor-pointer"
                    onClick={() => {
                      const newTags = selectedTags.filter((t) => t !== name);
                      setSelectedTags(newTags);
                    }}
                  />
                </div>
              ))}
            </div>

            <Label className="text-gray-6 mt-3">Categories</Label>
            <div className="mt-3 flex gap-3 flex-wrap">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-gray-2">
                    <Icon name="Plus" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-primary-1 text-gray-4"
                  align="center"
                >
                  {categoris?.map((c, i) => (
                    <DropdownMenuItem
                      onClick={() => handleAddCategory(c)}
                      key={i}
                    >
                      {c.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {selectedCategories.map((category, i) => (
                <div
                  key={i}
                  className="p-2 rounded-2xl bg-gray-2 flex text-gray-4 w-min text-sm gap-2 items-center"
                >
                  {category.name}
                  <Icon
                    name="Cross"
                    className="text-gray-4 w-4 h-4 cursor-pointer"
                    onClick={() => {
                      const newCategories = selectedCategories.filter(
                        (cat) => cat.id !== category.id
                      );
                      setSelectedCategories(newCategories);
                    }}
                  />
                </div>
              ))}
            </div>

            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="bg-gray-2 text-gray-6 border-gray-6"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-primary-2"
                disabled={isLoading}
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
