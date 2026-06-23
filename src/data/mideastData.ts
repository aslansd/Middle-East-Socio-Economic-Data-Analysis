export interface IndicatorValue {
  gdp: number;          // USD per capita
  lifeExp: number;      // years
  literacy: number;     // %
  femaleLabor: number;  // %
  urban: number;        // %
  co2: number;          // metric tons per capita
}

export interface YearData {
  year: number;
  indicators: IndicatorValue;
}

export interface CountryData {
  id: 'TUR' | 'IRN' | 'AZE' | 'SAU' | 'EGY' | 'ARE';
  years: YearData[];
}

export const mideastData: CountryData[] = [
  {
    id: 'TUR',
    years: [
      { year: 2012, indicators: { gdp: 12500, lifeExp: 75.2, literacy: 95.1, femaleLabor: 29.5, urban: 72.0, co2: 4.4 } },
      { year: 2014, indicators: { gdp: 13200, lifeExp: 75.8, literacy: 95.6, femaleLabor: 30.8, urban: 73.5, co2: 4.5 } },
      { year: 2016, indicators: { gdp: 14100, lifeExp: 76.4, literacy: 96.2, femaleLabor: 32.5, urban: 74.8, co2: 4.7 } },
      { year: 2018, indicators: { gdp: 14600, lifeExp: 77.1, literacy: 96.7, femaleLabor: 34.1, urban: 76.1, co2: 5.0 } },
      { year: 2020, indicators: { gdp: 14800, lifeExp: 75.9, literacy: 97.0, femaleLabor: 32.0, urban: 77.3, co2: 4.8 } },
      { year: 2022, indicators: { gdp: 16500, lifeExp: 76.8, literacy: 97.5, femaleLabor: 35.1, urban: 78.5, co2: 5.1 } },
      { year: 2024, indicators: { gdp: 17800, lifeExp: 77.5, literacy: 98.1, femaleLabor: 36.8, urban: 79.6, co2: 5.2 } },
    ]
  },
  {
    id: 'IRN',
    years: [
      { year: 2012, indicators: { gdp: 5800, lifeExp: 74.5, literacy: 84.5, femaleLabor: 12.8, urban: 71.8, co2: 7.8 } },
      { year: 2014, indicators: { gdp: 5600, lifeExp: 75.1, literacy: 85.8, femaleLabor: 13.5, urban: 73.0, co2: 8.1 } },
      { year: 2016, indicators: { gdp: 6100, lifeExp: 75.7, literacy: 87.2, femaleLabor: 15.2, urban: 74.2, co2: 8.3 } },
      { year: 2018, indicators: { gdp: 5500, lifeExp: 76.2, literacy: 88.5, femaleLabor: 16.5, urban: 75.4, co2: 8.5 } },
      { year: 2020, indicators: { gdp: 5100, lifeExp: 74.8, literacy: 89.4, femaleLabor: 14.1, urban: 76.5, co2: 8.4 } },
      { year: 2022, indicators: { gdp: 5400, lifeExp: 75.9, literacy: 90.5, femaleLabor: 15.4, urban: 77.6, co2: 8.8 } },
      { year: 2024, indicators: { gdp: 5700, lifeExp: 76.6, literacy: 91.8, femaleLabor: 16.0, urban: 78.7, co2: 9.1 } },
    ]
  },
  {
    id: 'AZE',
    years: [
      { year: 2012, indicators: { gdp: 5400, lifeExp: 70.8, literacy: 99.4, femaleLabor: 60.5, urban: 54.1, co2: 3.5 } },
      { year: 2014, indicators: { gdp: 5600, lifeExp: 71.1, literacy: 99.5, femaleLabor: 61.2, urban: 54.8, co2: 3.7 } },
      { year: 2016, indicators: { gdp: 5200, lifeExp: 71.5, literacy: 99.6, femaleLabor: 62.1, urban: 55.4, co2: 3.6 } },
      { year: 2018, indicators: { gdp: 5400, lifeExp: 72.1, literacy: 99.7, femaleLabor: 62.8, urban: 56.1, co2: 3.8 } },
      { year: 2020, indicators: { gdp: 5100, lifeExp: 70.9, literacy: 99.8, femaleLabor: 61.5, urban: 56.7, co2: 3.7 } },
      { year: 2022, indicators: { gdp: 5500, lifeExp: 72.5, literacy: 99.8, femaleLabor: 63.2, urban: 57.4, co2: 3.9 } },
      { year: 2024, indicators: { gdp: 5800, lifeExp: 73.2, literacy: 99.9, femaleLabor: 64.0, urban: 58.0, co2: 4.1 } },
    ]
  },
  {
    id: 'SAU',
    years: [
      { year: 2012, indicators: { gdp: 21000, lifeExp: 73.8, literacy: 94.4, femaleLabor: 17.5, urban: 82.5, co2: 18.2 } },
      { year: 2014, indicators: { gdp: 22100, lifeExp: 74.3, literacy: 95.0, femaleLabor: 19.2, urban: 83.2, co2: 19.5 } },
      { year: 2016, indicators: { gdp: 21500, lifeExp: 74.9, literacy: 95.6, femaleLabor: 21.0, urban: 83.8, co2: 19.1 } },
      { year: 2018, indicators: { gdp: 22000, lifeExp: 75.4, literacy: 96.2, femaleLabor: 22.5, urban: 84.4, co2: 18.2 } },
      { year: 2020, indicators: { gdp: 20500, lifeExp: 74.5, literacy: 96.8, femaleLabor: 28.2, urban: 84.9, co2: 17.5 } },
      { year: 2022, indicators: { gdp: 23200, lifeExp: 75.8, literacy: 97.4, femaleLabor: 33.5, urban: 85.4, co2: 18.5 } },
      { year: 2024, indicators: { gdp: 24500, lifeExp: 76.5, literacy: 98.0, femaleLabor: 35.5, urban: 85.9, co2: 19.0 } },
    ]
  },
  {
    id: 'EGY',
    years: [
      { year: 2012, indicators: { gdp: 3100, lifeExp: 69.8, literacy: 72.1, femaleLabor: 24.2, urban: 42.8, co2: 2.2 } },
      { year: 2014, indicators: { gdp: 3200, lifeExp: 70.2, literacy: 73.8, femaleLabor: 23.8, urban: 43.1, co2: 2.1 } },
      { year: 2016, indicators: { gdp: 3400, lifeExp: 70.6, literacy: 75.2, femaleLabor: 22.9, urban: 43.3, co2: 2.3 } },
      { year: 2018, indicators: { gdp: 3600, lifeExp: 71.1, literacy: 76.5, femaleLabor: 21.5, urban: 43.5, co2: 2.4 } },
      { year: 2020, indicators: { gdp: 3800, lifeExp: 69.9, literacy: 77.8, femaleLabor: 18.4, urban: 43.8, co2: 2.2 } },
      { year: 2022, indicators: { gdp: 4100, lifeExp: 70.8, literacy: 79.1, femaleLabor: 19.8, urban: 44.1, co2: 2.4 } },
      { year: 2024, indicators: { gdp: 4300, lifeExp: 71.5, literacy: 80.4, femaleLabor: 20.5, urban: 44.4, co2: 2.5 } },
    ]
  },
  {
    id: 'ARE',
    years: [
      { year: 2012, indicators: { gdp: 38000, lifeExp: 77.2, literacy: 93.8, femaleLabor: 41.5, urban: 84.8, co2: 20.8 } },
      { year: 2014, indicators: { gdp: 40500, lifeExp: 77.6, literacy: 94.5, femaleLabor: 42.8, urban: 85.3, co2: 21.5 } },
      { year: 2016, indicators: { gdp: 41200, lifeExp: 78.1, literacy: 95.2, femaleLabor: 44.2, urban: 85.8, co2: 21.2 } },
      { year: 2018, indicators: { gdp: 42100, lifeExp: 78.6, literacy: 95.8, femaleLabor: 46.5, urban: 86.3, co2: 19.8 } },
      { year: 2020, indicators: { gdp: 37500, lifeExp: 77.8, literacy: 96.2, femaleLabor: 47.8, urban: 86.8, co2: 18.2 } },
      { year: 2022, indicators: { gdp: 41800, lifeExp: 78.9, literacy: 96.8, femaleLabor: 50.5, urban: 87.3, co2: 19.5 } },
      { year: 2024, indicators: { gdp: 44200, lifeExp: 79.5, literacy: 97.4, femaleLabor: 52.8, urban: 87.8, co2: 20.1 } },
    ]
  }
];

export const yearsList = [2012, 2014, 2016, 2018, 2020, 2022, 2024];

export type CountryID = 'TUR' | 'IRN' | 'AZE' | 'SAU' | 'EGY' | 'ARE';
export type IndicatorID = 'gdp' | 'lifeExp' | 'literacy' | 'femaleLabor' | 'urban' | 'co2';

export const countryList: CountryID[] = ['TUR', 'IRN', 'AZE', 'SAU', 'EGY', 'ARE'];
export const indicatorList: IndicatorID[] = ['gdp', 'lifeExp', 'literacy', 'femaleLabor', 'urban', 'co2'];
