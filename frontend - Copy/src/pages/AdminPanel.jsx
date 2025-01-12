import { CustomSideBar } from "../components/panel/Sidebar"
import { Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="flex flex-row">
            <CustomSideBar />
            <div className="flex-1 p-3 overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}