import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { TugasModel } from '@/model/Tugas';
import { User } from '@/model/User';
import { useForm } from '@inertiajs/react';
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { useState } from 'react';

export function TableNilai({ tugas }: { tugas: TugasModel[] }) {
    const { data, setData, patch } = useForm({
        nilai: null as number | null,
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    const openDialog = (taskId: string, currentNilai: number | null) => {
        setSelectedTaskId(taskId);
        setData('nilai', currentNilai);
        setIsDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data.nilai);

        if (selectedTaskId && data.nilai !== null) {
            patch(
                route('tugas.update', {
                    matkulId: tugas[0].matkul.id,
                    pertemuanId: tugas[0].pertemuan_id,
                    tugasId: selectedTaskId,
                }),
                {
                    preserveState: true,
                    onSuccess: () => {
                        console.log('Nilai berhasil diperbarui');
                        setIsDialogOpen(false);
                        setSelectedTaskId(null);
                    },
                },
            );
        } else {
            console.error('No task selected or nilai is empty');
        }
    };

    const columns: ColumnDef<TugasModel>[] = [
        {
            accessorKey: 'user',
            header: 'Nama Murid',
            cell: ({ row }) => {
                const user = row.getValue('user') as User;
                return <div className="text-sm">{user?.nama_user || '-'}</div>;
            },
        },
        {
            accessorKey: 'user',
            header: 'NPM',
            cell: ({ row }) => {
                const user = row.getValue('user') as User;
                return <div className="text-sm">{user?.npm || '-'}</div>;
            },
        },
        {
            accessorKey: 'tugas',
            header: 'Tugas',
            cell: ({ row }) => {
                const tugas = row.getValue('tugas') as string;
                return (
                    <div
                        className="card-body"
                        dangerouslySetInnerHTML={{
                            __html: tugas
                                .replace(
                                    /<h1>/g,
                                    '<h1 class="text-2xl font-bold text-gray-800">',
                                )
                                .replace(
                                    /<h2>/g,
                                    '<h2 class="text-xl font-semibold text-gray-800">',
                                )
                                .replace(
                                    /<p>/g,
                                    '<p class="text-md text-gray-800">',
                                )
                                .replace(
                                    /<ul>/g,
                                    '<ul class="list-inside list-decimal text-gray-800">',
                                )
                                .replace(
                                    /<ol>/g,
                                    '<ol class="list-inside list-decimal text-gray-800">',
                                )
                                .replace(/<li>/g, '<li class="py-1">'),
                        }}
                    />
                );
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <div className="capitalize">
                    {row.getValue('status') ? 'Hadir' : 'Tidak Hadir'}
                </div>
            ),
        },
        {
            accessorKey: 'nilai',
            header: 'Nilai',
            cell: ({ row }) => {
                const nilai = row.getValue('nilai') as number | null;
                return (
                    <div className="flex items-center">
                        <span className="text-sm">
                            {nilai !== null ? nilai : 'N/A'}
                        </span>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const taskId = row.original.id.toString();
                const nilai = row.getValue('nilai') as number | null;
                return (
                    <Button
                        variant="link"
                        className="text-blue-700"
                        onClick={() => openDialog(taskId, nilai)}
                    >
                        Input Nilai
                    </Button>
                );
            },
        },
    ];

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const table = useReactTable({
        data: tugas,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { sorting },
    });

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="rounded-md bg-white p-4">
                        <h2 className="text-lg font-semibold">Update Nilai</h2>
                        <form onSubmit={submit}>
                            <Input
                                type="number"
                                value={data.nilai ?? ''}
                                onChange={(e) =>
                                    setData('nilai', Number(e.target.value))
                                }
                                className="mt-2 w-full"
                            />
                            <div className="mt-4 flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className="ml-2"
                                >
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
