import CardHeader from '@/components/cards/CardHeader';
import { TableNilai } from '@/components/tables/TableNilai';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { PertemuanModel } from '@/model/Pertemuan';
import { TugasModel } from '@/model/Tugas';
import { Head } from '@inertiajs/react';

export default function Index({
    tugas,
    pertemuan,
}: {
    tugas: TugasModel[];
    pertemuan: PertemuanModel;
}) {
    console.log(tugas);
    return (
        <SidebarLayout title="Nilai">
            <Head title=" Nilai" />
            <main className="container">
                <CardHeader>{`Pertemuan ${pertemuan.pertemuan}`}</CardHeader>
                <TableNilai tugas={tugas}></TableNilai>
            </main>
        </SidebarLayout>
    );
}
