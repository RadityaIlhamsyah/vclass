import { Separator } from '@/components/ui/separator';
import { Matkul } from '@/model/Matkul';
import { Link } from '@inertiajs/react';
// import { Link } from '@inertiajs/react';

interface Props {
    data: Matkul;
    onClick?: (e: React.MouseEvent) => void;
}

export default function CardCourse({ data }: Props) {
    return (
        <Link href={route('matkul.show', { matkulId: data.id })}>
            <div className="mt-10 cursor-pointer">
                <div className="flex overflow-hidden border border-gray-200 bg-white shadow-xl duration-100 hover:bg-gray-200 dark:bg-gray-800 sm:rounded-lg">
                    <div className="flex w-40 items-center justify-center">
                        <img
                            src={
                                data.dosen.image ?? '/images/default-image.jpg'
                            }
                            className="size-24 rounded-full"
                        />
                    </div>
                    <div className="w-full">
                        <div className="flex h-20 flex-col justify-center">
                            <p className="text-2xl">{data.nama_matkul}</p>
                            <p className="text-lg">{data.kelas}</p>
                        </div>
                        <Separator></Separator>
                        <div className="flex h-20 flex-col justify-center">
                            <p className="text-2xl">{data.dosen.nama_user}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
