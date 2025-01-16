import { Matkul } from '@/model/Matkul';
import HeaderOne from '../headers/HeaderOne';

export default function CardHeaderMatkul({ data }: { data: Matkul }) {
    return (
        <div className="h-36 w-full rounded-lg bg-gray-400 bg-matkul-bg-pattern bg-cover">
            <div className="mx-5 flex h-full w-full flex-col justify-center">
                <HeaderOne>{data.nama_matkul}</HeaderOne>
                <p className="text-sm">{data.kode_matkul}</p>
            </div>
        </div>
    );
}
