import axiosInstance from "../../../config/AxiosSetup";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PermissionUpdateForm() {
  const { id } = useParams();
  const [permissionName, setPermissionName] = useState("");
  const [permissionDescription, setPermissionDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/api/permissions/${id}`).then((response) => {
      setPermissionName(response.data.name);
      setPermissionDescription(response.data.description);
    });
  }, [id]);

  const updatePermission = () => {
    axiosInstance
      .put(`/api/permissions/${id}`, {
        name: permissionName,
        description: permissionDescription,
      })
      .then((response) => {
        console.log(response);
        toast.success("Permission updated successfully", { autoClose: 2000 });
        navigate("/dashboard/permissions");
      })
      .catch((err) => {
        console.error("Error updating permission", err);
        toast.error("Error updating permission", { autoClose: 2000 });
      });
  };

  const handleDelete = () => {
    axiosInstance
      .delete(`/api/permissions/${id}`)
      .then(() => {
        console.log("Permission deleted successfully");
        toast.success("Permission deleted successfully", { autoClose: 2000 });
        navigate("/dashboard/permissions");
      })
      .catch((err) => {
        console.error("Error deleting permission", err);
        toast.error("Error deleting permission", { autoClose: 2000 });
      });
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-3 text-2xl">
        <h1>Permissions</h1>
      </div>
      <div className="flex w-full flex-row gap-4">
        <div className="w-full">
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
        </div>
        <div className="flex flex-col justify-start mt-8 w-full gap-2 ">
          <Button type="submit" className="w-2/6" onClick={updatePermission}>
            Save
          </Button>
          <Button
            className="w-2/6 bg-red-800 text-white"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
