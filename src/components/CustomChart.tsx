import { useState, useRef, useEffect } from 'react';

// Common interfaces
interface ChartDataPoint {
  label: string; // e.g. Year or Country
  value: number;
}

interface ScatterDataPoint {
  x: number;
  y: number;
  label: string; // Country / Year identifier
  countryId: string;
}

interface CustomChartProps {
  type: 'line' | 'scatter' | 'bar';
  data?: ChartDataPoint[];
  scatterData?: ScatterDataPoint[];
  regressionLine?: { slope: number; intercept: number };
  xLabel?: string;
  yLabel?: string;
  unitX?: string;
  unitY?: string;
  activeColor?: string;
}

export default function CustomChart({
  type,
  data = [],
  scatterData = [],
  regressionLine,
  xLabel = '',
  yLabel = '',
  unitX = '',
  unitY = '',
  activeColor = '#0EA5E9' // Tailind Sky-500
}: CustomChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
    title: string;
    details: string;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // SVG viewport size
  const svgWidth = 600;
  const svgHeight = 350;
  const padding = { top: 30, right: 30, bottom: 50, left: 65 };

  // Clear hover state on chart change
  useEffect(() => {
    setHoveredPoint(null);
  }, [type, data, scatterData]);

  if (type === 'line' && data.length === 0) return <div className="text-gray-400 text-center py-10 font-mono text-sm">No data</div>;
  if (type === 'scatter' && scatterData.length === 0) return <div className="text-gray-400 text-center py-10 font-mono text-sm">No data</div>;
  if (type === 'bar' && data.length === 0) return <div className="text-gray-400 text-center py-10 font-mono text-sm">No data</div>;

  // Render Line Chart
  if (type === 'line') {
    const xValues = data.map((_, i) => i);
    const yValues = data.map(d => d.value);

    // X coordinates can map to index
    const minXIdx = 0;
    const maxXIdx = data.length - 1 || 1;

    const minY = Math.min(...yValues) * 0.95;
    const maxY = Math.max(...yValues) * 1.05;
    const rangeY = maxY - minY || 1;

    // Helper coordinates mapping functions
    const getX = (idx: number) => padding.left + (idx / maxXIdx) * (svgWidth - padding.left - padding.right);
    const getY = (val: number) => svgHeight - padding.bottom - ((val - minY) / rangeY) * (svgHeight - padding.top - padding.bottom);

    // Build SVG path
    let dPath = '';
    let dAreaPath = '';

    if (data.length > 0) {
      dPath = `M ${getX(0)} ${getY(data[0].value)}`;
      dAreaPath = `M ${getX(0)} ${getY(data[0].value)}`;
      
      for (let i = 1; i < data.length; i++) {
        dPath += ` L ${getX(i)} ${getY(data[i].value)}`;
        dAreaPath += ` L ${getX(i)} ${getY(data[i].value)}`;
      }
      
      // Close area path along baseline
      dAreaPath += ` L ${getX(data.length - 1)} ${svgHeight - padding.bottom}`;
      dAreaPath += ` L ${getX(0)} ${svgHeight - padding.bottom} Z`;
    }

    // Generate Y Ticks
    const ticCount = 5;
    const yTicks = Array.from({ length: ticCount }, (_, i) => minY + (rangeY * i) / (ticCount - 1));

    return (
      <div className="relative w-full overflow-hidden" ref={containerRef}>
        <div className="text-xs font-mono text-gray-500 mb-1 flex justify-between px-1">
          <span>{yLabel} ({unitY})</span>
          <span>{xLabel}</span>
        </div>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none bg-white/50 dark:bg-gray-950/30 rounded-xl border border-gray-100 dark:border-gray-800/80 backdrop-blur-md">
          {/* Gridlines */}
          {yTicks.map((tick, i) => {
            const yPos = getY(tick);
            return (
              <g key={i}>
                <line 
                  x1={padding.left} 
                  y1={yPos} 
                  x2={svgWidth - padding.right} 
                  y2={yPos} 
                  stroke="rgba(156, 163, 175, 0.15)" 
                  strokeDasharray="4 4" 
                />
                <text 
                  x={padding.left - 8} 
                  y={yPos + 4} 
                  textAnchor="end" 
                  className="fill-gray-400 font-mono text-[9px] font-semibold"
                >
                  {tick.toLocaleString(undefined, { maximumFractionDigits: tick > 100 ? 0 : 2 })}
                </text>
              </g>
            );
          })}

          {/* X ticks */}
          {data.map((item, i) => {
            const xPos = getX(i);
            return (
              <g key={i}>
                <line 
                  x1={xPos} 
                  y1={svgHeight - padding.bottom} 
                  x2={xPos} 
                  y2={svgHeight - padding.bottom + 5} 
                  stroke="rgba(156, 163, 175, 0.4)" 
                />
                <text 
                  x={xPos} 
                  y={svgHeight - padding.bottom + 18} 
                  textAnchor="middle" 
                  className="fill-gray-400 font-mono text-[10px] font-semibold"
                  transform={data.length > 8 ? `rotate(-20, ${xPos}, ${svgHeight - padding.bottom + 18})` : ''}
                >
                  {item.label}
                </text>
              </g>
            );
          })}

          {/* Fill Area Gradient */}
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={activeColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={activeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Path */}
          {dAreaPath && <path d={dAreaPath} fill="url(#lineGrad)" />}

          {/* Line Path */}
          {dPath && (
            <path 
              d={dPath} 
              fill="none" 
              stroke={activeColor} 
              strokeWidth="2.5" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data Nodes */}
          {data.map((item, i) => {
            const cx = getX(i);
            const cy = getY(item.value);
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="4.5"
                fill="white"
                stroke={activeColor}
                strokeWidth="2.5"
                className="cursor-pointer transition-all duration-200 hover:r-7 hover:fill-amber-400"
                onMouseEnter={(e) => {
                  setHoveredPoint({
                    x: cx,
                    y: cy,
                    title: item.label,
                    details: `${item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${unitY}`
                  });
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div 
            className="absolute z-10 bg-gray-900/95 dark:bg-gray-100/95 text-white dark:text-gray-900 text-xs py-1.5 px-3 rounded-lg shadow-xl backdrop-blur-sm pointer-events-none transform -translate-x-1/2 -translate-y-full border border-white/10"
            style={{ 
              left: `${(hoveredPoint.x / svgWidth) * 100}%`, 
              top: `${(hoveredPoint.y / svgHeight) * 100 - 8}%` 
            }}
          >
            <div className="font-semibold">{hoveredPoint.title}</div>
            <div className="font-mono mt-0.5">{hoveredPoint.details}</div>
          </div>
        )}
      </div>
    );
  }

  // Render Scatter Plot + Fitted Regression Line
  if (type === 'scatter') {
    const xValues = scatterData.map(d => d.x);
    const yValues = scatterData.map(d => d.y);

    const minX = Math.min(...xValues) * 0.95;
    const maxX = Math.max(...xValues) * 1.05 || 100;
    const rangeX = maxX - minX || 1;

    const minY = Math.min(...yValues) * 0.95;
    const maxY = Math.max(...yValues) * 1.05 || 100;
    const rangeY = maxY - minY || 1;

    // Coordinate mapping
    const getX = (val: number) => padding.left + ((val - minX) / rangeX) * (svgWidth - padding.left - padding.right);
    const getY = (val: number) => svgHeight - padding.bottom - ((val - minY) / rangeY) * (svgHeight - padding.top - padding.bottom);

    // Generate Axes Ticks
    const ticCount = 5;
    const xTicks = Array.from({ length: ticCount }, (_, i) => minX + (rangeX * i) / (ticCount - 1));
    const yTicks = Array.from({ length: ticCount }, (_, i) => minY + (rangeY * i) / (ticCount - 1));

    // Custom coloring for countries to differentiate on scatter plot
    const countryColors: Record<string, string> = {
      TUR: '#EF4444', // Red
      IRN: '#10B981', // Emerald
      AZE: '#3B82F6', // Blue
      SAU: '#F59E0B', // Amber
      EGY: '#8B5CF6', // Purple
      ARE: '#EC4899'  // Pink
    };

    return (
      <div className="relative w-full overflow-hidden" ref={containerRef}>
        <div className="text-[10px] font-mono text-gray-400 mb-1.5 flex justify-between px-1">
          <span>Y: {yLabel} ({unitY})</span>
          <span>X: {xLabel} ({unitX})</span>
        </div>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none bg-white/50 dark:bg-gray-950/30 rounded-xl border border-gray-100 dark:border-gray-800/80 backdrop-blur-md">
          {/* Y Gridlines */}
          {yTicks.map((tick, i) => {
            const yPos = getY(tick);
            return (
              <g key={`y-${i}`}>
                <line 
                  x1={padding.left} 
                  y1={yPos} 
                  x2={svgWidth - padding.right} 
                  y2={yPos} 
                  stroke="rgba(156, 163, 175, 0.12)" 
                  strokeDasharray="4 4" 
                />
                <text 
                  x={padding.left - 8} 
                  y={yPos + 3} 
                  textAnchor="end" 
                  className="fill-gray-400 font-mono text-[9px] font-semibold"
                >
                  {tick.toLocaleString(undefined, { maximumFractionDigits: tick > 100 ? 0 : 1 })}
                </text>
              </g>
            );
          })}

          {/* X Gridlines / Ticks */}
          {xTicks.map((tick, i) => {
            const xPos = getX(tick);
            return (
              <g key={`x-${i}`}>
                <line 
                  x1={xPos} 
                  y1={svgHeight - padding.bottom} 
                  x2={xPos} 
                  y2={padding.top} 
                  stroke="rgba(156, 163, 175, 0.08)" 
                  strokeDasharray="4 4" 
                />
                <line 
                  x1={xPos} 
                  y1={svgHeight - padding.bottom} 
                  x2={xPos} 
                  y2={svgHeight - padding.bottom + 5} 
                  stroke="rgba(156, 163, 175, 0.4)" 
                />
                <text 
                  x={xPos} 
                  y={svgHeight - padding.bottom + 18} 
                  textAnchor="middle" 
                  className="fill-gray-400 font-mono text-[9px] font-semibold"
                >
                  {tick.toLocaleString(undefined, { maximumFractionDigits: tick > 100 ? 0 : 1 })}
                </text>
              </g>
            );
          })}

          {/* Plot Regression Line */}
          {regressionLine && (
            (() => {
              // y = mx + c. Compute ends of the chart domain boundaries
              const rawYMinBound = regressionLine.slope * minX + regressionLine.intercept;
              const rawYMaxBound = regressionLine.slope * maxX + regressionLine.intercept;

              return (
                <line
                  x1={getX(minX)}
                  y1={getY(rawYMinBound)}
                  x2={getX(maxX)}
                  y2={getY(rawYMaxBound)}
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeDasharray="5 4"
                  className="opacity-90"
                />
              );
            })()
          )}

          {/* Plot Scatter Dots */}
          {scatterData.map((node, i) => {
            const cx = getX(node.x);
            const cy = getY(node.y);
            const nodeColor = countryColors[node.countryId] || activeColor;

            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="6"
                fill={nodeColor}
                fillOpacity="0.85"
                stroke="#fff"
                strokeWidth="1.5"
                className="cursor-pointer transition-all duration-200 hover:r-10 hover:fill-opacity-100 hover:stroke-amber-400"
                onMouseEnter={() => {
                  setHoveredPoint({
                    x: cx,
                    y: cy,
                    title: node.label,
                    details: `X: ${node.x.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${unitX} | Y: ${node.y.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${unitY}`
                  });
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div 
            className="absolute z-10 bg-gray-900/95 dark:bg-gray-100/95 text-white dark:text-gray-900 text-[11px] py-2 px-3 rounded-xl shadow-xl backdrop-blur-sm pointer-events-none transform -translate-x-1/2 -translate-y-full border border-white/10 w-fit max-w-[250px]"
            style={{ 
              left: `${(hoveredPoint.x / svgWidth) * 100}%`, 
              top: `${(hoveredPoint.y / svgHeight) * 100 - 8}%` 
            }}
          >
            <div className="font-semibold text-center leading-tight">{hoveredPoint.title}</div>
            <div className="font-mono mt-1 text-[10px] text-gray-300 dark:text-gray-600 text-center leading-snug">{hoveredPoint.details}</div>
          </div>
        )}
      </div>
    );
  }

  // Render Comparative Bar Chart
  if (type === 'bar') {
    const values = data.map(d => d.value);
    const maxY = Math.max(...values, 1) * 1.05;
    const minY = 0; // standard bar chart baseline starts at 0

    // Coordinate mapping for horizontal gridlines & vertical column heights
    const barWidth = Math.max(8, Math.min(45, (svgWidth - padding.left - padding.right) / (data.length * 1.6)));
    const getX = (idx: number) => {
      const availWidth = svgWidth - padding.left - padding.right;
      const step = availWidth / data.length;
      return padding.left + step * idx + (step - barWidth) / 2;
    };
    const getY = (val: number) => svgHeight - padding.bottom - (val / maxY) * (svgHeight - padding.top - padding.bottom);

    // Gridticks
    const ticCount = 5;
    const yTicks = Array.from({ length: ticCount }, (_, i) => (maxY * i) / (ticCount - 1));

    return (
      <div className="relative w-full overflow-hidden" ref={containerRef}>
        <div className="text-xs font-mono text-gray-500 mb-1 flex justify-between px-1">
          <span>{yLabel} ({unitY})</span>
          <span>{xLabel}</span>
        </div>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none bg-white/50 dark:bg-gray-950/30 rounded-xl border border-gray-100 dark:border-gray-800/80 backdrop-blur-md">
          {/* Gridlines */}
          {yTicks.map((tick, i) => {
            const yPos = getY(tick);
            return (
              <g key={i}>
                <line 
                  x1={padding.left} 
                  y1={yPos} 
                  x2={svgWidth - padding.right} 
                  y2={yPos} 
                  stroke="rgba(156, 163, 175, 0.15)" 
                  strokeDasharray="4 4" 
                />
                <text 
                  x={padding.left - 8} 
                  y={yPos + 4} 
                  textAnchor="end" 
                  className="fill-gray-400 font-mono text-[9px] font-semibold"
                >
                  {tick.toLocaleString(undefined, { maximumFractionDigits: tick > 100 ? 0 : 2 })}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((item, i) => {
            const bx = getX(i);
            const by = getY(item.value);
            const height = (svgHeight - padding.bottom) - by;

            return (
              <g key={i}>
                {/* Visual Bar */}
                <rect
                  x={bx}
                  y={by}
                  width={barWidth}
                  height={Math.max(2, height)}
                  rx="4"
                  ry="4"
                  fill={activeColor}
                  fillOpacity="0.85"
                  className="cursor-pointer transition-all duration-200 hover:fill-opacity-100"
                  onMouseEnter={() => {
                    setHoveredPoint({
                      x: bx + barWidth / 2,
                      y: by,
                      title: item.label,
                      details: `${item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${unitY}`
                    });
                  }}
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* X Axis label */}
                <text
                  x={bx + barWidth / 2}
                  y={svgHeight - padding.bottom + 18}
                  textAnchor="middle"
                  className="fill-gray-500 font-sans text-[10px] font-medium"
                >
                  {item.label}
                </text>
              </g>
            );
          })}

          {/* Baseline */}
          <line
            x1={padding.left}
            y1={svgHeight - padding.bottom}
            x2={svgWidth - padding.right}
            y2={svgHeight - padding.bottom}
            stroke="rgba(156, 163, 175, 0.4)"
            strokeWidth="1"
          />
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div 
            className="absolute z-10 bg-gray-900/95 dark:bg-gray-100/95 text-white dark:text-gray-900 text-xs py-1.5 px-3 rounded-lg shadow-xl backdrop-blur-sm pointer-events-none transform -translate-x-1/2 -translate-y-full border border-white/10"
            style={{ 
              left: `${(hoveredPoint.x / svgWidth) * 100}%`, 
              top: `${(hoveredPoint.y / svgHeight) * 100 - 8}%` 
            }}
          >
            <div className="font-semibold">{hoveredPoint.title}</div>
            <div className="font-mono mt-0.5">{hoveredPoint.details}</div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
