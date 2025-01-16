import { create } from 'zustand';

interface KategoriStore {
    kategori: string;
    setKategori: (kategori: string) => void;
}

export const useKategori = create<KategoriStore>((set) => ({
    kategori: '',
    setKategori: (kategori) => set({ kategori }),
}));
