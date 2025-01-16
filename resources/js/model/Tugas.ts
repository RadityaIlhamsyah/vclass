import { Matkul } from './Matkul';
import { PertemuanModel } from './Pertemuan';
import { User } from './User';

export interface TugasModel {
    id: number;
    matkul_id: number;
    matkul: Matkul;
    pertemuan: PertemuanModel;
    pertemuan_id: number;
    tugas: string;
    user: User;
    nilai: number;
    status: string;
    user_id: number;
    deadline: Date;
    created_at: Date;
    updated_at: Date;
}
