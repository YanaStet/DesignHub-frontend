import {
  DESIGNER_PROFILE_KEYS,
  type DesignerProfile,
  type DesignerProfileRequest,
} from "@/entities/designer-profile/model";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { designerProfileSchema, type DesignerProfileSchema } from "./schema";
import { useState } from "react";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { Label } from "@/shared/shadcn-ui/ui/label";
import { DesignerProfileHooks } from "@/entities/designer-profile/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/shared/utils/showToast";

type ManageProfileDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValues?: DesignerProfile;
  isLoading: boolean;
  handleUpdateProfile: (values: DesignerProfileRequest) => void;
};

export function ManageProfileDialog({
  open,
  setOpen,
  isLoading,
  defaultValues,
  handleUpdateProfile,
}: ManageProfileDialogProps) {
  const [experience, setExperience] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [header, setHeader] = useState<File | null>(null);

  const form = useForm<DesignerProfileSchema>({
    resolver: zodResolver(designerProfileSchema),
    defaultValues: {
      bio: defaultValues?.bio || "",
      specialization: defaultValues?.specialization || "",
    },
  });
  const queryClient = useQueryClient();

  const { mutate: postAvatar } = DesignerProfileHooks.usePostAvatarMutation();
  const { mutate: postHeader } = DesignerProfileHooks.usePostHeaderMutation();

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };
  const handleHeaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setHeader(file);
    }
  };
  const handleSubmit = (values: DesignerProfileSchema) => {
    if (avatar) {
      postAvatar(avatar, {
        onError: () => {
          showToast("error", "Something went wrong with avatar.");
          setOpen(false);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [DESIGNER_PROFILE_KEYS.DESIGNER_PROFILE_ME],
          });
        },
      });
    }
    if (header) {
      postHeader(header, {
        onError: () => {
          showToast("error", "Something went wrong with avatar.");
          setOpen(false);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [DESIGNER_PROFILE_KEYS.DESIGNER_PROFILE_ME],
          });
        },
      });
    }
    handleUpdateProfile({
      bio: values.bio || null,
      experience: experience,
      specialization: values.specialization || null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <DialogContent className="sm:max-w-[425px] bg-primary-1">
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-gray-6">
                {defaultValues ? "Update your profile!" : "Create profile!"}
              </DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-6 my-3">Bio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bio"
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
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-6 my-3">
                    Specialization
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Specialization"
                      className="text-gray-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel className="text-gray-6 my-3">
              Experience (years)
            </FormLabel>
            <Input
              placeholder="Experience"
              className="text-gray-6"
              type="number"
              defaultValue={defaultValues?.experience || 0}
              onChange={(e) => {
                if (Number(e.currentTarget.value) >= 0) {
                  setExperience(Number(e.currentTarget.value));
                  setError(null);
                } else {
                  setError("Experience must be not negative");
                }
              }}
            />
            <Typography className="text-red-500 mt-3" variant="body3">
              {error}
            </Typography>

            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="avatar" className="text-gray-6 mt-3">
                {defaultValues
                  ? "Leave the field empty, if you want to keep previous avatar"
                  : "Avatar"}
              </Label>
              <Input
                id="avatar"
                type="file"
                onChange={handleAvatarChange}
                className="text-gray-6 file:text-gray-3"
                required={!defaultValues}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="header" className="text-gray-6 mt-3">
                {defaultValues
                  ? "Leave the field empty, if you want to keep previous header"
                  : "Header"}
              </Label>
              <Input
                id="header"
                type="file"
                onChange={handleHeaderChange}
                className="text-gray-6 file:text-gray-3"
                required={!defaultValues}
              />
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
