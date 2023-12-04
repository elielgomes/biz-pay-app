"use client";

import React, { Suspense, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { ProfileCards } from "@/components/ProfileCards";
import { Container } from "@/components/Container";
import { IEmployee } from "@/interfaces";
import { Separator } from "@/components/ui/separator";
import Loading from "./loading";

const Perfil = () => {

	const auth = useContext(AuthContext);

	const [employee, setEmployee] = React.useState<IEmployee | null>(null);

	React.useEffect(() => {
		setEmployee(auth.user);
	}, [auth.user]);

	return (
		employee ? (
			<Container>
				<div className="mb-8">
					<h1 className="text-2xl font-semibold text-slate-700">Perfil</h1>
					<Separator className="w-[100px] h-1 rounded-md bg-gradient-to-r to-[#FF9B44] from-[#FC6075]" />
				</div>
				<ProfileCards employee={employee} />
			</Container>
		) : (
			<Loading />
		)
	)
}

export default Perfil;
