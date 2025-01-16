import HeaderOne from '@/components/headers/HeaderOne';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';

export default function Show({ pertemuan }: { pertemuan: string }) {
    return (
        <SidebarLayout title="Tugas">
            <Head title="Tugas"></Head>
            <main className="container">
                <HeaderOne>{`Pertemuan ${pertemuan}`}</HeaderOne>
            </main>
        </SidebarLayout>
    );
}
