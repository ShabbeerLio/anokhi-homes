import React from 'react'
import LBreadcrumb from '../../components/LandingPage/LBreadcrumb'
import PolicyData from '../../components/Data/PolicyData'

const TermCondition = () => {
  return (
     <>
            <div className="landing-head-box">

                <div className="landing-head">
                    <div className="landing-top">
                        <h1>Terms & Conditions</h1>
                    </div>
                    <LBreadcrumb />
                </div>
            </div>

            <div className="landing-pages">
                {PolicyData.map((item) => (
                    <>
                        {item.termcondition.sections.map((s) =>
                            <>
                                {s.heading && <h2>{s.heading}</h2>}
                                {s.content && <p>{s.content}</p>}
                            </>
                        )}
                    </>
                ))}
            </div>
    </>
  )
}

export default TermCondition
