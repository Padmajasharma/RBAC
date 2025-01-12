import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import baseUrl from "../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // check if password is at least 8 characters, contains a number, and a special character and capital letter
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

      const response = await axios.post(`${baseUrl}/api/auth/register`, {
        name,
        email,
        password,
      });

      login(response.data.token);
      navigate("/dashboard");
      toast.success("Login successful");
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full justify-center h-screen">
        <h1 className="text-2xl font-semibold text-center">Register</h1>
        <form className="flex flex-col gap-4 min-w-96" onSubmit={handleSubmit}>
          <div className="align">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              id="name1"
              type="name1"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="align">
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@example.com"
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
              <Link to="/login" className="text-black">
                Login
              </Link>
            </h2>
          </div>
        </form>
      </div>
    </>
  );
}
