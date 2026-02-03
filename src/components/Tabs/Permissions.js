const Permissions = () => {
  return (
    <>
      <table className="profile-card card">
        <thead>
          <tr>
            <th>Type</th>
            <th>View</th>
            <th>Create</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {["Product", "Category", "User", "Project"].map((t) => (
            <tr key={t}>
              <td>{t}</td>
              <td>✔</td>
              <td>✔</td>
              <td>✔</td>
              <td>✖</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Permissions;