import { useState } from 'react';
import { mideastData, countryList, indicatorList, CountryID, IndicatorID } from '../data/mideastData';
import { translations } from '../translations';
import { calculateRegression } from '../utils/mathUtils';
import CustomChart from './CustomChart';
import { Compass, Info, Calculator } from 'lucide-react';

interface CorrelationTabProps {
  currentLang: 'en' | 'fa' | 'tr' | 'az';
}

export default function CorrelationTab({ currentLang }: CorrelationTabProps) {
  const t = translations[currentLang];
  const [indicatorX, setIndicatorX] = useState<IndicatorID>('gdp');
  const [indicatorY, setIndicatorY] = useState<IndicatorID>('lifeExp');
  const [showMathDetail, setShowMathDetail] = useState<boolean>(true);

  // Compile all 42 data points (6 countries * 7 years) for Pearson computing
  const observations: Array<{
    x: number;
    y: number;
    label: string; // "Turkey - 2012"
    countryId: CountryID;
    year: number;
  }> = [];

  mideastData.forEach(country => {
    country.years.forEach(yrObj => {
      observations.push({
        x: yrObj.indicators[indicatorX],
        y: yrObj.indicators[indicatorY],
        label: `${t.countries[country.id]} (${yrObj.year})`,
        countryId: country.id,
        year: yrObj.year
      });
    });
  });

  const xList = observations.map(o => o.x);
  const yList = observations.map(o => o.y);

  const regression = calculateRegression(xList, yList);

  // Set color profile depending on indicator
  const chartColor = '#10B981'; // Emerald standard

  // Determine the correlation strength textual indicator
  const getCorrelationStrengthKey = (r: number) => {
    if (r >= 0.70) return 'strongPositive';
    if (r >= 0.30) return 'moderatePositive';
    if (r > 0.05) return 'weakPositive';
    if (r >= -0.05) return 'none';
    if (r > -0.30) return 'weakNegative';
    if (r > -0.70) return 'moderateNegative';
    return 'strongNegative';
  };

  const strengthKey = getCorrelationStrengthKey(regression.r);

  // Custom interpretation generator for popular socio-economic pairings
  const getSocioEconomicInterpretation = () => {
    if (indicatorX === 'gdp' && indicatorY === 'lifeExp') return t.interpretations.gdpLifeExp;
    if (indicatorX === 'gdp' && indicatorY === 'literacy') return t.interpretations.gdpLiteracy;
    if (indicatorX === 'gdp' && indicatorY === 'co2') return t.interpretations.gdpCo2;
    if (indicatorX === 'femaleLabor' && indicatorY === 'urban') return t.interpretations.femaleLaborUrban;
    
    // Generic correlation signs behavior
    if (regression.r >= 0.3) return t.interpretations.generalPositive;
    if (regression.r <= -0.3) return t.interpretations.generalNegative;
    return t.interpretations.generalNone;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="correlation-view">
      {/* Selection Columns Sidebar */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
          
          {/* Axis X variable selection */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
              Horizontal Axis (X Variable)
            </h3>
            <select
              id="select-indicator-x"
              value={indicatorX}
              onChange={(e) => setIndicatorX(e.target.value as IndicatorID)}
              className="w-full text-xs font-medium py-2.5 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-sky-500 text-gray-700 dark:text-gray-300"
            >
              {indicatorList.map(ind => (
                <option key={ind} value={ind}>{t.indicators[ind]}</option>
              ))}
            </select>
          </div>

          {/* Axis Y variable selection */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-violet-500 rounded-full"></span>
              Vertical Axis (Y Variable)
            </h3>
            <select
              id="select-indicator-y"
              value={indicatorY}
              onChange={(e) => setIndicatorY(e.target.value as IndicatorID)}
              className="w-full text-xs font-medium py-2.5 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 text-gray-700 dark:text-gray-300"
            >
              {indicatorList.map(ind => (
                <option key={ind} value={ind}>{t.indicators[ind]}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Statistical Summary Sheet */}
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-500" />
            {t.labels.interpretationText}
          </h4>

          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[10px] text-gray-400 font-mono block mb-1">
                {t.labels.pearsonR.slice(0, 32)}
              </span>
              <div className="text-xl font-mono font-black text-gray-800 dark:text-gray-100 flex items-baseline gap-1.5">
                {regression.r.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                <span className={`text-[10px] font-sans font-bold uppercase tracking-wider ${
                  regression.r >= 0.3 ? 'text-emerald-500' : regression.r <= -0.3 ? 'text-red-500' : 'text-gray-400'
                }`}>
                  ({regression.r >= 0 ? '+' : ''})
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 font-mono block mb-0.5">{t.labels.correlationStrength}</span>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {t.strengths[strengthKey as keyof typeof t.strengths] || t.strengths.none}
              </p>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 font-mono block mb-1">
                {t.labels.rSquared.slice(0, 32)} (R&sup2;)
              </span>
              <p className="text-sm font-mono font-bold text-gray-800 dark:text-gray-200">
                {(regression.rSquared * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%
              </p>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
              <span className="text-[10px] text-gray-400 font-mono block mb-1">{t.labels.regressionEq}</span>
              <div 
                id="regression-equation-text"
                className="font-mono text-xs p-2 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg text-gray-800 dark:text-gray-300 text-center"
              >
                y = {regression.slope.toLocaleString(undefined, { maximumFractionDigits: 4 })}x {regression.intercept >= 0 ? '+' : '-'} {Math.abs(regression.intercept).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Regression Details */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Interactive Scatter Canvas */}
        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <div className="mb-4">
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 py-1 px-2.5 rounded-full">
              N = {observations.length} Observations
            </span>
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-2">
              Linear Fitting: {t.indicators[indicatorY]} vs {t.indicators[indicatorX]}
            </h2>
          </div>

          <div className="h-auto">
            <CustomChart
              type="scatter"
              scatterData={observations}
              regressionLine={{ slope: regression.slope, intercept: regression.intercept }}
              xLabel={t.indicators[indicatorX]}
              yLabel={t.indicators[indicatorY]}
              unitX={t.indicatorUnits[indicatorX]}
              unitY={t.indicatorUnits[indicatorY]}
              activeColor={chartColor}
            />
          </div>

          <div className="mt-4 p-4 bg-gray-50/50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-2xl flex gap-3">
            <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              <strong className="text-gray-700 dark:text-gray-300 block mb-1">{t.labels.resultInterpretation}</strong>
              {getSocioEconomicInterpretation()}
            </div>
          </div>
        </div>

        {/* Step-by-Step Educational Workout */}
        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-violet-500" />
              Pearson Correlation Math Derivation
            </h3>
            
            <button
              onClick={() => setShowMathDetail(!showMathDetail)}
              className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline"
            >
              {showMathDetail ? '[-]' : '[+]'} {t.labels.formulaUsed}
            </button>
          </div>

          {showMathDetail && (
            <div className="mb-6">
              <div className="bg-gray-50/50 dark:bg-gray-900/30 p-4 border border-gray-100 dark:border-gray-800 rounded-2xl">
                <h4 className="text-xs font-bold text-gray-400 mb-2">{t.labels.formulaUsed}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-xs font-mono">
                  <div className="p-2 border border-gray-100 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950">
                    <span className="text-[10px] text-gray-400 block pb-1">Correlation Coefficient</span>
                    r = S_xy / &radic;(S_xx * S_yy)
                  </div>
                  <div className="p-2 border border-gray-100 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950">
                    <span className="text-[10px] text-gray-400 block pb-1">Slope (&beta;&rsquo;)</span>
                    &beta;&rsquo; = S_xy / S_xx
                  </div>
                  <div className="p-2 border border-gray-100 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950">
                    <span className="text-[10px] text-gray-400 block pb-1">Y-Intercept (&beta;&rdquo;)</span>
                    &beta;&rdquo; = &mu;_Y - &beta;&rsquo; * &mu;_X
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actual computation numerical results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-gray-50/25 dark:bg-gray-900/10 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h4 className="font-semibold text-[11px] text-gray-700 dark:text-gray-300 font-sans mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
                Descriptive Means
              </h4>
              <ul className="flex flex-col gap-2 leading-relaxed text-[11px]">
                <li className="flex justify-between">
                  <span className="text-gray-400">Sample Size (N):</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{regression.n}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Mean of X (&mu;_x):</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{regression.meanX.toLocaleString(undefined, { maximumFractionDigits: 3 })}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Mean of Y (&mu;_y):</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{regression.meanY.toLocaleString(undefined, { maximumFractionDigits: 3 })}</span>
                </li>
                <li className="flex justify-between border-t border-gray-100 dark:border-gray-800/80 pt-1">
                  <span className="text-gray-400">Sum X (&Sigma;X):</span>
                  <span className="text-gray-600 dark:text-gray-300">{regression.sumX.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Sum Y (&Sigma;Y):</span>
                  <span className="text-gray-600 dark:text-gray-300">{regression.sumY.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50/25 dark:bg-gray-900/10 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h4 className="font-semibold text-[11px] text-gray-700 dark:text-gray-300 font-sans mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Squares &amp; Covariance
              </h4>
              <ul className="flex flex-col gap-2 leading-relaxed text-[11px]">
                <li className="flex justify-between">
                  <span className="text-gray-400">Sum of Squares X (S_xx):</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{regression.sumOfSquaresX.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Sum of Squares Y (S_yy):</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{regression.sumOfSquaresY.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Sum of Products (S_xy):</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{regression.sumOfProducts.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </li>
                <li className="flex justify-between border-t border-gray-100 dark:border-gray-800/80 pt-1">
                  <span className="text-gray-400">Covariance (pop):</span>
                  <span className="text-gray-600 dark:text-gray-300">{(regression.sumOfProducts / regression.n).toLocaleString(undefined, { maximumFractionDigits: 3 })}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-gray-50/10 dark:bg-gray-900/10 p-4.5 border border-gray-100 dark:border-gray-800 rounded-2xl font-mono text-[11px] leading-relaxed">
            <h5 className="font-bold text-gray-700 dark:text-gray-300 font-sans mb-1.5">Numerical Substitutions:</h5>
            <div>
              1. <span className="text-gray-400">r =</span> {regression.sumOfProducts.toLocaleString(undefined, { maximumFractionDigits: 2 })} / &radic;({regression.sumOfSquaresX.toLocaleString(undefined, { maximumFractionDigits: 2 })} * {regression.sumOfSquaresY.toLocaleString(undefined, { maximumFractionDigits: 2 })})
              <div>&mu; = <strong className="text-emerald-600 dark:text-emerald-400">{regression.r.toLocaleString(undefined, { maximumFractionDigits: 4 })}</strong></div>
            </div>
            <div className="mt-2 text-gray-800 dark:text-gray-200">
              2. <span className="text-gray-400">Slope m =</span> {regression.sumOfProducts.toLocaleString(undefined, { maximumFractionDigits: 2 })} / {regression.sumOfSquaresX.toLocaleString(undefined, { maximumFractionDigits: 2 })} = <strong className="text-sky-600 dark:text-sky-400">{regression.slope.toLocaleString(undefined, { maximumFractionDigits: 4 })}</strong>
            </div>
            <div className="mt-1 text-gray-800 dark:text-gray-200">
              3. <span className="text-gray-400">Intercept b =</span> {regression.meanY.toLocaleString(undefined, { maximumFractionDigits: 2 })} - ({regression.slope.toLocaleString(undefined, { maximumFractionDigits: 4 })} * {regression.meanX.toLocaleString(undefined, { maximumFractionDigits: 2 })}) = <strong className="text-violet-600 dark:text-violet-400">{regression.intercept.toLocaleString(undefined, { maximumFractionDigits: 4 })}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
