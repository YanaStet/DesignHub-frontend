import { handleApiError } from "@/shared/api/apiError";
import { Button } from "@/shared/shadcn-ui/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { Textarea } from "@/shared/shadcn-ui/ui/textarea";
import { showToast } from "@/shared/utils/showToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, type UseMutateFunction } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { COMMENT_KEYS } from "@/entities/comments/model";
import { USER_KEYS } from "@/entities/users/model";
import { WORK_KEYS } from "@/entities/works/model";
import { Spinner } from "@/shared/shadcn-ui/ui/spinner";

export const moderLogSchema = z.object({
  reason: z.string().min(10, "Reason must be at least 10 characters long."),
});

export type ModerLogSchema = z.infer<typeof moderLogSchema>;

type ModerLogDialogProps<T> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mutate: UseMutateFunction<
    T,
    HttpError,
    {
      id: string;
      reason: string;
    },
    unknown
  >;
  data: T | null;
  isPending: boolean;
};

export const ModerLogDialog = <T,>({
  open,
  onOpenChange,
  mutate,
  data,
  isPending,
}: ModerLogDialogProps<T>) => {
  const form = useForm<ModerLogSchema>({
    defaultValues: {
      reason: "",
    },
    resolver: zodResolver(moderLogSchema),
  });

  const queryClient = useQueryClient();

  const handleSubmit = (values: ModerLogSchema) => {
    // В TypeScript під час виконання 'data' це просто об'єкт, бо типи зникають.
    // Тому ми легально перевіряємо наявність унікальних полів (Type Guards):
    if (data && typeof data === "object" && "_id" in data) {
      mutate(
        { id: data._id as string, reason: values.reason },
        {
          onSuccess: () => {
            let entityType = "Item";
            let currentState = false;
            let queryKeyToInvalidate = ["MIXED"];

            if ("content" in data && "design" in data) {
              entityType = "Comment";
              currentState = (data as any).isHidden;
              queryKeyToInvalidate = [COMMENT_KEYS.COMMENTS];
            } else if ("designUrl" in data) {
              entityType = "Work";
              currentState = (data as any).isHidden;
              queryKeyToInvalidate = [WORK_KEYS.INFINITE_QUERY]; // або інший потрібний ключ для дизайнів
            } else if ("role" in data) {
              entityType = "User";
              currentState = (data as any).isBanned;
              queryKeyToInvalidate = [USER_KEYS.INFINITE_QUERY]; // для юзерів
            }

            showToast(
              "success",
              `${entityType} ${!currentState ? "hidden/banned" : "unhidden/unbanned"} successfully`,
            );
            queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
            onOpenChange(false);
          },
          onError: (er) => {
            handleApiError(er);
          },
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-primary-1 border-gray-800 text-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Moderation Logs</DialogTitle>
            </DialogHeader>
            <DialogDescription className="my-4 text-gray-400">
              Write reason for moderation
            </DialogDescription>
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Reason"
                      {...field}
                      className="bg-[#1f2023] border-gray-700 text-white placeholder-gray-500 min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                {isPending ? <Spinner /> : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
