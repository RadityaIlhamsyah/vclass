import { Matkul } from '@/model/Matkul';

export interface User {
    id: number;
    nama_user: string;
    image: string;
    email: string;
    role: string;
    npm: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    matkul: Matkul[];
};
