import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Matkul } from '@/model/Matkul';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function GabungKelasForm({ matkul }: { matkul: Matkul }) {
    const user = usePage().props.auth.user;
    const { post } = useForm({
        matkul_id: matkul.id,
        user_id: user.id,
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('matkul.enroll', { matkulId: matkul.id }));
    };
    return (
        <form action="" onSubmit={submit}>
            <Input type="hidden" value={matkul.id}></Input>
            <Input type="hidden" value={user.id}></Input>

            <Button type="submit">Gabung Kelas</Button>
        </form>
    );
}
