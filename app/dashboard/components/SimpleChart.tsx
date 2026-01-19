"use client";

interface SimpleChartProps {
    data: number[][]; // [timestamp, price]
    color?: string;
}

export default function SimpleChart({ data, color = "#6366f1" }: SimpleChartProps) {
    if (!data || data.length === 0) return null;

    const width = 800;
    const height = 400;
    const padding = 20;

    // Find min and max for scaling
    const prices = data.map((d) => d[1]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Normalize points to SVG coordinates
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
        const normalizedPrice = (d[1] - minPrice) / priceRange;
        const y = height - padding - normalizedPrice * (height - 2 * padding);
        return `${x},${y}`;
    }).join(" ");

    // Create fill area path
    const firstPoint = points.split(" ")[0];
    const lastPoint = points.split(" ")[points.split(" ").length - 1];
    const fillPath = `M ${firstPoint} L ${points} L ${data.length > 0 ? width - padding : 0},${height} L ${padding},${height} Z`;

    return (
        <div className="w-full h-full relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                {/* Gradient Definition */}
                <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Grid Lines (Optional) */}
                <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />
                <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5,5" />
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />

                {/* Fill Area */}
                <path d={fillPath} fill="url(#chartGradient)" />

                {/* Stroke Line */}
                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                />
            </svg>
            <div className="absolute top-0 right-0 text-xs text-gray-500 font-mono">
                Max: ${maxPrice.toLocaleString()}
            </div>
            <div className="absolute bottom-0 right-0 text-xs text-gray-500 font-mono">
                Min: ${minPrice.toLocaleString()}
            </div>
        </div>
    );
}
