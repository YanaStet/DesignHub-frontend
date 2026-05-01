import { WorkHooks } from "@/entities/works/hooks";
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
    designId: string;
}

const banSchema = z.object({
    reason: z.string().min(1, "Please enter a reason"),
})

export const DesignPreview = ({
    open,
    onOpenChange,
    designId
}: DesignPreviewProps) => {
    const navigate = useNavigate()
    const { mutate, isPending } = WorkHooks.useBanWorkMutation()

    const form = useForm<z.infer<typeof banSchema>>({
        resolver: zodResolver(banSchema),
    })

    const { data: design, isLoading } = WorkHooks.useGetWorkByIdQuery(designId);

    const handleBanWork = (values: z.infer<typeof banSchema>) => {
        if (design?._id) {
            mutate({ id: design._id, ...values }, {
                onSuccess: () => {
                    showToast('success', 'Work banned successfully!')
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
                <DialogTitle>Design Preview</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleBanWork)}>
                    <div>
                        {isLoading ? <Spinner /> : <><div className="flex gap-3">
                            <div className="flex flex-col gap-2">
                                <Typography className="text-white">Cover</Typography>
                                <img src={design?.coverUrl} alt="" className="rounded-xl" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Typography className="text-white">Design</Typography>
                                <img src={design?.designUrl} alt="" className="rounded-xl" />
                            </div>
                        </div>
                            <div className="flex flex-col gap-2 my-3">
                                <Typography className="text-white">Title: {design?.title}</Typography>
                                <Typography className="text-white">Description: {design?.description}</Typography>
                                <Typography className="text-white">Views: {design?.views}</Typography>
                                {design?.tags && design.tags.length > 0 ? (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {design.tags.map((tag) => (
                                            <div
                                                key={tag._id}
                                                className="text-gray-1 px-2 py-1 rounded-xl bg-gray-3 text-sm"
                                            >
                                                {tag.name}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Typography variant="body3" className="text-gray-3">
                                        There is no tags.
                                    </Typography>
                                )}
                                <Button className="bg-blue-700 text-white hover:bg-blue-800" type="button" onClick={() => navigate(`/works/${design?._id}`)}>Visit design</Button>
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