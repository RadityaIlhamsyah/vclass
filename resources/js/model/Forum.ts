import { PertemuanModel } from './Pertemuan';
import { User } from './User';

// Interface untuk data utama
export interface ForumModel {
    id: number;
    matkul_id: number;
    pertemuan: PertemuanModel;
    pesan: string;
    user: User;
    siswa_id: number;
    created_at: Date;
    updated_at: Date;
}
