import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table'
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import type {
    FetchNextPageOptions,
} from "@tanstack/react-query";



type InfinityTableProps<T> = {
    data: T[];
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: (
        options?: FetchNextPageOptions | undefined,
    ) => Promise<any>;
    columns: ColumnDef<T>[]
}

export default function InfinityTable<T>({ data, columns, hasNextPage, isFetchingNextPage, fetchNextPage }: InfinityTableProps<T>) {
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
        <table className='w-full max-h-full'>
            <thead>
                {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id}>
                        {hg.headers.map((header) => (
                            <th key={header.id} className='p-3 rounded border-2 border-gray-800 bg-primary-3 text-white font-bold text-center'>
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
                            <td key={cell.id} className='p-3 rounded border-2 border-gray-800 bg-primary-1 text-white text-center'>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}