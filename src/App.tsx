import { useState } from 'react';
import { translations } from './translations';
import DataExplorer from './components/DataExplorer';
import DescriptiveTab from './components/DescriptiveTab';
import CorrelationTab from './components/CorrelationTab';
import PredictionTab from './components/PredictionTab';
import { Globe, BarChart3, Database, TrendingUp, Compass, Sigma, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<'en' | 'fa' | 'tr' | 'az'>('en');
  const [activeTab, setActiveTab] = useState<'explorer' | 'descriptive' | 'correlation' | 'prediction'>('explorer');

  const t = translations[currentLang];
  const isRtl = currentLang === 'fa';

  const menuItems = [
    { id: 'explorer', label: t.tabs.explorer, icon: Database, color: 'text-sky-500' },
    { id: 'descriptive', label: t.tabs.descriptive, icon: Sigma, color: 'text-emerald-500' },
    { id: 'correlation', label: t.tabs.correlation, icon: Compass, color: 'text-indigo-500' },
    { id: 'prediction', label: t.tabs.prediction, icon: TrendingUp, color: 'text-violet-500' }
  ] as const;

  return (
    <div 
      className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-gray-900 dark:text-gray-100 transition-colors duration-200"
      dir={isRtl ? 'rtl' : 'ltr'}
      id="app-container"
    >
      {/* Top Banner Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600"></div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        
        {/* Top Navbar Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-100 dark:border-gray-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 px-2.5 text-[10px] uppercase tracking-wider font-mono font-bold bg-gradient-to-r from-sky-500/10 to-indigo-500/10 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/60 rounded-full">
                Yaxın Şərq - خاورمیانه
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
              {t.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Multilingual key switcher */}
          <div className="flex items-center gap-2 bg-white dark:bg-gray-950 p-1.5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800/60 shrink-0 self-stretch md:self-auto justify-center">
            {(['en', 'fa', 'tr', 'az'] as const).map((lang) => {
              const langLabels = {
                en: { abbr: 'English', short: 'EN' },
                fa: { abbr: 'فارسی', short: 'FA' },
                tr: { abbr: 'Türkçe', short: 'TR' },
                az: { abbr: 'Azərbaycan', short: 'AZ' }
              };
              return (
                <button
                  key={lang}
                  id={`lang-btn-${lang}`}
                  onClick={() => setCurrentLang(lang)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 uppercase tracking-wider ${
                    currentLang === lang
                      ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                  title={langLabels[lang].abbr}
                >
                  <span className="hidden sm:inline">{langLabels[lang].abbr}</span>
                  <span className="sm:hidden">{langLabels[lang].short}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Tab Navigation Menu */}
        <nav className="flex overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-200 gap-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold rounded-2xl transition-all duration-200 whitespace-nowrap border ${
                  isActive
                    ? 'bg-white dark:bg-gray-950 text-gray-900 dark:text-white border-gray-200 dark:border-gray-800/80 shadow-sm font-extrabold'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white border-transparent hover:bg-white/50 dark:hover:bg-gray-950/30'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Active Dashboard Stage Container */}
        <main className="min-h-[450px] transition-all duration-300">
          {activeTab === 'explorer' && <DataExplorer currentLang={currentLang} />}
          {activeTab === 'descriptive' && <DescriptiveTab currentLang={currentLang} />}
          {activeTab === 'correlation' && <CorrelationTab currentLang={currentLang} />}
          {activeTab === 'prediction' && <PredictionTab currentLang={currentLang} />}
        </main>

        {/* Footer Area with credit lines */}
        <footer className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800/80 text-center text-[11px] font-mono text-gray-400 dark:text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            &copy; 2026 Middle East Developmental Statistical Laboratory
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Multilingual Database Engine in EN · فارسی · TR · AZ</span>
          </div>
        </footer>

      </div>
    </div>
  );
}

