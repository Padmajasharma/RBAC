import axiosInstance from "../../../config/AxiosSetup";
import { useEffect, useState } from "react";
import apiUrl from "../../../api";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import { useNavigate } from "react-router";

export default function RoleList() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`${apiUrl}/api/roles`)
      .then((res) => {
        console.log(res);
        setRoles(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between mb-3 text-2xl">
        <h1>Roles</h1>
        <Button onClick={() => navigate(`/dashboard/roles/add`)}>Add</Button>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Permissions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {roles.map((role, index) => (
            <Table.Row key={role.id}>
              <Table.Cell>{index+1}</Table.Cell>
              <Link to={`${role._id}`}>
                <Table.Cell>{role.name}</Table.Cell>
              </Link>
              <Table.Cell>{role.description}</Table.Cell>
              <Table.Cell
                style={{
                  maxWidth: "200px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {role.permissions
                  .map((permission) => permission.name)
                  .join(", ")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="flex items-center justify-center p-10">
        {loading && <Spinner size="lg"/>}
      </div>
    </>
  );
}
