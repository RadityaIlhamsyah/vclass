import Card from '@/components/cards/Card';
import CardHeaderMatkul from '@/components/cards/CardHeaderMatkul';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Matkul } from '@/model/Matkul';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Index({ matkul }: { matkul: Matkul }) {
    const { data, setData, post } = useForm({
        pertemuan: '',
        topik: '',
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        post(route('pertemuan.store', { matkulId: matkul.id }));
    };

    return (
        <SidebarLayout title="Buat Pertemuan">
            <Head title="Buat Pertemuan"></Head>
            <main className="container">
                <CardHeaderMatkul data={matkul} />
                <Card>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="pertemuan">Pertemuan</Label>
                            <Input
                                type="number"
                                id="pertemuan"
                                placeholder="Input Pertemuan..."
                                value={data.pertemuan}
                                onChange={(e) =>
                                    setData('pertemuan', e.target.value)
                                }
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="topik">Topik</Label>
                            <Input
                                type="text"
                                id="topik"
                                placeholder="Input Topik..."
                                value={data.topik}
                                onChange={(e) =>
                                    setData('topik', e.target.value)
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
