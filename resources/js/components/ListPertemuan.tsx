import { Link as LinkIcon } from 'lucide-react';

import { PertemuanModel } from '@/model/Pertemuan';
import { Link } from '@inertiajs/react';

export default function ListPertemuan({ data }: { data: PertemuanModel }) {
    const kategori = window.location.pathname.split('/')[3];
    return (
        <Link
            className="rounded-lg bg-gray-200 hover:bg-gray-300"
            href={route(`${kategori}.index`, {
                pertemuanId: data.id,
                matkulId: data.matkul_id,
            })}
        >
            <div className="flex h-full w-full cursor-pointer gap-5 p-4">
                <LinkIcon></LinkIcon>
                <p className="text-lg font-semibold">
                    {'Pertemuan ' + data.pertemuan + ' - ' + data.topik}
                </p>
            </div>
        </Link>
    );
}
