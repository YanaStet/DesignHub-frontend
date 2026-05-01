import { commentHooks } from "@/entities/comments/hooks";
import { handleApiError } from "@/shared/api/apiError";
import { Button } from "@/shared/shadcn-ui/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/shadcn-ui/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "@/shared/shadcn-ui/ui/form";
import { Spinner } from "@/shared/shadcn-ui/ui/spinner";
import { Textarea } from "@/shared/shadcn-ui/ui/textarea";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { showToast } from "@/shared/utils/showToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

type DesignPreviewProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    commentId: string;
}

const banSchema = z.object({
    reason: z.string().min(1, "Please enter a reason"),
})

export const CommentPreview = ({
    open,
    onOpenChange,
    commentId
}: DesignPreviewProps) => {
    const { mutate, isPending } = commentHooks.useBanCommentMutation()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof banSchema>>({
        resolver: zodResolver(banSchema),
    })

    const { data: comment, isLoading } = commentHooks.useCommentByIdQuery(commentId || '');

    const handleBanComment = (values: z.infer<typeof banSchema>) => {
        if (comment?._id) {
            mutate({ id: comment._id, ...values }, {
                onSuccess: () => {
                    showToast('success', 'User banned successfully!')
                    onOpenChange(false)
                    form.reset()
                },
                onError: (error) => handleApiError(error)
            })
        }
    }

    return (<Dialog
        open={open}
        onOpenChange={onOpenChange}
    >
        <DialogContent className="bg-primary-1 border-gray-800 text-white">
            <DialogHeader>
                <DialogTitle>Comment Preview</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleBanComment)}>
                    <div>
                        {isLoading ? <Spinner /> : <>
                            <div className="flex flex-col gap-2 my-3">
                                <Typography className="text-white">Content: {comment?.content}</Typography>
                                <Typography className="text-white">Author email: {comment?.author?.email}</Typography>
                                <Button className="bg-blue-700 text-white hover:bg-blue-800" type="button" onClick={() => navigate(`/works/${comment?.design?._id}`)}>Visit design</Button>
                            </div></>}
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reason</FormLabel>
                                    <Textarea {...field} />
                                </FormItem>
                            )}
                        />

                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white">Close</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending} className="bg-blue-600 text-white hover:bg-blue-700">{isPending ? <Spinner /> : "Ban"}</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog >)
};