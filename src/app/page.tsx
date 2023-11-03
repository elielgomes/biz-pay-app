'use client'
import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import React from "react";
import api from "@/api";
import { ISignInData } from "@/interfaces";

const Home = () => {

	const { signIn } = useContext(AuthContext);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<LoginForm signIn={signIn} />
		</main>
	)
}

export default Home;