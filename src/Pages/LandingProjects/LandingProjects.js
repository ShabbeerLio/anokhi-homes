import React from 'react'
import LBreadcrumb from '../../components/LandingPage/LBreadcrumb'
import PlotData from "../Plot/PlotData"
import PlotCardUsers from '../../components/Cards/PlotCardUsers'

const LandingProjects = () => {
    const plot = PlotData[0]
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
                <div className="plot-grid ">

                    {plot.plots.map((p, index) => (
                        <PlotCardUsers p={p} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default LandingProjects
