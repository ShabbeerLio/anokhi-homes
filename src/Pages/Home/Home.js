import React from "react";

function Home() {
  return (
    <div className="home">
      <h1>Welcome Anokhi!</h1>
      <p className="breadcrumb">Home / Dashboards / Default</p>

      <div className="card big">
        <h3>Configure the Theme</h3>
        <p>Configuring theme colors and background options allows you to personalize the theme.</p>
        <div className="btns">
          <button className="btn primary">Configure</button>
          <button className="btn">Buy</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat">Earnings<br/><b>$340</b></div>
        <div className="stat">Orders<br/><b>163</b></div>
        <div className="stat">Sessions<br/><b>742</b></div>
        <div className="stat">Comments<br/><b>182</b></div>
      </div>
    </div>
  );
}

export default Home;