import { User } from './User';

// Interface untuk Matkul
export interface Matkul {
    id: number;
    dosen: User;
    nama_matkul: string;
    kode_matkul: string;
    kelas: string;
    created_at: string;
    updated_at: string;
}
