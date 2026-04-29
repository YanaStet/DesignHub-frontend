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
import type { Work, WorkRequest } from "@/entities/works/model";
import type { Tag } from "@/entities/tags/model";
import { FileUploadField } from "@/shared/custom-ui/FileUploadField";
import { Spinner } from "@/shared/shadcn-ui/ui/spinner";

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
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const form = useForm<WorkCreateSchema>({
    resolver: zodResolver(workCreateSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      description: defaultValues?.description || "",
      title: defaultValues?.title || "",
    },
  });

  const { data: tags } = tagHooks.useGetAllTagsQuery();

  const handleFileChange = (file: File | null) => {
    setImg(file);
  };
  const handleAddTag = (tag: Tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  const handleSubmit = (body: WorkCreateSchema) => {
    handleCreateWork({
      tags: selectedTags.map((t) => t._id),
      description: body.description || null,
      title: body.title,
      coverImage: img,
      designFile: img,
    });
  };

  useEffect(() => {
    if (defaultValues) {
      setSelectedTags(defaultValues.tags);
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
              <FileUploadField
                onChange={handleFileChange}
                value={img}
                accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                label="Upload content image"
                icon={<Icon name="Plus" />}
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
                  {tags?.map((t, i) => (
                    <DropdownMenuItem
                      onClick={() => handleAddTag(t)}
                      key={i}
                    >
                      {t.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {selectedTags.map((tag, i) => (
                <div
                  key={i}
                  className="p-2 rounded-2xl bg-gray-2 flex text-gray-4 w-min text-sm gap-2 items-center"
                >
                  {tag.name}
                  <Icon
                    name="Cross"
                    className="text-gray-4 w-4 h-4 cursor-pointer"
                    onClick={() => {
                      const newTags = selectedTags.filter((t) => t._id !== tag._id);
                      setSelectedTags(newTags);
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
                {isLoading ? <Spinner /> : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
