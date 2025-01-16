import CardForumChat from '@/components/cards/CardForumChat';
import ErrorMessage from '@/components/ErrorMessage';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { ForumModel } from '@/model/Forum';
import { PertemuanModel } from '@/model/Pertemuan';
import { Head, useForm } from '@inertiajs/react';
import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';

import CardHeader from '@/components/cards/CardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import 'quill/dist/quill.snow.css';

export default function Index({
    forum,
    pertemuan,
}: {
    forum: ForumModel[];
    pertemuan: PertemuanModel;
}) {
    const quillRef = useRef(null);
    const quillInstance = useRef<Quill | null>(null);
    const { data, setData, post, patch, processing } = useForm({
        pesan: '',
    });

    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
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
                setData('pesan', quill.root.innerHTML);
            });
        }
    }, [setData]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editingId) {
            patch(
                route('forum.update', {
                    pertemuanId: pertemuan.id,
                    matkulId: pertemuan.matkul_id,
                    forumId: editingId,
                }),
                {
                    onSuccess: () => {
                        if (quillInstance.current) {
                            quillInstance.current.root.innerHTML = '';
                            setData('pesan', '');
                        }
                        setEditingId(null);
                    },
                },
            );
        } else {
            post(
                route('forum.store', {
                    pertemuanId: pertemuan.id,
                    matkulId: pertemuan.matkul_id,
                }),
                {
                    onSuccess: () => {
                        if (quillInstance.current) {
                            quillInstance.current.root.innerHTML = '';
                            setData('pesan', '');
                        }
                    },
                },
            );
        }
    };

    const handleEdit = (pesan: string, id: number) => {
        setEditingId(id);
        setData('pesan', pesan);
        if (quillInstance.current) {
            quillInstance.current.root.innerHTML = pesan;
        }
    };

    return (
        <SidebarLayout title="Forum">
            <Head title=" Forum" />
            <main className="container">
                <CardHeader>{`Pertemuan ${pertemuan.pertemuan}`}</CardHeader>

                {forum && forum.length > 0 ? (
                    forum.map((data) => (
                        <CardForumChat
                            data={data}
                            key={data.id}
                            onEdit={handleEdit}
                        />
                    ))
                ) : (
                    <ErrorMessage message="Tidak ada forum" />
                )}

                <div className="mb-4">
                    <div ref={quillRef} style={{ minHeight: '300px' }}></div>
                    <form onSubmit={submit} className="space-y-4">
                        <Input
                            type="hidden"
                            name="pesan"
                            id="pesan"
                            value={data.pesan}
                        />
                        <Button
                            type="submit"
                            className="rounded"
                            disabled={processing}
                        >
                            {processing ? 'Mengirim...' : 'Kirim'}
                        </Button>
                    </form>
                </div>
            </main>
        </SidebarLayout>
    );
}
