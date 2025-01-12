import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../config/AxiosSetup";
import { Label, TextInput, Button, Checkbox } from "flowbite-react";
import { toast } from "react-toastify";

const RoleCreateForm = () => {
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [permissionOptions, setPermissionOptions] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/permissions").then((res) => {
      setPermissionOptions(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/api/roles", {
        name: roleName,
        description,
      })
      .then(() => {
        console.log("Role created successfully");
        toast.success("Role created successfully", { autoClose: 2000 });
        navigate("/dashboard/roles");
      })
      .catch((err) => {
        console.error("Error creating role", err);
        toast.error("Error creating role", { autoClose: 2000 });
      });
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-3 text-2xl">
        <h1>Roles</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
        <div>
          <Label htmlFor="roleName" value="Role Name" />
          <TextInput
            type="text"
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
            className="form-input mt-1 block w-full"
          />
        </div>
        <div>
          <Label htmlFor="description" value="Description" />
          <TextInput
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-textarea mt-1 block w-full"
          />
        </div>
        <div>
          <Label htmlFor="permissions" value="Permissions" />
          <div className="flex flex-wrap gap-4">
            {permissionOptions.map((permission) => (
              <div key={permission.id}>
                <Checkbox
                  id={permission.id}
                  value={permission.id}
                  checked={permissions.includes(permission.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPermissions([...permissions, permission.id]);
                    } else {
                      setPermissions(
                        permissions.filter((id) => id !== permission.id)
                      );
                    }
                  }}
                />
                <Label
                  className="ml-2"
                  htmlFor={permission.id}
                  value={permission.name}
                />
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" className="btn btn-primary mt-4">
          Create Role
        </Button>
      </form>
    </>
  );
};

export default RoleCreateForm;
