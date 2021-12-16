import AdminList from "./AdminTable";

function AdminDash() {
  return (
    <div className="container">
      <div>
        <h1 className="text-center p-4 text-white">Administration Dashboard</h1>
      </div>
      <div>
        <AdminList />
      </div>
    </div>
  );
}

export default AdminDash;
