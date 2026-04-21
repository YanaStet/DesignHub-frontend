import { Button } from "@/shared/shadcn-ui/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/shadcn-ui/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/shadcn-ui/ui/form";
import { Textarea } from "@/shared/shadcn-ui/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const moderLogSchema = z.object({
    reason: z.string().min(10, "Reason must be at least 10 characters long."),
});

export type ModerLogSchema = z.infer<typeof moderLogSchema>;

type ModerLogDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ModerLogDialog = ({ open, onOpenChange }: ModerLogDialogProps) => {
    const form = useForm<ModerLogSchema>({
        defaultValues: {
            reason: "",
        },
        resolver: zodResolver(moderLogSchema),
    })

    const handleSubmit = (values: ModerLogSchema) => {
        console.log(values);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Moderation Logs</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            Write reason for moderation
                        </DialogDescription>
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reason</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Reason" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>

        </Dialog>
    )
}