import CardCourse from '@/components/cards/CardCourse';
import CardHeader from '@/components/cards/CardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Matkul } from '@/model/Matkul';
import { Inertia } from '@inertiajs/inertia';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function GabungKelas({ matkul }: { matkul: Matkul }) {
    const { data, setData, post } = useForm({
        kode_matkul: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('matkul.search'));
    };

    const enrollCourse = () => {
        console.log(matkul.id);
        Inertia.visit(route('matkul.show', { matkul: matkul.id }));
    };

    return (
        <SidebarLayout title="Gabung Kelas">
            <Head title="Gabung Kelas"></Head>
            <main className="container">
                <CardHeader>Gabung Kelas</CardHeader>
                <form onSubmit={submit}>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input
                            type="text"
                            placeholder="Input Kode"
                            value={data.kode_matkul}
                            onChange={(e) =>
                                setData('kode_matkul', e.target.value)
                            }
                        />
                        <Button type="submit">cari</Button>
                    </div>
                    {matkul && (
                        <CardCourse
                            key={data.kode_matkul}
                            data={matkul}
                            onClick={enrollCourse}
                        />
                    )}
                </form>
            </main>
        </SidebarLayout>
    );
}
