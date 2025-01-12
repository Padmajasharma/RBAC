import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import baseUrl from "../api";
import { toast } from "react-toastify";
import { HiArrowLeft } from "react-icons/hi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, {
        email,
        password,
      });
      login(response.data.token);
      navigate("/dashboard");
      toast.success("Login successful", { autoClose: 2000 });
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full justify-center h-screen">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <form className="flex flex-col gap-4 min-w-96" onSubmit={handleSubmit}>
          <div className="align">
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Submit</Button>
          <div className="flex justify-between">
            <Link to="/">
              <HiArrowLeft className="text-xl text-blue-500" />
            </Link>
            <h2 className="text-gray-400">
              Already have an account?{" "}
              <Link to="/register" className="text-black">
                Register
              </Link>
            </h2>
          </div>
        </form>
        <div className="flex items-start flex-col justify-start min-w-96 text-sm text-gray-500">
          <h1 className="text-lg font-semibold text-center">Test Users</h1>
          <div className="grid grid-cols-2 gap-2">
            <div className="mt-1">
              <h3 className="font-semibold">Admin</h3>
              <p>Email: omavhad22@gmail.com</p>
              <p>Password: rbacPassword@1</p>
            </div>
            <div className="mt-1">
              <h3 className="font-semibold">Editor</h3>
              <p>Email: editor@gmail.com</p>
              <p>Password: rbacPassword@1</p>
            </div>
            <div className="mt-1">
              <h3 className="font-semibold">Author</h3>
              <p>Email: author1@gmail.com</p>
              <p>Password: rbacPassword@1</p>
              <p>Email: author2@gmail.com</p>
              <p>Password: rbacPassword@1</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
