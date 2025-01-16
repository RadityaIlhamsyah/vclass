import Card from '@/components/cards/Card';
import CardHeader from '@/components/cards/CardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function BuatKelas() {
    const { data, setData, post } = useForm({
        kelas: '',
        nama_matkul: '',
    });
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);

        post(route('matkul.store'));
    };
    return (
        <SidebarLayout title="Buat Kelas">
            <Head title="Buat Kelas"></Head>

            <main className="container">
                <CardHeader>Buat Kelas</CardHeader>
                <Card>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="kelas">Kelas</Label>
                            <Input
                                type="text"
                                id="kelas"
                                placeholder="Input Kelas..."
                                value={data.kelas}
                                onChange={(e) =>
                                    setData('kelas', e.target.value)
                                }
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="matkul">Mata Kuliah</Label>
                            <Input
                                type="Text"
                                id="matkul"
                                placeholder="Input Mata Kuliah..."
                                value={data.nama_matkul}
                                onChange={(e) =>
                                    setData('nama_matkul', e.target.value)
                                }
                            />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Card>
            </main>
        </SidebarLayout>
    );
}
