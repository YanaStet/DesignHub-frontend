import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table'
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import type {
    FetchNextPageOptions,
} from "@tanstack/react-query";
import { Spinner } from '../shadcn-ui/ui/spinner';



type InfinityTableProps<T> = {
    data: T[];
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: (
        options?: FetchNextPageOptions | undefined,
    ) => Promise<any>;
    columns: ColumnDef<T>[];
    isLoading: boolean;
}

export default function InfinityTable<T>({ data, columns, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading }: InfinityTableProps<T>) {
    const { ref, inView } = useInView({
        rootMargin: "200px",
    });
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className='overflow-y-auto max-h-[70vh] rounded-xl border-2 border-gray-800 custom-scrollbar-container'>
            {isLoading ? <Spinner /> : <table className='w-full'>
                <thead className='sticky top-0 z-10'>
                    {table.getHeaderGroups().map((hg) => (
                        <tr key={hg.id}>
                            {hg.headers.map((header) => (
                                <th key={header.id} className='p-3 border-2 border-gray-800 bg-primary-3 text-white font-bold text-center'>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, rowIndex) => (
                        <tr
                            key={row.id}
                            ref={rowIndex === data.length - 1 ? ref : null}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className='p-3 border-2 border-gray-800 bg-primary-1 text-white text-center'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    )
}