import { TugasModel } from '@/model/Tugas';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { MouseEvent } from 'react';

import { Button } from '@/components/ui/button';

export default function CardTugasChat({
    data,
    onEdit,
}: {
    data: TugasModel;
    onEdit: (tugas: string, id: number, deadline: Date) => void;
}) {
    const user = usePage().props.auth.user;
    return (
        <div className="mb-4 rounded-lg bg-white p-4 shadow-md">
            <div className="mb-2 flex items-center">
                <img
                    src={data.user.image ?? '/images/default-image.jpg'}
                    alt={data.user.nama_user}
                    className="mr-4 h-12 w-12 rounded-full"
                />

                <div>
                    <h3 className="text-lg font-semibold">
                        {data.user?.nama_user || 'Nama tidak tersedia'}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {data.user?.npm || 'NPM tidak tersedia'}
                    </p>
                    <p className="text-sm text-red-500">
                        {data.deadline
                            ? `Deadline: ${new Date(
                                  data.deadline,
                              ).toLocaleString()}`
                            : ''}
                    </p>

                    <p className="text-sm text-gray-500">
                        {data.user?.role || 'Role tidak tersedia'}
                    </p>
                </div>
            </div>

            <div
                className="card-body"
                dangerouslySetInnerHTML={{
                    __html: data.tugas
                        .replace(
                            /<h1>/g,
                            '<h1 class="text-2xl font-bold text-gray-800">',
                        )
                        .replace(
                            /<h2>/g,
                            '<h2 class="text-xl font-semibold text-gray-800">',
                        )
                        .replace(/<p>/g, '<p class="text-md text-gray-800">')
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

            {data.user?.id === user.id && (
                <div className="mt-2 flex justify-end gap-4">
                    <Button
                        variant={'link'}
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            onEdit(data.tugas, data.id, data.deadline);
                        }}
                        className="text-sm font-medium text-blue-500 hover:text-blue-700"
                    >
                        Edit
                    </Button>
                    <Button
                        variant={'link'}
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            Inertia.delete(
                                route('tugas.destroy', {
                                    matkulId: data.matkul_id,
                                    pertemuanId: data.pertemuan.id,
                                    tugasId: data.id,
                                }),
                            );
                        }}
                        className="text-sm font-medium text-red-500 hover:text-red-700"
                    >
                        Hapus
                    </Button>
                </div>
            )}

            <div className="mt-2 text-xs text-gray-400">
                <p>{new Date(data.created_at).toLocaleString()}</p>
            </div>
        </div>
    );
}
