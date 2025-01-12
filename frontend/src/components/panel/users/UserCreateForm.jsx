import axiosInstance from "../../../config/AxiosSetup";
import { useEffect, useState } from "react";
import apiUrl from "../../../api";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserCreateFrom() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [permissionOptions, setPermissionOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`${apiUrl}/api/roles`).then((res) => {
      setRoleOptions(res.data);
    });
    axiosInstance.get(`${apiUrl}/api/permissions`).then((res) => {
      setPermissionOptions(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
    ) {
      toast.error(
        "Password must be at least 8 characters, contain a number, a special character, and a capital letter",
        {
          autoClose: 2000,
        }
      );
      return;
    }

    axiosInstance
      .post(`${apiUrl}/api/users`, {
        name,
        email,
        password,
        roles,
        permissions,
      })
      .then((res) => {
        console.log(res);
        toast.success("User created successfully", { autoClose: 2000 });
        navigate("/dashboard/users");
      });
  };

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-row justify-between mb-3 text-2xl">
        <h1>Add User</h1>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="name@flowbite.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name1" value="Your name" />
        </div>
        <TextInput
          id="name1"
          type="name"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput
          id="password1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-row gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="role" value="Select Role" />
          </div>
          <div className="mb-2 block">
            {roleOptions.map((roleItem) => (
              <div key={roleItem._id} className="flex items-center gap-2">
                <Checkbox
                  id={`role-${roleItem._id}`}
                  value={roleItem._id}
                  checked={roles.includes(roleItem._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setRoles([...roles, roleItem._id]);
                    } else {
                      setRoles(roles.filter((r) => r !== roleItem._id));
                    }
                  }}
                />
                <Label htmlFor={`role-${roleItem._id}`}>{roleItem.name}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="permission" value="Select Permission" />
          </div>
          <div className="mb-2 block">
            {permissionOptions.map((permissionItem) => (
              <div key={permissionItem._id} className="flex items-center gap-2">
                <Checkbox
                  id={`permission-${permissionItem._id}`}
                  value={permissionItem._id}
                  checked={permissions.includes(permissionItem._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPermissions([...permissions, permissionItem._id]);
                    } else {
                      setPermissions(
                        permissions.filter((p) => p !== permissionItem._id)
                      );
                    }
                  }}
                />
                <Label htmlFor={`permission-${permissionItem._id}`}>
                  {permissionItem.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
}
