import React from 'react'
import LBreadcrumb from '../../components/LandingPage/LBreadcrumb'
import PlotData from "../Plot/PlotData"
import PlotCard from '../../components/Cards/PlotCard'

const LandingProjects = () => {
    const plot = PlotData[0]
    return (
        <>
            <div className="landing-head">
                <div className="landing-top">
                    <h1>Projects</h1>
                </div>
                <LBreadcrumb />
            </div>
            <div className="landing-pages">
                <div className="plot-grid ">

                    {plot.plots.map((p, index) => (
                        <PlotCard p={p} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default LandingProjects
