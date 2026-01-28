import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectData from "./PlotData";
import AdminPanel from "../../components/PlotDraw/AdminPanel";
import PlotCanvas from "../../components/PlotDraw/PlotCanvas";
import PlotModal from "../../components/PlotDraw/PlotModal";
import { polygonArea } from "../../components/PlotDraw/geometry";
import { TOOLS } from "../../components/PlotDraw/Tools";

const ProjectDetail = ({ mood }) => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  const [tool, setTool] = useState(TOOLS.POLYGON);
  const [mainPlot, setMainPlot] = useState(null);
  const [plots, setPlots] = useState([]);
  const [selectedType, setSelectedType] = useState("FOR_SALE");
  const [selectedPlot, setSelectedPlot] = useState(null);

  useEffect(() => {
    const found = ProjectData.flatMap((p) => p.plots).find(
      (x) => x.id === projectId,
    );
    setProject(found || null);
  }, [projectId]);

  useEffect(() => {
    if (!project?.layout) return;

    setMainPlot({
      ...project.layout.mainPlot,
      area: polygonArea(project.layout.mainPlot.points),
    });

    setPlots(
      project.layout.plots.map((p) => ({
        ...p,
        area: polygonArea(p.points),
      })),
    );
  }, [project]);

  const updatePlot = (id, changes) => {
    setPlots((plots) =>
      plots.map((p) => {
        if (p.id !== id) return p;

        // 🔥 If function → dragging / resize
        if (typeof changes === "function") {
          return {
            ...p,
            points: changes(p.points),
          };
        }

        // 🔥 If object → modal edits
        return { ...p, ...changes };
      }),
    );
  };
  useEffect(() => {
    if (!selectedPlot) return;

    const fresh = plots.find((p) => p.id === selectedPlot.id);
    if (fresh) setSelectedPlot(fresh);
  }, [plots]);

  if (!project) return <p>Project not found</p>;

  return (
    <div className="plot-container product-detail">
      <h2>{project.name}</h2>

      <AdminPanel
        mood={mood}
        tool={tool}
        setTool={setTool}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        undoShape={() => setPlots((p) => p.slice(0, -1))}
        clearAll={() => {
          setMainPlot(null);
          setPlots([]);
        }}
      />

      <PlotCanvas
        mood={mood}
        tool={tool}
        mainPlot={mainPlot}
        setMainPlot={setMainPlot}
        plots={plots}
        setPlots={setPlots}
        selectedType={selectedType}
        onSelectPlot={setSelectedPlot}
        updatePlot={updatePlot}
      />

      {selectedPlot && (
        <PlotModal
          plot={selectedPlot}
          mood={mood}
          updatePlot={updatePlot}
          onClose={() => setSelectedPlot(null)}
        />
      )}
    </div>
  );
};

export default ProjectDetail;
