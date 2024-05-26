import { useContext, useEffect, useState } from "react";
import Title from "../../../../components/Admin/Page-title/title";
import AdminContext from "../../../../context/AdminContext";

const Users = () => {
  const { users, setUsers, userLoading, makeClient } = useContext(AdminContext);
  const [admins, setAdmins] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setAdmins(
      users?.filter((user) => user.role === "admin" || user.role === "superadmin")
    );
    setClients(users?.filter((user) => user.role === "client"));
  }, [users]);

  if (userLoading) return <h1>Loading...</h1>;
  return (
    <div className="Users">
      <Title title="Users" />
      <h2>Total users: {users.length}</h2>
      <div className="User_Container">
        <h1>Admins</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Change role</th>
            </tr>
            {admins?.map((user) => {
              return (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={makeClient}>Make client</button>
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>

        <h1>Clients</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Change role</th>
            </tr>
            {clients?.map((user) => {
              return (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button>Make Admin</button>
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Users;
