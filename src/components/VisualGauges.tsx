import React, { useState } from "react";
import { AuditReport, MatrixItem } from "../types";

interface VisualGaugesProps {
  report: AuditReport;
}

export default function VisualGauges({ report }: VisualGaugesProps) {
  const [selectedMatrixItem, setSelectedMatrixItem] = useState<MatrixItem | null>(null);
  const [hoveredTrendIndex, setHoveredTrendIndex] = useState<number | null>(null);

  // Helper to render circle gauge path dash offsets
  const getCircleOffset = (points: number, radius: number) => {
    const circumference = 2 * Math.PI * radius;
    return circumference - (points / 100) * circumference;
  };

  // Coordinates for the trend line chart
  const paddingX = 40;
  const paddingY = 30;
  const chartHeight = 160;
  const chartWidth = 500;

  // Max score is 100
  const trendPoints = report.historicalTrend || [];
  const spacingX = trendPoints.length > 1 ? (chartWidth - paddingX * 2) / (trendPoints.length - 1) : 0;

  // Helper to get svg coordinates
  const getCoordinates = () => {
    return trendPoints.map((point, index) => {
      const x = paddingX + index * spacingX;
      // invert y (0 at top, 100 at bottom)
      const ratio = point.score / 100;
      const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
      return { x, y, ...point };
    });
  };

  const svgCoords = getCoordinates();

  // Create path data for line
  const createLinePath = () => {
    if (svgCoords.length === 0) return "";
    return svgCoords.reduce((path, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
    }, "");
  };

  // Create area fill path data
  const createAreaPath = () => {
    if (svgCoords.length === 0) return "";
    const first = svgCoords[0];
    const last = svgCoords[svgCoords.length - 1];
    const linePath = createLinePath();
    const basePath = ` L ${last.x} ${chartHeight - paddingY} L ${first.x} ${chartHeight - paddingY} Z`;
    return `${linePath}${basePath}`;
  };

  const linePath = createLinePath();
  const areaPath = createAreaPath();

  // Color mappings for matrix classes
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Quick Win":
        return "bg-emerald-500 text-white border-emerald-600 shadow-emerald-100 dark:shadow-none";
      case "Strategic Focus":
        return "bg-blue-500 text-white border-blue-600 shadow-blue-100 dark:shadow-none";
      case "Fill Content Gap":
        return "bg-amber-500 text-slate-900 border-amber-600 shadow-amber-100 dark:shadow-none";
      default:
        return "bg-slate-500 text-white border-slate-600 shadow-slate-100 dark:shadow-none";
    }
  };

  return (
    <div id="visual-gauges-section" className="space-y-6">
      {/* Metric Gauges Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Core AI Visibility Gauge */}
        <div id="overall-gauge-card" className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Overall Score</h4>
          
          <div className="relative w-36 h-36 flex items-center justify-center select-none">
            {/* SVG circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="56"
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="56"
                className="stroke-blue-600 dark:stroke-blue-500 transition-all duration-1000 ease-out"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={getCircleOffset(report.overallScore, 56)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                {report.overallScore}
              </span>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-1 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50">
                Grade {report.grade}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 leading-normal max-w-[170px]">
            Weighted synthesis of AI indexability, schemas &amp; trust channels.
          </p>
        </div>

        {/* Entity Score Gauge */}
        <div id="entity-gauge-card" className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Entity Understanding</h4>
          
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="44" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="8" fill="transparent" />
              <circle
                cx="56"
                cy="56"
                r="44"
                className="stroke-purple-600 dark:stroke-purple-500 transition-all duration-1000"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={getCircleOffset(report.entity.score, 44)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-2xl font-black text-slate-900 dark:text-white">
              {report.entity.score}%
            </div>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4">
            How well search systems map your brand entity graphs.
          </p>
        </div>

        {/* Authority Score Gauge */}
        <div id="authority-gauge-card" className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Authority &amp; Trust</h4>
          
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="44" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="8" fill="transparent" />
              <circle
                cx="56"
                cy="56"
                r="44"
                className="stroke-emerald-600 dark:stroke-emerald-500 transition-all duration-1000"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={getCircleOffset(report.authority.score, 44)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-2xl font-black text-slate-900 dark:text-white">
              {report.authority.score}%
            </div>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4">
            Trust citations and brand references in active neural weights.
          </p>
        </div>

        {/* Content Score Gauge */}
        <div id="content-gauge-card" className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Content Understanding</h4>
          
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="44" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="8" fill="transparent" />
              <circle
                cx="56"
                cy="56"
                r="44"
                className="stroke-amber-600 dark:stroke-amber-500 transition-all duration-1000"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={getCircleOffset(report.content.score, 44)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-2xl font-black text-slate-900 dark:text-white">
              {report.content.score}%
            </div>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4">
            Semantic utility and density of your core text topics.
          </p>
        </div>
      </div>

      {/* Charts Block */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Historical Trend Chart */}
        <div id="trend-chart-card" className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">Visibility Trend</h4>
              <p className="text-xs text-slate-400 dark:text-slate-400">Score variations over preceding quarters</p>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30 px-2 py-0.5 rounded-md border border-blue-100/50 dark:border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-650 animate-pulse" />
              <span>Historical Index</span>
            </div>
          </div>

          <div className="flex-1 w-full flex items-center justify-center min-h-[180px]">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="trend-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[25, 50, 75, 100].map((level) => {
                const ratio = level / 100;
                const lineY = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
                return (
                  <g key={level}>
                    <line
                      x1={paddingX}
                      y1={lineY}
                      x2={chartWidth - paddingX}
                      y2={lineY}
                      className="stroke-slate-100 dark:stroke-slate-800/80"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={paddingX - 10}
                      y={lineY + 4}
                      className="fill-slate-400 dark:fill-slate-500 font-mono text-[9px] text-right"
                      textAnchor="end"
                    >
                      {level}
                    </text>
                  </g>
                );
              })}

              {/* Gradient Area Fill */}
              {areaPath && (
                <path d={areaPath} fill="url(#trend-gradient)" className="transition-all duration-700" />
              )}

              {/* Connecting Line */}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  className="stroke-blue-600 dark:stroke-blue-500 transition-all duration-700"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              )}

              {/* Interactive Dots and Labels */}
              {svgCoords.map((coord, i) => (
                <g
                  key={i}
                  onMouseEnter={() => setHoveredTrendIndex(i)}
                  onMouseLeave={() => setHoveredTrendIndex(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r="5"
                    className="fill-white stroke-blue-600 dark:fill-slate-950 dark:stroke-blue-400 stroke-2 transition-all hover:scale-150"
                  />
                  {hoveredTrendIndex === i && (
                    <circle cx={coord.x} cy={coord.y} r="10" className="fill-blue-500/20 animated-pulse transition-all pointer-events-none" />
                  )}
                  
                  {/* Axis labels */}
                  <text
                    x={coord.x}
                    y={chartHeight - paddingY + 20}
                    className="fill-slate-500 dark:fill-slate-400 font-sans text-[10px] font-semibold"
                    textAnchor="middle"
                  >
                    {coord.month}
                  </text>
                  
                  {/* Hover or Dot Values */}
                  <text
                    x={coord.x}
                    y={coord.y - 12}
                    className={`font-mono text-[10px] font-bold fill-indigo-650 dark:fill-indigo-400 text-center transition-opacity duration-250 ${hoveredTrendIndex === i ? "opacity-100" : "opacity-0 md:opacity-70"}`}
                    textAnchor="middle"
                  >
                    {coord.score}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Opportunity Matrix Scatter Plot */}
        <div id="matrix-card" className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">Opportunity Matrix</h4>
              <p className="text-xs text-slate-400 dark:text-slate-400">Positioning recommendations by Urgency &amp; Impact</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-800">
              Quadrant Plot
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            {/* Plot area */}
            <div className="sm:col-span-2 relative h-[180px] bg-slate-50/50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-800/80 p-2 overflow-hidden">
              {/* Quadrant Lines */}
              <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-slate-200 dark:border-slate-800" />
              <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-200 dark:border-slate-800" />

              {/* Quadrant Titles */}
              <div className="absolute top-2 left-2 text-[8px] uppercase tracking-wider font-bold text-slate-400 select-none">Strategic Focus</div>
              <div className="absolute top-2 right-2 text-[8px] uppercase tracking-wider font-bold text-slate-400 select-none">Quick Wins</div>
              <div className="absolute bottom-2 left-2 text-[8px] uppercase tracking-wider font-bold text-slate-400 select-none">Monitor Gaps</div>
              <div className="absolute bottom-2 right-2 text-[8px] uppercase tracking-wider font-bold text-slate-400 select-none">Nice to Have</div>

              {/* Axis labels */}
              <div className="absolute bottom-1 font-semibold text-[8px] text-slate-400 select-none w-full text-center">Urgency (Importance) →</div>
              <div className="absolute left-1 top-1/2 -rotate-90 origin-left font-semibold text-[8px] text-slate-400 select-none transform translate-y-8">Influence (Impact) →</div>

              {/* Render items */}
              {(report.matrix || []).map((item, index) => {
                // X (urgency), Y (influence) 0 to 100
                const left = `${Math.max(10, Math.min(90, item.urgency))}%`;
                const bottom = `${Math.max(10, Math.min(90, item.influence))}%`;
                const isSelected = selectedMatrixItem?.name === item.name;

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedMatrixItem(item)}
                    style={{ left, bottom }}
                    className={`absolute w-3.5 h-3.5 rounded-full border-2 transform -translate-x-1/2 translate-y-1/2 cursor-pointer transition-all hover:scale-150 flex items-center justify-center ${
                      item.category === "Quick Win"
                        ? "bg-emerald-500 border-white dark:border-slate-950 hover:bg-emerald-400"
                        : item.category === "Strategic Focus"
                        ? "bg-blue-500 border-white dark:border-slate-950 hover:bg-blue-400"
                        : "bg-amber-500 border-white dark:border-slate-950 hover:bg-amber-400"
                    } ${isSelected ? "ring-4 ring-offset-2 ring-blue-500 scale-125 z-10" : ""}`}
                    title={`${item.name} (Urgency: ${item.urgency}, Influence: ${item.influence})`}
                  />
                );
              })}
            </div>

            {/* Matrix Details Panel */}
            <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-white dark:bg-slate-950/50 flex flex-col justify-center text-xs space-y-2">
              {selectedMatrixItem ? (
                <div>
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getCategoryColor(selectedMatrixItem.category)} mb-1.5`}>
                    {selectedMatrixItem.category}
                  </span>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                    {selectedMatrixItem.name}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/80 pt-2">
                    <div>
                      <span>Urgency: </span>
                      <strong className="text-slate-700 dark:text-slate-300">{selectedMatrixItem.urgency}</strong>
                    </div>
                    <div>
                      <span>Influence: </span>
                      <strong className="text-slate-700 dark:text-slate-300">{selectedMatrixItem.influence}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-400 dark:text-slate-500 py-4 flex flex-col items-center">
                  <svg className="w-8 h-8 text-slate-300 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-3.47 3.012-3.012A9 9 0 1113.684 16.6z" />
                  </svg>
                  <span className="font-medium text-[11px]">Click matrix plot points to explore prioritizations.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
