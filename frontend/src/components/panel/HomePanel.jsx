import LogList from "./logs-components/LogList";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

export default function HomePanel() {
  const { hasRole, hasPermission } = useContext(UserContext);

  return (
    <div className="flex flex-col text-4xl h-[500px] gap-10">
      <div>Welcome to the Dashboard!</div>
      {(hasRole("admin") || hasPermission("read_log")) && <LogList />}
    </div>
  );
}
