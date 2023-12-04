import React from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

const Layout = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return (
		<>
			<Navbar />
			<div className="flex">
				<Sidebar />
				<div className="ml-[70px] w-full">
					{children}
				</div>
			</div>
		</>
	)
};

export default Layout;