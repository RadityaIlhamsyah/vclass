import CardCourse from '@/components/cards/CardCourse';
import CardHeader from '@/components/cards/CardHeader';
import { saveMatkul } from '@/indexedDB';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Matkul } from '@/model/Matkul';
import { Head } from '@inertiajs/react';

export default function Dashboard({ matkul }: { matkul: Matkul[] }) {
    matkul.forEach((data) => {
        saveMatkul(data).catch((error) =>
            console.error('Error saving matkul:', error),
        );
    });

    return (
        <SidebarLayout title="Dashboard">
            <Head title="Dashboard" />
            <main className="container">
                <CardHeader>Kelas Saya</CardHeader>
                {matkul.map((data, i) => (
                    <CardCourse key={i} data={data} />
                ))}
            </main>
        </SidebarLayout>
    );
}
