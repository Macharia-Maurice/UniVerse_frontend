import React from "react";
import NavBar from "../../components/ui/MyComponents/NavBar";
import Sidebar from "../../components/ui/MyComponents/SideBar";
import RequireAuth from "@/redux/features/auth/RequireAuth";

const layout = ({ children }) => {
	return (
		// <RequireAuth>
		<div className="relative w-full border  bg-gray-200 dark:bg-gray-900 min-h-screen">
			<NavBar className="fixed top-0 bg-muted z-30" />
			<Sidebar className="fixed top-[6rem] bottom-0 bg-muted z-30 w-[23.5%]" />
			<div className="mt-[7rem] ml-[27rem]">{children}</div>
		</div>
		// </RequireAuth>
	);
};

export default layout;
