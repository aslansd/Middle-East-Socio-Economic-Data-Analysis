export interface DescriptiveStats {
  n: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  range: number;
  variance: number;
  stdDev: number;
  sum: number;
  sumOfSquares: number;
}

export interface RegressionResult {
  n: number;
  meanX: number;
  meanY: number;
  sumX: number;
  sumY: number;
  sumOfSquaresX: number;
  sumOfSquaresY: number;
  sumOfProducts: number;
  r: number;
  rSquared: number;
  slope: number;
  intercept: number;
}

export function calculateDescriptiveStats(values: number[]): DescriptiveStats {
  const n = values.length;
  if (n === 0) {
    return { n: 0, mean: 0, median: 0, min: 0, max: 0, range: 0, variance: 0, stdDev: 0, sum: 0, sumOfSquares: 0 };
  }

  const sum = values.reduce((acc, val) => acc + val, 0);
  const mean = sum / n;

  const sorted = [...values].sort((a, b) => a - b);
  const median = n % 2 === 0 
    ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 
    : sorted[Math.floor(n / 2)];

  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;

  const sumOfSquares = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  const variance = sumOfSquares / n; // Population variance
  const stdDev = Math.sqrt(variance);

  return {
    n,
    mean,
    median,
    min,
    max,
    range,
    variance,
    stdDev,
    sum,
    sumOfSquares
  };
}

export function calculateRegression(x: number[], y: number[]): RegressionResult {
  const n = x.length;
  if (n === 0 || n !== y.length) {
    return {
      n: 0, meanX: 0, meanY: 0, sumX: 0, sumY: 0,
      sumOfSquaresX: 0, sumOfSquaresY: 0, sumOfProducts: 0,
      r: 0, rSquared: 0, slope: 0, intercept: 0
    };
  }

  const sumX = x.reduce((acc, v) => acc + v, 0);
  const sumY = y.reduce((acc, v) => acc + v, 0);
  const meanX = sumX / n;
  const meanY = sumY / n;

  let sumOfSquaresX = 0;
  let sumOfSquaresY = 0;
  let sumOfProducts = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    sumOfSquaresX += dx * dx;
    sumOfSquaresY += dy * dy;
    sumOfProducts += dx * dy;
  }

  const denominator = Math.sqrt(sumOfSquaresX * sumOfSquaresY);
  const r = denominator === 0 ? 0 : sumOfProducts / denominator;
  const rSquared = r * r;

  const slope = sumOfSquaresX === 0 ? 0 : sumOfProducts / sumOfSquaresX;
  const intercept = meanY - slope * meanX;

  return {
    n,
    meanX,
    meanY,
    sumX,
    sumY,
    sumOfSquaresX,
    sumOfSquaresY,
    sumOfProducts,
    r,
    rSquared,
    slope,
    intercept
  };
}
