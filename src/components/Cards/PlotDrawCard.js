import React, { useEffect, useState } from "react";
import PlotModal from "../PlotDraw/PlotModal";
import PlotCanvas from "../PlotDraw/PlotCanvas";
import AdminPanel from "../PlotDraw/AdminPanel";
import { useNavigate, useParams } from "react-router-dom";
import { TOOLS } from "../PlotDraw/Tools";
import ProjectData from "../../Pages/Plot/PlotData";
import { polygonArea } from "../PlotDraw/geometry";

const PlotDrawCard = ({ mood }) => {
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

  const saveLayout = async () => {
  try {

    const layout = {
      mainPlot,
      plots
    };

    // const res = await fetch(
    //   `http://localhost:8000/api/colony/layout/${projectId}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ layout })
    //   }
    // );

    // const data = await res.json();

    console.log("Layout Saved", layout);

  } catch (error) {
    console.error(error);
  }
};

  return (
    <>
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
         saveLayout={saveLayout}
      />

      {selectedPlot && (
        <PlotModal
          plot={selectedPlot}
          mood={mood}
          updatePlot={updatePlot}
          onClose={() => setSelectedPlot(null)}
        />
      )}
    </>
  );
};

export default PlotDrawCard;
