import React from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

function Home() {
  return (
    <div className="home">
      <div className="table-filters">
        <h2>Welcome Anokhi!</h2>
      </div>
        <Breadcrumb/>

      <div className="card big">
        <h3>Configure the Theme</h3>
        <p>Configuring theme colors and background options allows you to personalize the theme.</p>
        <div className="btns">
          <button className="btn primary">Configure</button>
          <button className="btn">Buy</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat">Earnings<br/><b>₹340</b></div>
        <div className="stat">Orders<br/><b>163</b></div>
        <div className="stat">Sessions<br/><b>742</b></div>
        <div className="stat">Comments<br/><b>182</b></div>
      </div>
    </div>
  );
}

export default Home;