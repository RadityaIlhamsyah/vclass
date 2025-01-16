import CardHeader from '@/components/cards/CardHeader';
import CardTugasChat from '@/components/cards/CardTugasChat';
import { DateTimePicker } from '@/components/date/DateTimePicker';
import ErrorMessage from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { PertemuanModel } from '@/model/Pertemuan';
import { TugasModel } from '@/model/Tugas';
import { useDeadline } from '@/stores/deadline-store';
import { Head, useForm, usePage } from '@inertiajs/react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';

export default function Index({
    tugas,
    pertemuan,
}: {
    tugas: TugasModel[];
    pertemuan: PertemuanModel;
}) {
    const quillRef = useRef(null);
    const quillInstance = useRef<Quill | null>(null);
    const { deadline, setDeadline } = useDeadline();
    const { data, setData, post, patch, processing } = useForm({
        tugas: '',
        deadline: deadline,
    });

    const [editingId, setEditingId] = useState<number | null>(null);
    const user = usePage().props.auth.user;

    useEffect(() => {
        setData('deadline', deadline);
        if (quillRef.current && !quillInstance.current) {
            const quill = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: '1' }, { header: '2' }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['bold', 'italic', 'underline'],
                        ['link'],
                        [{ align: [] }],
                        ['image'],
                        ['blockquote', 'code-block'],
                    ],
                },
            });

            quillInstance.current = quill;

            quill.on('text-change', () => {
                setData('tugas', quill.root.innerHTML);
            });
        }
    }, [setData, deadline]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editingId) {
            patch(
                route('tugas.update', {
                    pertemuanId: pertemuan.id,
                    matkulId: pertemuan.matkul_id,
                    tugasId: editingId,
                }),
                {
                    onSuccess: () => {
                        if (quillInstance.current) {
                            quillInstance.current.root.innerHTML = '';
                            setData('tugas', '');
                        }
                        setEditingId(null);
                    },
                },
            );
        } else {
            post(
                route('tugas.store', {
                    pertemuanId: pertemuan.id,
                    matkulId: pertemuan.matkul_id,
                }),
                {
                    onSuccess: () => {
                        if (quillInstance.current) {
                            quillInstance.current.root.innerHTML = '';
                            setData('tugas', '');
                            setDeadline(undefined);
                        }
                    },
                },
            );
        }
    };

    const handleEdit = (tugas: string, id: number, deadline: Date) => {
        setEditingId(id);
        setData('tugas', tugas);
        if (deadline) {
            setDeadline(new Date(deadline));
        }
        if (quillInstance.current) {
            quillInstance.current.root.innerHTML = tugas;
        }
    };

    return (
        <SidebarLayout title="Tugas">
            <Head title=" Tugas" />
            <main className="container">
                <CardHeader>{`Pertemuan ${pertemuan.pertemuan}`}</CardHeader>

                {tugas && tugas.length > 0 ? (
                    tugas.map((data) => {
                        const isGuru = data.user.role === 'guru';
                        const isGuruLogin = user.role === 'guru';
                        const isCurrentUser = data.user_id === user.id;

                        if (isGuru || isCurrentUser) {
                            return (
                                <CardTugasChat
                                    data={data}
                                    key={data.id}
                                    onEdit={() =>
                                        handleEdit(
                                            data.tugas,
                                            data.id,
                                            data.deadline,
                                        )
                                    }
                                />
                            );
                        } else if (isGuruLogin) {
                            return (
                                <CardTugasChat
                                    data={data}
                                    key={data.id}
                                    onEdit={() =>
                                        handleEdit(
                                            data.tugas,
                                            data.id,
                                            data.deadline,
                                        )
                                    }
                                />
                            );
                        }

                        return null;
                    })
                ) : (
                    <ErrorMessage message="Tidak ada tugas" />
                )}

                <div className="mb-4">
                    <div ref={quillRef} style={{ minHeight: '300px' }}></div>
                    <form onSubmit={submit} className="mt-4 space-y-4">
                        {user.role === 'guru' && (
                            <div>
                                <DateTimePicker></DateTimePicker>
                            </div>
                        )}
                        <div>
                            <Input
                                type="hidden"
                                name="tugas"
                                id="tugas"
                                value={data.tugas}
                            />

                            <Button
                                type="submit"
                                className="rounded"
                                disabled={processing}
                            >
                                {processing ? 'Mengirim...' : 'Kirim'}
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </SidebarLayout>
    );
}
