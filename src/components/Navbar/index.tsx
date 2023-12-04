"use client"

import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { formatAvatarString } from "@/lib/avatarString";
import { Container } from "@/components/Container";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react";

const links = [
	{ name: "Home", path: "/dashboard" },
	{ name: "Funcionários", path: "/dashboard/funcionarios" },
	{ name: "Perfil", path: "/dashboard/perfil" },
];

export const Navbar = () => {

	const auth = useContext(AuthContext);

	return (
		<>
			<header className="w-full bg-white h-24 shadow-[0px_0px_20px_#00000011]">
				<div className="h-4 bg-gradient-to-r to-[#FF9B44] from-[#FC6075]"></div>
				<div className="ml-[70px] h-20">
					<Container className="flex items-center justify-end py-0 md:py-0 h-full">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div className="w-[40px] h-[40px] flex-shrink-0 bg-gradient-to-r to-[#FF9B44] from-[#FC6075] rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110">
									<span className="font-bold text-lg text-white leading-none">{auth?.user?.name && formatAvatarString(auth?.user?.name)}</span>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="text-slate-500" side="bottom">
								<DropdownMenuLabel>
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none">{auth.user?.name}</p>
										<p className="text-xs leading-none text-muted-foreground">
											{auth.user?.email}
										</p>
									</div>
								</DropdownMenuLabel>

								<DropdownMenuSeparator></DropdownMenuSeparator>

								<Link href="/dashboard/perfil">
									<DropdownMenuItem className="cursor-pointer">
										<span className="mr-2 h-4 w-4">
											<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path></svg>
										</span>
										<span>Perfil</span>
									</DropdownMenuItem>
								</Link>

								<DropdownMenuSeparator></DropdownMenuSeparator>

								<DropdownMenuItem onClick={() => auth.signOut()} className="cursor-pointer">
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>

							</DropdownMenuContent>
						</DropdownMenu>
					</Container>
				</div>
			</header>
		</>
	)
}
