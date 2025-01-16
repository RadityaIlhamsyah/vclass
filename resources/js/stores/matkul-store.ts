import { Matkul } from '@/model/Matkul';
import { create } from 'zustand';

interface MatkulStore {
    matkul: Matkul[];
    setMatkul: (matkul: Matkul[]) => void;
}

export const useMatkul = create<MatkulStore>((set) => ({
    matkul: [],
    setMatkul: (matkul) => set({ matkul }),
}));
