import React from "react";
import "./About.css";
import { Cctv, Trees } from "lucide-react";
import { TbRoad } from "react-icons/tb";
import { MdOutlineTempleHindu } from "react-icons/md";
import { GiDoubleStreetLights } from "react-icons/gi";
import { GiWaterfall } from "react-icons/gi";

const About = ({ data }) => {
  // console.log(data,"data")
  const items = [
    { title: "Security", icons: <Cctv /> },
    { title: "Road", icons: <TbRoad /> },
    { title: "Park", icons: <Trees /> },
    { title: "Temple", icons: <MdOutlineTempleHindu /> },
    { title: "Street Light", icons: <GiDoubleStreetLights /> },
    { title: "Drainage", icons: <GiWaterfall /> },
  ];
  return (
    <div className="landing-pages home-about">
      <h2 className="landing-title">
        {data?.about?.title?.split(" ").slice(0, -2).join(" ")}
        <span> {data?.about?.title?.split(" ").slice(-2).join(" ")}</span>
      </h2>
      {/* <h2>{data?.about?.title}</h2> */}

      <div className="about-box">
        {/* <div className="about-right">
          <img
            src={
              data?.about?.image
                ? data?.about?.image
                : "https://images.unsplash.com/photo-1591389703635-e15a07b842d7?q=80&w=2833&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt=""
          />
        </div> */}
        <div className="about-left">
          <p>{data?.about?.description}</p>
          <p>{data?.about?.subdescription}</p>
        </div>
      </div>
      {/* <div className="about-amities">
        <h3>Our Amenities</h3>
        <div className="feature-grid">
          {items.map((f) => (
            <div key={f.title} className="feature-card card">
              <span>{f.icons}</span>
              <h3>{f.title}</h3>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default About;
