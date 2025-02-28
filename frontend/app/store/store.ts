import { create } from 'zustand';
import { createThemeSlice, type ThemeSlice } from './themeSlice';
import { persist } from 'zustand/middleware';
import type { ReactNode } from 'react';

export type PersistedStoreState = ThemeSlice & {};

export const usePersistedStore = create<PersistedStoreState>()(
	persist(
		(...a) => ({
			...createThemeSlice(...a),
		}),
		{ name: 'store' }
	)
);

export type Toast = {
	msg?: string;
	html?: ReactNode;
	open?: boolean;
	level?: ToastLevel;
	timeout?: number;
};

export type ToastLevel = 'error' | 'success' | 'info';

export const toastDefault: Toast = {
	level: 'info',
	timeout: 5000,
};

export type MainStore = {
	inputFocused: boolean;
	focusInput: (s: boolean) => void;

	settingsDropdownOpen: boolean;
	setSettingsDropdownOpen: (open: boolean) => void;

	profileDialogOpen: boolean;
	setProfileDialogOpen: (open: boolean) => void;

	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;

	bottomDrawerOpen: boolean;
	setBottomDrawerOpen: (open: boolean) => void;

	messagesTimestamp: number;
	setMessagesTimestamp: (timestamp: number) => void;

	toast: Toast;
	setToast: (toast: Toast) => void;

	loginDialogOpen: boolean;
	setLoginDialogOpen: (open: boolean) => void;
};

export const useMainStore = create<MainStore>((set) => ({
	inputFocused: false,
	focusInput: (s) => set(() => ({ inputFocused: s })),

	settingsDropdownOpen: false,
	setSettingsDropdownOpen: (open: boolean) => set(() => ({ settingsDropdownOpen: open })),

	profileDialogOpen: false,
	setProfileDialogOpen: (open: boolean) => set(() => ({ profileDialogOpen: open })),

	sidebarOpen: false,
	setSidebarOpen: (open: boolean) => set(() => ({ sidebarOpen: open })),

	bottomDrawerOpen: false,
	setBottomDrawerOpen: (open: boolean) => set(() => ({ bottomDrawerOpen: open })),

	messagesTimestamp: 0,
	setMessagesTimestamp: (timestamp: number) => set(() => ({ messagesTimestamp: timestamp })),

	toast: { ...toastDefault, open: false },
	setToast: (toast: Toast) =>
		set(() => ({
			toast: { ...toastDefault, open: true, ...toast },
		})),

	loginDialogOpen: false,
	setLoginDialogOpen: (open: boolean) => set(() => ({ loginDialogOpen: open })),
}));
