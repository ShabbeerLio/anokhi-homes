import React, { useEffect, useState } from "react";
import ProjectDetail from "../Plot/ProjectDetail";
import LBreadcrumb from "../../components/LandingPage/LBreadcrumb";
import PlotCardUsers from "../../components/Cards/PlotCardUsers";
import PlotDrawCard from "../../components/Cards/PlotDrawCard";
import ProjectData from "../Plot/PlotData";
import { useParams } from "react-router-dom";

const LandingProjectDetail = () => {
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
        <>
            <div className="landing-head-box">
                <div className="landing-head">
                    <div className="landing-top">
                        <h1>Projects</h1>
                    </div>
                    <LBreadcrumb />
                </div>
            </div>
            <div className="landing-pages">
                <h2>{project.name}</h2>
                <PlotDrawCard />
            </div>
        </>
    );
};

export default LandingProjectDetail;
