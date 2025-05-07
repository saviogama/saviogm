import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <button
      aria-label="Language switcher"
      className="w-10 h-10 flex items-center justify-center text-sm font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
      onClick={() => i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt')}
    >
      {i18n.language === 'pt' ? 'EN' : 'PT'}
    </button>
  );
}
