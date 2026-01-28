import { useRef, useState } from "react";
import PlotPolygon from "./PlotPolygon";
import { TOOLS } from "./Tools";
import { polygonArea, polygonInside, polygonsOverlap } from "./geometry";
import Compass from "./Compass";

export default function PlotCanvas({
  mood,
  tool,
  mainPlot,
  setMainPlot,
  plots,
  setPlots,
  selectedType,
  onSelectPlot,
  updatePlot,
}) {
  const svgRef = useRef(null);

  const [points, setPoints] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [previewShape, setPreviewShape] = useState(null);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [panning, setPanning] = useState(false);
  const panStart = useRef(null);

  /* ---------- helpers ---------- */

  const getPoint = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    return [
      (e.clientX - rect.left - offset.x) / scale,
      (e.clientY - rect.top - offset.y) / scale,
    ];
  };

  const buildRectangle = ([x1, y1], [x2, y2], square = false) => {
    if (square) {
      const size = Math.min(Math.abs(x2 - x1), Math.abs(y2 - y1));
      x2 = x1 + size * Math.sign(x2 - x1);
      y2 = y1 + size * Math.sign(y2 - y1);
    }
    return [
      [x1, y1],
      [x2, y1],
      [x2, y2],
      [x1, y2],
    ];
  };

  const buildCircle = ([cx, cy], [px, py]) => {
    const r = Math.hypot(px - cx, py - cy);
    return Array.from({ length: 32 }).map((_, i) => {
      const a = (i / 32) * Math.PI * 2;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    });
  };

  /* ---------- mouse handlers ---------- */

  const handleMouseDown = (e) => {
    if (mood !== "admin") return;

    // middle mouse → pan
    if (e.button === 1) {
      setPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY };
      return;
    }

    const p = getPoint(e);

    if (
      tool === TOOLS.RECTANGLE ||
      tool === TOOLS.SQUARE ||
      tool === TOOLS.CIRCLE
    ) {
      setStartPoint(p);
      setIsDragging(true);
    } else {
      setPoints((prev) => [...prev, p]);
    }
  };

  const handleMouseMove = (e) => {
    if (panning) {
      setOffset((o) => ({
        x: o.x + (e.clientX - panStart.current.x),
        y: o.y + (e.clientY - panStart.current.y),
      }));
      panStart.current = { x: e.clientX, y: e.clientY };
      return;
    }

    if (!isDragging || !startPoint) return;
    const p = getPoint(e);

    if (tool === TOOLS.RECTANGLE)
      setPreviewShape(buildRectangle(startPoint, p));
    if (tool === TOOLS.SQUARE)
      setPreviewShape(buildRectangle(startPoint, p, true));
    if (tool === TOOLS.CIRCLE) setPreviewShape(buildCircle(startPoint, p));
  };

  const handleMouseUp = () => {
    if (panning) {
      setPanning(false);
      return;
    }

    if (!previewShape) return;
    const shape = previewShape;

    if (!mainPlot) {
      setMainPlot({
        id: "MAIN",
        points: shape,
        plotType: "NOT_FOR_SALE",
        area: polygonArea(shape),
      });
      resetDrag();
      return;
    }

    if (!polygonInside(shape, mainPlot.points)) {
      resetDrag();
      return;
    }

    for (const p of plots) {
      if (polygonsOverlap(shape, p.points)) {
        resetDrag();
        return;
      }
    }

    setPlots((p) => [
      ...p,
      {
        id: `P-${p.length + 1}`,
        points: shape,
        plotType: selectedType,
        area: polygonArea(shape),
      },
    ]);

    resetDrag();
  };

  const resetDrag = () => {
    setIsDragging(false);
    setStartPoint(null);
    setPreviewShape(null);
  };

  const finishPolygonOrLine = () => {
    let shape = [];

    if (tool === TOOLS.POLYGON && points.length >= 3) shape = points;
    if (tool === TOOLS.LINE && points.length === 2) shape = points;

    if (!shape.length) return;

    if (!polygonInside(shape, mainPlot.points)) {
      setPoints([]);
      return;
    }

    for (const p of plots) {
      if (polygonsOverlap(shape, p.points)) {
        setPoints([]);
        return;
      }
    }

    setPlots((p) => [
      ...p,
      {
        id: `P-${p.length + 1}`,
        points: shape,
        plotType: selectedType,
        area: polygonArea(shape),
      },
    ]);

    setPoints([]);
  };

  const erasePlot = (id) => {
    setPlots((p) => p.filter((x) => x.id !== id));
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((s) => Math.min(Math.max(0.4, s + delta), 3));
  };

  return (
    <div className="plot-draw card">
      <Compass />

      <svg
        ref={svgRef}
        width="100%"
        height="500"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          background: "#f8fafc",
          cursor: panning ? "grabbing" : "crosshair",
        }}
      >
        <g transform={`translate(${offset.x},${offset.y}) scale(${scale})`}>
          {mainPlot && (
            <polygon
              points={mainPlot.points.map((p) => p.join(",")).join(" ")}
              fill="#e5e7eb"
              stroke="black"
              strokeWidth={2}
            />
          )}

          {previewShape && (
            <polygon
              points={previewShape.map((p) => p.join(",")).join(" ")}
              fill="rgba(59,130,246,0.2)"
              stroke="#2563eb"
              strokeDasharray="5"
            />
          )}

          {plots.map((p) => (
            <PlotPolygon
              key={p.id}
              plot={p}
              mood={mood}
              scale={scale}
              mainPlot={mainPlot}
              plots={plots}
              updatePlot={updatePlot}
              onSelect={(plot) =>
                tool === TOOLS.ERASE ? erasePlot(plot.id) : onSelectPlot(plot)
              }
            />
          ))}

          {points.length > 0 && (
            <polyline
              points={points.map((p) => p.join(",")).join(" ")}
              fill="none"
              stroke="blue"
              strokeDasharray="5"
            />
          )}
        </g>
      </svg>

      {mood === "admin" && (
        <button className="finish-btn" onClick={finishPolygonOrLine}>
          Finish
        </button>
      )}
    </div>
  );
}
