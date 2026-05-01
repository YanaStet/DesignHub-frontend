import type { props } from "@/entities/reports/hooks/useResolveReportMutation";
import { REPORT_KEYS, type Report } from "@/entities/reports/model";
import { handleApiError } from "@/shared/api/apiError";
import { Button } from "@/shared/shadcn-ui/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/shadcn-ui/ui/dropdown-menu";
import { Icon } from "@/shared/shadcn-ui/ui/icon";
import { showToast } from "@/shared/utils/showToast";
import { useQueryClient, type UseMutateFunction } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import type { HttpError } from "@/shared/api/api";
import clsx from "clsx";

export const getReportColumns = (
    mutate: UseMutateFunction<Report, HttpError, props, unknown>,
    setOpenDesignPreview: (open: boolean) => void,
    setDesignId: (designId: string) => void,
    setOpenUserPreview: (open: boolean) => void,
    setUserId: (userId: string) => void,
    setOpenCommentPreview: (open: boolean) => void,
    setCommentId: (commentId: string) => void
): ColumnDef<Report>[] => {
    const queryClient = useQueryClient();

    const handleResolve = (report: Report) => {
        mutate({ reportId: report._id, body: { status: 'Resolved' } }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [REPORT_KEYS.GET_PAGINATED_REPORTS] })
                showToast('success', 'Report resolved successfully')
            },
            onError: (er) => {
                handleApiError(er)
            }
        })
    }

    const handleReject = (report: Report) => {
        mutate({ reportId: report._id, body: { status: 'Dismissed' } }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [REPORT_KEYS.GET_PAGINATED_REPORTS] })
                showToast('success', 'Report dismissed successfully')
            },
            onError: (er) => {
                handleApiError(er)
            }
        })
    }


    return [{
        accessorKey: "reason",
        header: "Reason"
    },
    {
        accessorKey: "description",
        header: "Description"
    },
    {
        accessorKey: "targetType",
        header: 'Type',
        cell: ({ row }) => {
            const report = row.original;
            return (
                <Button variant="outline" size="sm" className="bg-primary-1 border-0" onClick={() => {
                    if (report.targetType === 'Design') {
                        setDesignId(report.targetId);
                        setOpenDesignPreview(true);
                    } else if (report.targetType === 'User') {
                        setUserId(report.targetId);
                        setOpenUserPreview(true);
                    } else if (report.targetType === 'Comment') {
                        setCommentId(report.targetId);
                        setOpenCommentPreview(true);
                    }
                }}>
                    {report.targetType}
                </Button>
            );
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const report = row.original;
            return (
                <span className={clsx("p-2 rounded-full", report.status === 'Resolved' ? "bg-green-950 text-green-300" : report.status === 'Pending' ? "bg-yellow-950 text-yellow-300" : "bg-red-950 text-red-300")}>{report.status}</span>
            );
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const report = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-primary-1 border-0">
                            <Icon name="ThreeDots" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-primary-1 text-gray-4"
                        align="center">
                        <DropdownMenuItem onClick={() => handleResolve(report)}>Resolve</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReject(report)}>Dismiss</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }

    }]
}

