import React from "react";
import PolicyData from "../Data/PolicyData";

const CancellationPolicy = () => {
  return (
    <div>
      {PolicyData.map((item) => (
        <>
          {item.cancellationrefund.sections.map((s) => (
            <>
              {s.heading && <h4>{s.heading}</h4>}
              {s.content && <p>{s.content}</p>}
            </>
          ))}
        </>
      ))}
    </div>
  );
};

export default CancellationPolicy;
