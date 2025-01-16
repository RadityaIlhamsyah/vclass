import { create } from 'zustand';

interface DeadlineStore {
    deadline: Date | undefined;
    setDeadline: (deadline: Date | undefined) => void;
}

export const useDeadline = create<DeadlineStore>((set) => ({
    deadline: undefined,
    setDeadline: (deadline: Date | undefined) => set({ deadline }),
}));
