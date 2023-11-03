"use client";

import React, { Suspense, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { ProfileCards } from "@/components/ProfileCards";
import { Container } from "@/components";
import Loading from "./loading";
import { IEmployee } from "@/interfaces";

const Perfil = () => {

	const auth = useContext(AuthContext);

	const [employee, setEmployee] = React.useState<IEmployee | null>(null);

	React.useEffect(() => {
		setEmployee(auth.user);
	}, [auth.user]);

	return (
		<div className="max-w-screen-xl mx-auto py-5 px-5 md:px-10 md:py-10">

			<div className="mb-8">
				<h1 className="text-2xl font-semibold">Perfil</h1>
			</div>

			<ProfileCards employee={employee} />

		</div>
	)
}

export default Perfil;
