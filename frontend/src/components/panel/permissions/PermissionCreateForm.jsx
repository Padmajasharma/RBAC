import axiosInstance from "../../../config/AxiosSetup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";
import { toast } from "react-toastify";

export default function PermissionCreateForm() {
  const [permissionName, setPermissionName] = useState("");
  const [permissionDescription, setPermissionDescription] = useState("");
  const navigate = useNavigate();

  const createPermission = () => {
    axiosInstance
      .post("/api/permissions", {
        name: permissionName,
        description: permissionDescription,
      })
      .then((response) => {
        console.log(response);
        toast.success("Permission created successfully", { autoClose: 2000 });
        navigate("/dashboard/permissions");
      });
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-3 text-2xl">
        <h1>Permissions</h1>
      </div>
      <div className="flex max-w-md flex-col gap-4">
        <Label>Name</Label>
        <TextInput
          value={permissionName}
          onChange={(e) => setPermissionName(e.target.value)}
        />
        <Label>Description</Label>
        <TextInput
          value={permissionDescription}
          onChange={(e) => setPermissionDescription(e.target.value)}
        />
        <Button onClick={createPermission}>Create</Button>
      </div>
    </>
  );
}
