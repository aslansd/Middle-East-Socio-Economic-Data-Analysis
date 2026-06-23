import { useState } from 'react';
import { mideastData, countryList, indicatorList, yearsList, CountryID, IndicatorID } from '../data/mideastData';
import { translations } from '../translations';
import CustomChart from './CustomChart';
import { TrendingUp, Globe, BarChart2 } from 'lucide-react';

interface DataExplorerProps {
  currentLang: 'en' | 'fa' | 'tr' | 'az';
}

export default function DataExplorer({ currentLang }: DataExplorerProps) {
  const t = translations[currentLang];
  const [selectedCountry, setSelectedCountry] = useState<CountryID>('TUR');
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorID>('gdp');

  // Prepare line chart data: metric over years for selected country
  const countryObj = mideastData.find(c => c.id === selectedCountry);
  const chartData = countryObj
    ? countryObj.years.map(y => ({
        label: y.year.toString(),
        value: y.indicators[selectedIndicator]
      }))
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="explorer-view">
      {/* Controls & Mini Stats Card */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-500" />
            {t.labels.selectCountry}
          </h3>
          
          <div className="grid grid-cols-2 gap-2 mb-6">
            {countryList.map(cId => (
              <button
                key={cId}
                id={`btn-country-${cId}`}
                onClick={() => setSelectedCountry(cId)}
                className={`py-2 px-3 text-xs font-semibold rounded-xl text-left transition-all duration-200 border ${
                  selectedCountry === cId
                    ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800/60 shadow-sm'
                    : 'bg-gray-50/50 dark:bg-gray-900/40 text-gray-600 dark:text-gray-400 border-transparent hover:bg-gray-100 dark:hover:bg-gray-800/80'
                }`}
              >
                <div className="text-[10px] text-gray-400 font-mono font-semibold">{cId}</div>
                <div className="truncate">{t.countries[cId]}</div>
              </button>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-violet-500" />
            {t.labels.selectIndicator}
          </h3>

          <div className="flex flex-col gap-1.5">
            {indicatorList.map(indId => (
              <button
                key={indId}
                id={`btn-indicator-${indId}`}
                onClick={() => setSelectedIndicator(indId)}
                className={`w-full py-2.5 px-3 text-xs font-medium rounded-xl text-left transition-all duration-200 flex justify-between items-center border ${
                  selectedIndicator === indId
                    ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800/60 shadow-sm'
                    : 'bg-gray-50/20 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/60'
                }`}
              >
                <span className="truncate pr-2">{t.indicators[indId]}</span>
                <span className="text-[10px] font-mono shrink-0 py-0.5 px-1.5 bg-gray-100 dark:bg-gray-800/80 text-gray-500 rounded-md">
                  {t.indicatorUnits[indId]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Info Card explaining structural development parameters */}
        <div className="bg-gradient-to-br from-gray-50/50 to-gray-100/30 dark:from-gray-950/40 dark:to-gray-900/20 p-5 rounded-2xl border border-gray-100/80 dark:border-gray-800/60 flex flex-col">
          <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
            {t.labels.resultInterpretation}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {selectedIndicator === 'gdp' && t.interpretations.gdpLifeExp}
            {selectedIndicator === 'lifeExp' && t.interpretations.gdpLifeExp}
            {selectedIndicator === 'literacy' && t.interpretations.gdpLiteracy}
            {selectedIndicator === 'co2' && t.interpretations.gdpCo2}
            {selectedIndicator === 'femaleLabor' && t.interpretations.femaleLaborUrban}
            {selectedIndicator === 'urban' && t.interpretations.femaleLaborUrban}
          </p>
        </div>
      </div>

      {/* Historical Trend Drawing & Full Data Matrix */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <div className="mb-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-sky-500 uppercase bg-sky-50 dark:bg-sky-950/40 py-1 px-2.5 rounded-full">
              {t.countries[selectedCountry]}
            </span>
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-2">
              {t.indicators[selectedIndicator]} {t.tabs.prediction} (2012 - 2024)
            </h2>
          </div>

          <div className="h-auto">
            <CustomChart
              type="line"
              data={chartData}
              xLabel={t.labels.year}
              yLabel={t.indicators[selectedIndicator]}
              unitY={t.indicatorUnits[selectedIndicator]}
              activeColor={selectedIndicator === 'gdp' ? '#0EA5E9' : selectedIndicator === 'lifeExp' ? '#10B981' : '#8B5CF6'}
            />
          </div>
        </div>

        {/* Data Matrix Grid representation */}
        <div className="bg-white dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800/80">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {t.countries[selectedCountry]} - {t.labels.details}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" id="data-explorer-table">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-900/40 text-gray-400 uppercase font-mono text-[9px] tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="py-3.5 px-6 font-semibold">{t.labels.year}</th>
                  <th id="hdr-gdp" className="py-3.5 px-4 font-semibold text-right">{t.indicators.gdp}</th>
                  <th id="hdr-life" className="py-3.5 px-4 font-semibold text-right">{t.indicators.lifeExp}</th>
                  <th id="hdr-lit" className="py-3.5 px-4 font-semibold text-right">{t.indicators.literacy}</th>
                  <th id="hdr-labor" className="py-3.5 px-4 font-semibold text-right">{t.indicators.femaleLabor}</th>
                  <th id="hdr-urb" className="py-3.5 px-4 font-semibold text-right">{t.indicators.urban}</th>
                  <th id="hdr-co2" className="py-3.5 px-6 font-semibold text-right">{t.indicators.co2}</th>
                </tr>
              </thead>
              <tbody>
                {countryObj?.years.map((yData, idx) => (
                  <tr 
                    key={yData.year} 
                    className={`border-b last:border-none border-gray-50 dark:border-gray-800/20 hover:bg-gray-50/20 dark:hover:bg-gray-900/30 text-xs font-mono text-gray-600 dark:text-gray-300 ${
                      idx % 2 === 1 ? 'bg-gray-50/10 dark:bg-gray-900/5' : ''
                    }`}
                  >
                    <td id={`cell-year-${yData.year}`} className="py-3 px-6 font-semibold text-gray-800 dark:text-gray-200">{yData.year}</td>
                    <td id={`cell-gdp-${yData.year}`} className="py-3 px-4 text-right">${yData.indicators.gdp.toLocaleString()}</td>
                    <td id={`cell-life-${yData.year}`} className="py-3 px-4 text-right">{yData.indicators.lifeExp} {t.indicatorUnits.lifeExp}</td>
                    <td id={`cell-lit-${yData.year}`} className="py-3 px-4 text-right">{yData.indicators.literacy}%</td>
                    <td id={`cell-labor-${yData.year}`} className="py-3 px-4 text-right">{yData.indicators.femaleLabor}%</td>
                    <td id={`cell-urb-${yData.year}`} className="py-3 px-4 text-right">{yData.indicators.urban}%</td>
                    <td id={`cell-co2-${yData.year}`} className="py-3 px-6 text-right">{yData.indicators.co2} {t.indicatorUnits.co2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-gray-50/40 dark:bg-gray-950/20 border-t border-gray-100 dark:border-gray-800 text-[10px] text-gray-400 font-medium">
            {t.labels.gdpWarning}
          </div>
        </div>
      </div>
    </div>
  );
}
