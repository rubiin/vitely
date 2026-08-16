import { Ref } from 'vue';

export type ThemeId =
  | 'light'
  | 'tokyo-night'
  | 'everforest'
  | 'darcula'
  | 'cyberpunk'
  | 'nord'
  | 'catppuccin';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  dot: string;
}

export const THEMES: ThemeOption[] = [
  { id: 'light', label: 'Light', dot: '#0f766e' },
  { id: 'tokyo-night', label: 'Tokyo Night', dot: '#7aa2f7' },
  { id: 'everforest', label: 'Everforest', dot: '#a7c080' },
  { id: 'darcula', label: 'Darcula', dot: '#589df6' },
  { id: 'cyberpunk', label: 'Cyberpunk', dot: '#ff2a6d' },
  { id: 'nord', label: 'Nord', dot: '#88c0d0' },
  { id: 'catppuccin', label: 'Catppuccin', dot: '#cba6f7' },
];

const STORAGE_KEY = 'vitely-theme';

export interface ThemeComposition {
  theme: Ref<ThemeId>;
  setTheme: (id: ThemeId) => void;
}

function isThemeId(value: string | null): value is ThemeId {
  return !!value && THEMES.some(t => t.id === value);
}

export function useTheme(): ThemeComposition {
  const stored =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem(STORAGE_KEY)
      : null;
  const theme = ref<ThemeId>(isThemeId(stored) ? stored : 'tokyo-night');

  const applyTheme = (id: ThemeId) => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = id;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, id);
    }
  };

  // apply immediately so the theme is correct on first render
  applyTheme(theme.value);

  watch(theme, id => {
    applyTheme(id);
  });

  const setTheme = (id: ThemeId) => {
    theme.value = id;
  };

  return {
    theme,
    setTheme,
  };
}
