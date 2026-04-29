import { Button } from "../shadcn-ui/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../shadcn-ui/ui/dialog"
import { Form, FormField, FormItem, FormLabel } from "../shadcn-ui/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn-ui/ui/select"
import { Reason, type TargetType } from "@/entities/reports/model"
import { Textarea } from "../shadcn-ui/ui/textarea"
import { reportHooks } from "@/entities/reports/hooks"
import { showToast } from "../utils/showToast"
import { handleApiError } from "../api/apiError"
import { Spinner } from "../shadcn-ui/ui/spinner"

const reportSchema = z.object({
    reason: z.enum(["Spam", "Harassment", "Copyright Violation", "Other", "Inappropriate Content"]),
    description: z.string().min(1, "Please enter a description"),
})

type ReportDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    type: TargetType
    targetId: string
}

export const ReportDialog = ({ open, setOpen, type, targetId }: ReportDialogProps) => {
    const { mutate, isPending } = reportHooks.useCreateReportMutation()

    const form = useForm<z.infer<typeof reportSchema>>({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            reason: "Spam",
            description: "",
        },
    })

    const onSubmit = (values: z.infer<typeof reportSchema>) => {
        mutate({
            description: values.description,
            reason: values.reason,
            targetId,
            targetType: type
        }, {
            onSuccess: () => {
                showToast('success', 'Report submitted successfully!')
                setOpen(false)
                form.reset()
            },
            onError: (error) => handleApiError(error)
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-primary-1 border-gray-800 text-white">
                <DialogHeader>
                    <DialogTitle>Report</DialogTitle>
                    <DialogDescription>
                        Please provide a reason for your report. This will help us to resolve it quickly.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reason</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a reason" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(Reason).map((reason) => (
                                                <SelectItem key={reason} value={reason}>
                                                    {reason}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel>Description</FormLabel>
                                    <Textarea {...field} />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="sm:justify-start mt-4">
                            <DialogClose asChild>
                                <Button variant="outline" className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white">Close</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending} className="bg-blue-600 text-white hover:bg-blue-700">{isPending ? <Spinner /> : "Report"}</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}