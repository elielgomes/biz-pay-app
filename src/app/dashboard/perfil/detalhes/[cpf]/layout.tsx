import React, { Suspense } from "react";
import Loading from "./loading";

const Layout = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return (
		<>
			{children}
		</>
	)
};

export default Layout;