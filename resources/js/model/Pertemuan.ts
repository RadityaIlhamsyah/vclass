import { Matkul } from './Matkul';

export interface PertemuanModel {
    id: number;
    matkul: Matkul;
    matkul_id: number;
    pertemuan: number;
    topik: string;
    created_at: string;
    updated_at: string;
}
