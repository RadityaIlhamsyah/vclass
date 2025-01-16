import CardHeaderMatkul from '@/components/cards/CardHeaderMatkul';
import { Button } from '@/components/ui/button';
import { removeMatkul } from '@/indexedDB';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Matkul } from '@/model/Matkul';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/react';
import GabungKelasForm from './Partials/GabungKelasForm';

export default function Course({
    matkul,
    enrollStatus,
}: {
    matkul: Matkul;
    enrollStatus: boolean;
}) {
    const user = usePage().props.auth.user;

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this course?')) {
            try {
                Inertia.delete(route('matkul.destroy', [matkul.id]));
                await removeMatkul(matkul.id);
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    return (
        <SidebarLayout title="Course">
            <Head title="Course" />
            <main className="container">
                <CardHeaderMatkul data={matkul} />
                {enrollStatus && (
                    <div className="flex gap-4">
                        <Link href={route('forum.pertemuan', [matkul.id])}>
                            <Button>Forum</Button>
                        </Link>

                        <Link href={route('tugas.pertemuan', [matkul.id])}>
                            <Button>Tugas</Button>
                        </Link>

                        {user.role === 'guru' && (
                            <>
                                <Link
                                    href={route('nilai.pertemuan', [matkul.id])}
                                >
                                    <Button>Nilai</Button>
                                </Link>
                                <Button
                                    variant={'link'}
                                    className="cursor-pointer text-red-500 underline hover:text-red-700"
                                    onClick={handleDelete}
                                >
                                    Hapus Kelas
                                </Button>
                            </>
                        )}
                    </div>
                )}

                {!enrollStatus && <GabungKelasForm matkul={matkul} />}
            </main>
        </SidebarLayout>
    );
}
