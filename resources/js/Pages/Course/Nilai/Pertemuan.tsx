import CardHeaderMatkul from '@/components/cards/CardHeaderMatkul';
import CardLinkMatkul from '@/components/cards/CardLinkMatkul';
import ErrorMessage from '@/components/ErrorMessage';
import ListPertemuan from '@/components/ListPertemuan';
import { Button } from '@/components/ui/button';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Matkul } from '@/model/Matkul';
import { PertemuanModel } from '@/model/Pertemuan';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Pertemuan({
    pertemuan,
    matkul,
}: {
    pertemuan: PertemuanModel[];
    matkul: Matkul;
}) {
    const user = usePage().props.auth.user;
    console.log(pertemuan);
    return (
        <SidebarLayout title="Nilai">
            <Head title="Nilai"></Head>
            <main className="container">
                <CardHeaderMatkul data={matkul} />
                <CardLinkMatkul>
                    {pertemuan.length > 0 ? (
                        pertemuan.map((data, index) => (
                            <ListPertemuan data={data} key={index} />
                        ))
                    ) : (
                        <ErrorMessage message="Tidak ada pertemuan" />
                    )}
                </CardLinkMatkul>
                {user.role === 'guru' && (
                    <div className="mt-4">
                        <Link
                            href={route('pertemuan.index', matkul.id)}
                            className="mt-4"
                        >
                            <Button>buat pertemuan</Button>
                        </Link>
                    </div>
                )}
            </main>
        </SidebarLayout>
    );
}
