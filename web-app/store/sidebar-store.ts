'use client';

import { create } from 'zustand';

type SidebarStore = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));