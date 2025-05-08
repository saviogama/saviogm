import { useTranslation } from 'react-i18next';
import { NavLink, Route, Routes } from 'react-router-dom';
import { LanguageSwitcher } from './components/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full px-4">
        <header className="py-4 flex justify-between items-center">
          <nav className="space-x-4">
            <NavLink className="text-base hover:opacity-75" to="/">
              {t('pages.home')}
            </NavLink>
            <NavLink className="text-base hover:opacity-75" to="/contact">
              {t('pages.contact')}
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>

        <main className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
