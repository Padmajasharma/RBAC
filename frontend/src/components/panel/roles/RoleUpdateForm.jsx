import axiosInstance from "../../../config/AxiosSetup";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiUrl from "../../../api";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function RoleUpdateForm() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [permissionOptions, setPermissionOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axiosInstance.get(`${apiUrl}/api/roles/${id}`).then((res) => {
        const { name, description, permissions } = res.data;
        setName(name);
        setDescription(description);
        if (permissions) {
          const permissionIds = permissions.map((permission) => permission);
          setPermissions(permissionIds);
        }
      });
      axiosInstance.get(`${apiUrl}/api/permissions`).then((res) => {
        setPermissionOptions(res.data);
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .put(`${apiUrl}/api/roles/${id}`, {
        name,
        description,
        permissions,
      })
      .then(() => {
        console.log("Role updated successfully");
        toast.success("Role updated successfully", { autoClose: 2000 });
        navigate("/dashboard/roles");
      })
      .catch((err) => {
        console.error("Error updating role", err);
        toast.error("Error updating role", { autoClose: 2000 });
      });
  };

  const handleDelete = () => {
    axiosInstance
      .delete(`${apiUrl}/api/roles/${id}`)
      .then(() => {
        console.log("Role deleted successfully");
        navigate("/dashboard/roles");
      })
      .catch((err) => {
        console.error("Error deleting role", err);
      });
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-3 text-2xl">
        <h1>Roles</h1>
      </div>
      <form className="flex w-full flex-row gap-4" onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="mb-4">
            <Label htmlFor="name" value="Role Name" />
            <TextInput
              id="name"
              type="text"
              value={name || name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description" value="Description" />
            <TextInput
              id="description"
              type="text"
              value={description || description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="permissions" value="Permissions" />
            {permissionOptions &&
              permissionOptions.map((permission) => (
                <div key={permission._id} className="flex items-center mb-2">
                  <Checkbox
                    id={`permission-${permission._id}`}
                    checked={permissions.includes(permission._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPermissions([...permissions, permission._id]);
                      } else {
                        setPermissions(
                          permissions.filter((id) => id !== permission._id)
                        );
                      }
                    }}
                  />
                  <Label
                    htmlFor={`permission-${permission._id}`}
                    className="ml-2"
                  >
                    {permission.name}
                  </Label>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col justify-start mt-6 w-full gap-2 ">
          <Button type="submit" className="w-2/6">
            Save
          </Button>
          <Button
            className="w-2/6 bg-red-800 text-white"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </form>
    </>
  );
}
