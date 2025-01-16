import HeaderOne from '@/components/headers/HeaderOne';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';

export default function Show({ pertemuan }: { pertemuan: number }) {
    return (
        <SidebarLayout title="Forum">
            <Head title="Forum"></Head>
            <main className="container">
                <HeaderOne>{`Pertemuan ${pertemuan}`}</HeaderOne>
            </main>
        </SidebarLayout>
    );
}
