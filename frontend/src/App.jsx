import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/AdminPanel";
import UsersList from "./components/panel/users/UserList";
import UserUpdateForm from "./components/panel/users/UserUpdateForm";
import UserCreateFrom from "./components/panel/users/UserCreateForm";
import RoleList from "./components/panel/roles/RoleList";
import RoleCreateForm from "./components/panel/roles/RoleCreateForm";
import RoleForm from "./components/panel/roles/RoleUpdateForm";
import PermissionList from "./components/panel/permissions/PermissionList";
import PermissionCreateForm from "./components/panel/permissions/PermissionCreateForm";
import PermissionUpdateForm from "./components/panel/permissions/PermissionUpdateForm";
import ArticleList from "./components/panel/articles/ArticleList";
import ArticleCreateForm from "./components/panel/articles/ArticleCreateForm";
import ArticleUpdateForm from "./components/panel/articles/ArticleUpdateForm";
import HomePanel from "./components/panel/HomePanel";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <UserProvider>
                  <Dashboard />
                </UserProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePanel />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/add" element={<UserCreateFrom />} />
            <Route path="users/:id" element={<UserUpdateForm />} />
            <Route path="roles" element={<RoleList />} />
            <Route path="roles/add" element={<RoleCreateForm />} />
            <Route path="roles/:id" element={<RoleForm />} />
            <Route path="permissions" element={<PermissionList />} />
            <Route path="permissions/:id" element={<PermissionUpdateForm />} />
            <Route path="permissions/add" element={<PermissionCreateForm />} />
            <Route path="articles" element={<ArticleList />} />
            <Route path="articles/:id" element={<ArticleUpdateForm />} />
            <Route path="articles/add" element={<ArticleCreateForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
