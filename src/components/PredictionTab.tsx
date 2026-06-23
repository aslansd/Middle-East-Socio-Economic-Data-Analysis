import { useState } from 'react';
import { mideastData, countryList, indicatorList, CountryID, IndicatorID } from '../data/mideastData';
import { translations } from '../translations';
import { calculateRegression } from '../utils/mathUtils';
import CustomChart from './CustomChart';
import { LineChart, Shovel, Play, Calendar, Calculator, Sparkles, TrendingUp } from 'lucide-react';

interface PredictionTabProps {
  currentLang: 'en' | 'fa' | 'tr' | 'az';
}

export default function PredictionTab({ currentLang }: PredictionTabProps) {
  const t = translations[currentLang];
  const [selectedCountry, setSelectedCountry] = useState<CountryID>('TUR');
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorID>('gdp');
  const [targetYear, setTargetYear] = useState<number>(2028);

  // Compile history X (years) and Y (indicator value) for the country
  const countryObj = mideastData.find(c => c.id === selectedCountry);
  const years = countryObj ? countryObj.years.map(y => y.year) : [];
  const values = countryObj ? countryObj.years.map(y => y.indicators[selectedIndicator]) : [];

  // Calculate temporal regression
  const regression = calculateRegression(years, values);

  // Compute prediction
  const predictedVal = regression.slope * targetYear + regression.intercept;

  // Prepare chart data: historical points + prediction point as a projection
  const historyChartData = countryObj
    ? countryObj.years.map(y => ({
        label: y.year.toString(),
        value: y.indicators[selectedIndicator]
      }))
    : [];

  // Create a combined projection list for plotting forecasting trends
  const projectedYears = [2012, 2014, 2016, 2018, 2020, 2022, 2024, targetYear].sort((a,b)=>a-b);
  const plottedProjectionData = projectedYears.map(yr => {
    const historical = countryObj?.years.find(y => y.year === yr);
    if (historical) {
      return { label: yr.toString(), value: historical.indicators[selectedIndicator] };
    } else {
      const pred = regression.slope * yr + regression.intercept;
      return { label: `${yr}*`, value: Math.max(0, pred) }; // clamp to 0 if negative
    }
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="prediction-view">
      {/* Sidebar Configurations */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
          
          {/* Select country */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
              Select Country Context
            </h3>
            <select
              id="predict-country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value as CountryID)}
              className="w-full text-xs font-medium py-2.5 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-sky-500 text-gray-700 dark:text-gray-300"
            >
              {countryList.map(cId => (
                <option key={cId} value={cId}>{t.countries[cId]}</option>
              ))}
            </select>
          </div>

          {/* Select indicator */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              Select Target Indicator
            </h3>
            <select
              id="predict-indicator"
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value as IndicatorID)}
              className="w-full text-xs font-medium py-2.5 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-700 dark:text-gray-300"
            >
              {indicatorList.map(ind => (
                <option key={ind} value={ind}>{t.indicators[ind]}</option>
              ))}
            </select>
          </div>

          {/* Dynamic slider for target forecasting timeline */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              {t.labels.targetYearPredict}
            </h3>

            <div className="flex flex-col gap-2">
              <input
                id="target-year-slider"
                type="range"
                min="2025"
                max="2035"
                step="1"
                value={targetYear}
                onChange={(e) => setTargetYear(parseInt(e.target.value))}
                className="w-full accent-sky-500 h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between items-center text-xs font-mono font-bold text-gray-700 dark:text-gray-300">
                <span>2025</span>
                <span className="text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 py-1 px-3 rounded-full text-sm">
                  {targetYear}
                </span>
                <span>2035</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Equation Dashboard */}
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Model Fit Forecast
          </h4>

          <div className="flex flex-col gap-4 text-xs font-mono">
            <div>
              <span className="text-[10px] text-gray-400 font-mono block mb-1">
                {t.labels.predictedValue} ({targetYear})
              </span>
              <div className="text-xl font-bold text-sky-600 dark:text-sky-400 flex items-baseline gap-1 bg-sky-50/30 dark:bg-sky-950/20 p-2.5 rounded-xl border border-sky-100 dark:border-sky-900/50">
                {Math.max(0, predictedVal).toLocaleString(undefined, { maximumFractionDigits: 3 })}
                <span className="text-[11px] font-medium font-sans text-gray-500 pl-1">
                  {t.indicatorUnits[selectedIndicator]}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 block mb-0.5">{t.labels.slope} (Annual change rate)</span>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                {regression.slope >= 0 ? '+' : ''}{regression.slope.toLocaleString(undefined, { maximumFractionDigits: 3 })} {t.indicatorUnits[selectedIndicator]} / year
              </p>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 block mb-0.5">{t.labels.rSquared} (Time linearity Fit)</span>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                {(regression.rSquared * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Plotter Canvas & Mathematical Workflow */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Regression Projection Plot */}
        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <div className="mb-4 flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 py-1 px-2.5 rounded-full uppercase">
                {t.countries[selectedCountry]} Modeling
              </span>
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-2">
                Fitted Path Projection: {t.indicators[selectedIndicator]} up to {targetYear}*
              </h2>
            </div>
          </div>

          <div className="h-auto">
            <CustomChart
              type="line"
              data={plottedProjectionData}
              xLabel={t.labels.year}
              yLabel={t.indicators[selectedIndicator]}
              unitY={t.indicatorUnits[selectedIndicator]}
              activeColor="#8B5CF6" // Purple standard
            />
          </div>

          <div className="mt-4 p-4.5 bg-gray-50/50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-2xl flex gap-3">
            <TrendingUp className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              <strong className="text-gray-700 dark:text-gray-300 block mb-1">Temporal Model Meaning</strong>
              Statistically, the linear model fits an average annual shift of <span className="font-bold font-mono text-gray-800 dark:text-gray-200">{regression.slope.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span> {t.indicatorUnits[selectedIndicator]} units per year. Historical factors such as geopolitical and climate parameters are summarized linearly here over the 2012–2024 timeframe.
            </div>
          </div>
        </div>

        {/* Step-by-Step Prediction Calculation Page */}
        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
            <Calculator className="w-4 h-4 text-violet-500" />
            Fitted Projection Mathematical Workout
          </h3>

          <div className="text-xs flex flex-col gap-4 font-mono">
            {/* Model Equation */}
            <div className="p-4 bg-gray-50/60 dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800">
              <span className="font-sans font-bold text-gray-400 text-[10px] block mb-2">{t.labels.regressionEq} (Time-Series)</span>
              <div id="prediction-equation-text" className="text-sm text-center font-bold text-gray-800 dark:text-gray-100">
                y_t = &beta;&rsquo; * Year + &beta;&rdquo;
              </div>
              <p className="font-sans text-[11px] text-gray-400 text-center mt-1.5 leading-normal">
                Where Year is the target independent variable, and y_t is the forecasted value of the indicator.
              </p>
            </div>

            {/* Substitution values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50/25 dark:bg-gray-900/10 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800">
                <span className="font-sans font-semibold text-[11px] text-gray-700 dark:text-gray-300 block mb-2">Model Parameters</span>
                <ul className="flex flex-col gap-1.5 text-[11px] text-gray-600 dark:text-gray-400">
                  <li className="flex justify-between">
                    <span>Slope (&beta;&rsquo;):</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{regression.slope.toLocaleString(undefined, { maximumFractionDigits: 5 })}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Intercept (&beta;&rdquo;):</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{regression.intercept.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </li>
                  <li className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-1">
                    <span>Independent X (Year):</span>
                    <span className="font-bold text-sky-600 dark:text-sky-400">{targetYear}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50/25 dark:bg-gray-900/10 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col justify-center">
                <span className="font-sans font-semibold text-[11px] text-gray-700 dark:text-gray-300 block mb-1">Historical Bounds (Observed)</span>
                <p className="font-sans text-[11px] text-gray-500 leading-relaxed">
                  The model was trained on historical data ranging from <span className="font-mono text-gray-800 dark:text-gray-200 font-semibold">2012</span> ({values[0]?.toLocaleString(undefined, { maximumFractionDigits: 1 })}) to <span className="font-mono text-gray-800 dark:text-gray-200 font-semibold">2024</span> ({values[values.length-1]?.toLocaleString(undefined, { maximumFractionDigits: 1 })}).
                </p>
              </div>
            </div>

            {/* Substitution steps */}
            <div className="bg-gray-50/10 dark:bg-gray-900/10 p-4.5 border border-gray-100 dark:border-gray-800 rounded-2xl leading-relaxed text-[11px]">
              <h5 className="font-bold text-gray-700 dark:text-gray-300 font-sans mb-2">Mathematical Evaluation Steps:</h5>
              <div>
                1. Plug parameter values: y_t = ({regression.slope.toLocaleString(undefined, { maximumFractionDigits: 5 })} * {targetYear}) + ({regression.intercept.toLocaleString(undefined, { maximumFractionDigits: 3 })})
              </div>
              <div className="mt-1">
                2. Calculate product: y_t = {(regression.slope * targetYear).toLocaleString(undefined, { maximumFractionDigits: 3 })} + ({regression.intercept.toLocaleString(undefined, { maximumFractionDigits: 3 })})
              </div>
              <div className="mt-2 text-xs font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5 border-t border-gray-100 dark:border-gray-800/80 pt-2">
                <span className="text-[10px] text-gray-400 font-sans font-medium">Result:</span> Predicted Value = <span className="text-sky-600 dark:text-sky-400 font-mono text-sm font-black">{Math.max(0, predictedVal).toLocaleString(undefined, { maximumFractionDigits: 4 })}</span> {t.indicatorUnits[selectedIndicator]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
