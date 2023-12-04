"use client"

import { Container } from "@/components";
import { Separator } from "@/components/ui/separator";
import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { PayslipEmployeeDataTable } from "@/components/PayslipEmployeeDataTable";

const Holerites: React.FC = () => {
	const { user } = useContext(AuthContext);
	return (
		<>
			<Container>
				<div className="mb-8">
					<h1 className="text-2xl font-semibold text-slate-700">Holerites</h1>
					<Separator className="w-[100px] h-1 rounded-md bg-gradient-to-r to-[#FF9B44] from-[#FC6075]" />
				</div>
				<PayslipEmployeeDataTable employeeCpf={user?.cpf} />
			</Container>
		</>
	)
}

export default Holerites;