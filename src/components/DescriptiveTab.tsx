import { useState } from 'react';
import { mideastData, countryList, indicatorList, yearsList, CountryID, IndicatorID } from '../data/mideastData';
import { translations } from '../translations';
import { calculateDescriptiveStats } from '../utils/mathUtils';
import CustomChart from './CustomChart';
import { Sigma, Calculator } from 'lucide-react';

interface DescriptiveTabProps {
  currentLang: 'en' | 'fa' | 'tr' | 'az';
}

export default function DescriptiveTab({ currentLang }: DescriptiveTabProps) {
  const t = translations[currentLang];
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorID>('gdp');
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(true);

  // Extract the raw indicator values across all countries for the selected year
  const rawDataPoints = countryList.map(cId => {
    const countryObj = mideastData.find(c => c.id === cId);
    const yearObj = countryObj?.years.find(y => y.year === selectedYear);
    const val = yearObj ? yearObj.indicators[selectedIndicator] : 0;
    return {
      countryId: cId,
      countryName: t.countries[cId],
      value: val
    };
  });

  const valuesOnly = rawDataPoints.map(d => d.value);
  const stats = calculateDescriptiveStats(valuesOnly);

  // Prepare chart data
  const chartData = rawDataPoints.map(dp => ({
    label: dp.countryId,
    value: dp.value
  }));

  // Sorted items for Median calculation explanation
  const sortedRawPoints = [...rawDataPoints].sort((a, b) => a.value - b.value);

  // Active theme color
  const activeColor = selectedIndicator === 'gdp' ? '#0EA5E9' : selectedIndicator === 'lifeExp' ? '#10B981' : '#8B5CF6';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="descriptive-view">
      {/* Sidebar Controls */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-500" />
            {t.labels.selectYear}
          </h3>

          <div className="flex flex-wrap gap-2 mb-6">
            {yearsList.map(yr => (
              <button
                key={yr}
                id={`btn-year-${yr}`}
                onClick={() => setSelectedYear(yr)}
                className={`py-1.5 px-3 text-xs font-mono font-bold rounded-lg transition-all duration-200 border ${
                  selectedYear === yr
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60 shadow-sm'
                    : 'bg-gray-50/50 dark:bg-gray-900/40 text-gray-500 border-transparent hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sigma className="w-4 h-4 text-indigo-500" />
            {t.labels.selectIndicator}
          </h3>

          <div className="flex flex-col gap-1.5">
            {indicatorList.map(indId => (
              <button
                key={indId}
                id={`desc-indicator-${indId}`}
                onClick={() => setSelectedIndicator(indId)}
                className={`w-full py-2.5 px-3 text-xs font-medium rounded-xl text-left transition-all duration-200 flex justify-between items-center border ${
                  selectedIndicator === indId
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60 shadow-sm'
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

        {/* Statistical Summary Sheet */}
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm font-sans">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
            {t.labels.statisticsProcess} ({selectedYear})
          </h4>

          <div className="flex flex-col gap-3 text-xs" id="summary-metrics">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">{t.labels.mean}</span>
              <span className="font-mono font-bold text-gray-800 dark:text-gray-100 bg-sky-50 dark:bg-sky-950/30 px-2 py-0.5 rounded">
                {stats.mean.toLocaleString(undefined, { maximumFractionDigits: 2 })} {t.indicatorUnits[selectedIndicator]}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">{t.labels.median}</span>
              <span className="font-mono font-bold text-gray-800 dark:text-gray-100 bg-indigo-50 dark:bg-indigo-950/30 px-2 py-0.5 rounded">
                {stats.median.toLocaleString(undefined, { maximumFractionDigits: 2 })} {t.indicatorUnits[selectedIndicator]}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">{t.labels.stdDev}</span>
              <span className="font-mono font-bold text-gray-800 dark:text-gray-100 bg-violet-50 dark:bg-violet-950/30 px-2 py-0.5 rounded">
                {stats.stdDev.toLocaleString(undefined, { maximumFractionDigits: 2 })} {t.indicatorUnits[selectedIndicator]}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">{t.labels.variance}</span>
              <span className="font-mono font-medium text-gray-600 dark:text-gray-300">
                {stats.variance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">{t.labels.min}</span>
              <span className="font-mono font-medium text-gray-700 dark:text-gray-200">
                {stats.min.toLocaleString(undefined, { maximumFractionDigits: 1 })}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">{t.labels.max}</span>
              <span className="font-mono font-medium text-gray-700 dark:text-gray-200">
                {stats.max.toLocaleString(undefined, { maximumFractionDigits: 1 })}
              </span>
            </div>

            <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-800 pt-3">
              <span className="text-gray-500 dark:text-gray-400">{t.labels.range}</span>
              <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">
                {stats.range.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Math Explanation View */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* SVG Distribution Chart */}
        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="mb-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500 uppercase bg-emerald-50 dark:bg-emerald-950/40 py-1 px-2.5 rounded-full">
              {selectedYear} {t.labels.allCountries}
            </span>
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-2">
              {t.indicators[selectedIndicator]} {t.labels.details}
            </h2>
          </div>

          <div className="h-auto">
            <CustomChart
              type="bar"
              data={chartData}
              xLabel={t.labels.country}
              yLabel={t.indicators[selectedIndicator]}
              unitY={t.indicatorUnits[selectedIndicator]}
              activeColor={activeColor}
            />
          </div>
        </div>

        {/* Step-by-Step Educational Workout */}
        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-violet-500" />
              {t.labels.stepByStep}
            </h3>
            
            <button
              onClick={() => setShowFormulaDetails(!showFormulaDetails)}
              className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline"
            >
              {showFormulaDetails ? '[-]' : '[+]'} {t.labels.formulaUsed}
            </button>
          </div>

          {/* Formulations */}
          {showFormulaDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-800 text-xs">
              <div>
                <div className="font-bold text-gray-400 mb-1">1. {t.labels.mean} (μ)</div>
                <div className="font-mono bg-white dark:bg-gray-950 p-2 rounded-lg border border-gray-100 dark:border-gray-800 text-center mb-1">
                  μ = Σx_i / N
                </div>
                <p className="text-[11px] text-gray-400 leading-normal">
                  Sum of all values divided by total count of countries.
                </p>
              </div>

              <div>
                <div className="font-bold text-gray-400 mb-1">2. {t.labels.stdDev} (σ)</div>
                <div className="font-mono bg-white dark:bg-gray-950 p-2 rounded-lg border border-gray-100 dark:border-gray-800 text-center mb-1">
                  σ = √[ Σ(x_i - μ)² / N ]
                </div>
                <p className="text-[11px] text-gray-400 leading-normal">
                  Square root of population variance, representing average dispersion from the mean.
                </p>
              </div>
            </div>
          )}

          {/* Actual computations details with numbers */}
          <div className="text-xs flex flex-col gap-5">
            {/* Step 1 workout */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 flex items-center justify-center bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 rounded-full font-bold text-[10px]">1</span>
                <span className="font-bold text-gray-700 dark:text-gray-300">{t.labels.mean} (μ) calculation:</span>
              </div>
              <div className="bg-gray-50/20 dark:bg-gray-900/10 p-3 rounded-xl border border-gray-100 dark:border-gray-800 font-mono text-[11px] leading-relaxed">
                <div>
                  <span className="text-gray-400">&#931;x =</span> {rawDataPoints.map(dp => dp.value).join(' + ')}
                </div>
                <div className="mt-1 border-b border-gray-200 dark:border-gray-800 pb-1">
                  <span className="text-gray-500 font-semibold font-sans">{t.labels.sum}:</span> {stats.sum.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <div className="mt-2 text-gray-800 dark:text-gray-200">
                  <span className="text-gray-400">&mu; =</span> {stats.sum.toLocaleString(undefined, { maximumFractionDigits: 2 })} / {stats.n} = <strong className="text-sky-600 dark:text-sky-400">{stats.mean.toLocaleString(undefined, { maximumFractionDigits: 4 })}</strong>
                </div>
              </div>
            </div>

            {/* Step 2 workout */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-full font-bold text-[10px]">2</span>
                <span className="font-bold text-gray-700 dark:text-gray-300">{t.labels.median} calculation:</span>
              </div>
              <div className="bg-gray-50/20 dark:bg-gray-900/10 p-3 rounded-xl border border-gray-100 dark:border-gray-800 font-mono text-[11px] leading-relaxed flex flex-col gap-1">
                <div>
                  <span className="text-gray-400 font-sans">Sorted values:</span>
                </div>
                <div className="flex flex-wrap gap-1.5 py-1">
                  {sortedRawPoints.map((item, idx) => {
                    const isMid = stats.n % 2 === 0 
                      ? idx === stats.n / 2 - 1 || idx === stats.n / 2
                      : idx === Math.floor(stats.n / 2);
                    return (
                      <span 
                        key={item.countryId} 
                        className={`py-0.5 px-2 border rounded text-[10px] ${
                          isMid 
                            ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 font-bold'
                            : 'bg-white dark:bg-gray-950 text-gray-500 border-gray-100 dark:border-gray-900'
                        }`}
                      >
                        {item.countryId}: {item.value.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                      </span>
                    );
                  })}
                </div>
                <p className="text-[11px] font-sans text-gray-400 mt-1 leading-normal">
                  {stats.n % 2 === 0 
                    ? `Since N (${stats.n}) is even, median is average of the two central components: (${sortedRawPoints[stats.n/2-1].value.toLocaleString()} + ${sortedRawPoints[stats.n/2].value.toLocaleString()}) / 2 = ${stats.median.toLocaleString()}`
                    : `Since N (${stats.n}) is odd, median is the exact center value: ${stats.median.toLocaleString()}`}
                </p>
              </div>
            </div>

            {/* Step 3 workout */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 flex items-center justify-center bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 rounded-full font-bold text-[10px]">3</span>
                <span className="font-bold text-gray-700 dark:text-gray-300">{t.labels.stdDev} (σ) calculation:</span>
              </div>
              
              <div className="overflow-x-auto border border-gray-100 dark:border-gray-800/80 rounded-xl">
                <table className="w-full text-left font-mono text-[10px]">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-gray-900/60 text-gray-400 uppercase text-[9px] border-b border-gray-100 dark:border-gray-800">
                      <th className="py-2.5 px-4 font-semibold">{t.labels.country}</th>
                      <th className="py-2.5 px-3 font-semibold text-right">x_i</th>
                      <th className="py-2.5 px-3 font-semibold text-right">x_i - μ</th>
                      <th className="py-2.5 px-4 font-semibold text-right">(x_i - μ)²</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rawDataPoints.map((item) => {
                      const diff = item.value - stats.mean;
                      const diffSq = Math.pow(diff, 2);
                      return (
                        <tr key={item.countryId} className="border-b last:border-none border-gray-100/10 bg-white/50 dark:bg-gray-950/10">
                          <td className="py-2 px-4 text-gray-800 dark:text-gray-200 font-sans font-medium">{item.countryName}</td>
                          <td className="py-2 px-3 text-right">{item.value.toLocaleString(undefined, { maximumFractionDigits: 1 })}</td>
                          <td className="py-2 px-3 text-right text-gray-400">{diff > 0 ? '+' : ''}{diff.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                          <td className="py-2 px-4 text-right">{diffSq.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                        </tr>
                      );
                    })}
                    <tr className="bg-gray-50/30 dark:bg-gray-900/10 font-bold text-[11px] border-t border-gray-100 dark:border-gray-800">
                      <td colSpan={3} className="py-2.5 px-4 font-sans text-right text-gray-500 font-semibold">{t.labels.sumOfSquares}:</td>
                      <td className="py-2.5 px-4 text-right text-violet-600 dark:text-violet-400">{stats.sumOfSquares.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-gray-50/20 dark:bg-gray-900/10 p-3 rounded-xl border border-gray-100 dark:border-gray-800 font-mono text-[11px] mt-2 leading-relaxed">
                <div>
                  <span className="text-gray-400">Variance (&sigma;&sup2;) =</span> {stats.sumOfSquares.toLocaleString(undefined, { maximumFractionDigits: 2 })} / {stats.n} = <strong className="text-gray-800 dark:text-gray-200">{stats.variance.toLocaleString(undefined, { maximumFractionDigits: 4 })}</strong>
                </div>
                <div className="mt-1">
                  <span className="text-gray-400">Std Dev (&sigma;) =</span> &radic;{stats.variance.toLocaleString(undefined, { maximumFractionDigits: 4 })} = <strong className="text-violet-600 dark:text-violet-400">{stats.stdDev.toLocaleString(undefined, { maximumFractionDigits: 4 })}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
