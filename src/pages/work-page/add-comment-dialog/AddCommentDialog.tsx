import { Button } from "@/shared/shadcn-ui/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/shadcn-ui/ui/dialog";
import { useForm } from "react-hook-form";
import { formSchema, type FormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/shadcn-ui/ui/form";
import { Input } from "@/shared/shadcn-ui/ui/input";
import { commentHooks } from "@/entities/comments/hooks";
import { useQueryClient } from "@tanstack/react-query";
import {
  COMMENT_KEYS,
  type UpdateCommentRequest,
} from "@/entities/comments/model";
import { showToast } from "@/shared/utils/showToast";
import { handleApiError } from "@/shared/api/apiError";

type AddCommentDialogProps = {
  workId: string;
  isEdit?: boolean;
  handleEditComment?: (comment: UpdateCommentRequest) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isLoading?: boolean;
};

export function AddCommentDialog({
  workId,
  isEdit,
  handleEditComment,
  open,
  setOpen,
  isLoading,
}: AddCommentDialogProps) {


  const queryClient = useQueryClient();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment_text: "",
    },
    reValidateMode: "onSubmit",
  });

  const { mutate } = commentHooks.useCreateCommentMutation();

  const onSubmit = (values: FormSchema) => {
    if (!isEdit) {
      mutate(
        {
          content: values.comment_text,
          designId: workId,
        },
        {
          onSuccess: () => {
            showToast("success", "Comment was created.");
            queryClient.invalidateQueries({
              queryKey: [COMMENT_KEYS.COMMENTS],
            });
            form.reset();
          },
          onError: (er) => handleApiError(er),
        }
      );
    } else {
      if (handleEditComment) {
        handleEditComment({
          content: values.comment_text,
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <DialogContent className="sm:max-w-[425px] bg-primary-1">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-gray-6">
                {isEdit ? "Edit your comment!" : "Write your own comment!"}
              </DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="comment_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-6 my-3">Comment</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your comment"
                      className="text-gray-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button variant="outline" className="bg-gray-4 text-gray-2">
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
