
export const translations = {
  main: {
    en: () => import('./main/en.json'),
    ru: () => import('./main/ru.json')
  }
};

export const DEFAULT_LANGUAGE = 'en';