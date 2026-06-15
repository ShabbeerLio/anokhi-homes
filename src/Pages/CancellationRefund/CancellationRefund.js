import React from "react";
import LBreadcrumb from "../../components/LandingPage/LBreadcrumb";
import PolicyData from "../../components/Data/PolicyData";

const CancellationRefund = ({ data }) => {
  console.log(data, "policies");
  return (
    <>
      <div className="landing-head-box">
        <div className="landing-head">
          <div className="landing-top">
            <h1>Cancellation and Refund Policy</h1>
          </div>
          <LBreadcrumb />
        </div>
      </div>

      <div className="landing-pages">
        {data?.policies?.cancellationrefund?.sections?.map((section) => (
          <div key={section._id}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.content && <p>{section.content}</p>}
          </div>
        ))}
      </div>
    </>
  );
};

export default CancellationRefund;
