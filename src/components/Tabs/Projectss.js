const Projectss = () => {
  return (
    <>
      <div className="project-grid">
        {["Pixel Pioneer", "Eco Track", "Sound Forge"].map((p) => (
          <div key={p} className="profile-card card">
            <h4>{p}</h4>
            <p>Public</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Projectss;