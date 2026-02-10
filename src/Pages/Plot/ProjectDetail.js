import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectData from "./PlotData";
import AdminPanel from "../../components/PlotDraw/AdminPanel";
import PlotCanvas from "../../components/PlotDraw/PlotCanvas";
import PlotModal from "../../components/PlotDraw/PlotModal";
import { polygonArea } from "../../components/PlotDraw/geometry";
import { TOOLS } from "../../components/PlotDraw/Tools";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { ChevronLeft } from "lucide-react";
import PlotDrawCard from "../../components/Cards/PlotDrawCard";

const ProjectDetail = ({ mood }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  useEffect(() => {
    const found = ProjectData.flatMap((p) => p.plots).find(
      (x) => x.id === projectId,
    );
    setProject(found || null);
  }, [projectId]);

  if (!project) return <p>Project not found</p>;

  return (
    <div className="plot-container product-detail">
      <div className="table-filters">
        <div className="page-tools">
          <ChevronLeft className="back-button" onClick={() => navigate(-1)} />
          <h2>{project.name}</h2>
        </div>
      </div>
      <Breadcrumb />
      <PlotDrawCard mood={mood} />
    </div>
  );
};

export default ProjectDetail;
