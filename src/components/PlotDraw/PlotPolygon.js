import { PLOT_COLORS } from "./plotStyles";
import { useRef, useState } from "react";
import { polygonInside, polygonsOverlap } from "./geometry";

export default function PlotPolygon({
  plot,
  updatePlot,
  onSelect,
  mood,
  scale,
  mainPlot,
  plots,
}) {
  const center = plot.points
    .reduce((a, p) => [a[0] + p[0], a[1] + p[1]], [0, 0])
    .map((v) => v / plot.points.length);

  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);

  const startDrag = (e) => {
    if (mood !== "admin") return;
    e.stopPropagation();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const dragMove = (e) => {
    if (!dragging) return;
    e.stopPropagation();

    const dx = (e.clientX - dragStart.current.x) / scale;
    const dy = (e.clientY - dragStart.current.y) / scale;

    const nextPoints = plot.points.map(([x, y]) => [x + dx, y + dy]);

    /* ---------- VALIDATION ---------- */

    // 🚫 Must stay inside MAIN (except ROAD)
    if (
      plot.plotType !== "ROAD" &&
      mainPlot &&
      !polygonInside(nextPoints, mainPlot.points)
    ) {
      return;
    }

    // 🚫 ROAD must stay outside MAIN
    if (
      plot.plotType === "ROAD" &&
      mainPlot &&
      polygonInside(nextPoints, mainPlot.points)
    ) {
      return;
    }

    // 🚫 Must not overlap other plots
    for (const p of plots) {
      if (p.id === plot.id) continue;
      if (polygonsOverlap(nextPoints, p.points)) {
        return;
      }
    }

    /* ---------- APPLY MOVE ---------- */
    updatePlot(plot.id, () => nextPoints);

    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const stopDrag = () => setDragging(false);

  return (
    <>
      <polygon
        points={plot.points.map((p) => p.join(",")).join(" ")}
        fill={PLOT_COLORS[plot.plotType]}
        stroke="#374151"
        strokeDasharray={plot.plotType === "ROAD" ? "8 4" : "0"}
        onMouseDown={startDrag}
        onMouseMove={dragMove}
        onMouseUp={stopDrag}
        onClick={(e) => {
          e.stopPropagation();
          onSelect && onSelect(plot);
        }}
        style={{
          cursor: mood === "admin" ? "move" : "pointer",
        }}
      />

      <text
        x={center[0]}
        y={center[1]}
        textAnchor="middle"
        fontSize="12"
        fill="#111827"
        pointerEvents="none"
      >
        {plot.name || plot.id}
      </text>
    </>
  );
}