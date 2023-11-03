"use client"

import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";

const links = [
	{ name: "Home", path: "/dashboard" },
	{ name: "Funcionários", path: "/dashboard/funcionarios" },
	{ name: "Perfil", path: "/dashboard/perfil" },
];

export const Navbar = () => {

	const auth = useContext(AuthContext);

	return (
		<>
			<header className="w-full bg-white">
				<div className="h-8 bg-gradient-to-r from-[#FF9B44]  to-[#FC6075]">

				</div>
				<div className="max-w-screen-xl mx-auto px-5 md:px-10">
					<nav className="h-16 flex items-center">
						<ul className="flex gap-4">
							{
								links.map((link) => (
									<li key={link.path}>
										<Link href={link.path}>{link.name}</Link>
									</li>
								))
							}
						</ul>
					</nav>
				</div>
			</header>
		</>
	)
}
