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
import { Icon } from "@/shared/shadcn-ui/ui/icon";
import { useState } from "react";
import { commentHooks } from "@/entities/comments/hooks";
import { useQueryClient } from "@tanstack/react-query";
import {
  COMMENT_KEYS,
  type UpdateCommentRequest,
} from "@/entities/comments/model";
import { showToast } from "@/shared/utils/showToast";

type AddCommentDialogProps = {
  workId: number;
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
  const [rate, setRate] = useState(1);
  const stars = [
    { type: "full", i: 1 },
    { type: "empty", i: 2 },
    { type: "empty", i: 3 },
    { type: "empty", i: 4 },
    { type: "empty", i: 5 },
  ];

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
          comment_text: values.comment_text,
          rating_score: rate,
          work_id: workId,
        },
        {
          onSuccess: () => {
            showToast("success", "Comment was created.");
            queryClient.invalidateQueries({
              queryKey: [COMMENT_KEYS.COMMENTS],
            });
            form.reset();
            setRate(1);
          },
          onError: (error) => {
            console.error("Помилка створення коментаря:", error);
          },
        }
      );
    } else {
      if (handleEditComment) {
        handleEditComment({
          comment_text: values.comment_text,
          rating_score: rate,
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
            <div className="flex gap-1 mt-5">
              {stars.map((star, i) => {
                if (i < rate) {
                  return (
                    <Icon
                      name="Star"
                      className="w-5 h-5 cursor-pointer text-amber-300"
                      onClick={() => {
                        setRate(i + 1);
                      }}
                    />
                  );
                } else {
                  return (
                    <Icon
                      name="Star"
                      className="w-5 h-5 cursor-pointer text-primary-2"
                      onClick={() => {
                        setRate(i + 1);
                      }}
                    />
                  );
                }
              })}
            </div>

            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button variant="outline" className="bg-gray-4">
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
