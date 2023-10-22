import React from "react";
import {
	EmployeesDataTable,
	Container,
	ModalCreateEmployee,
} from "@/components";
import { Button } from "@/components/ui/button";

const Funcionarios = () => {
	return (
		<>
			<Container>
				<div className="flex justify-end">
					<ModalCreateEmployee />
				</div>
				<EmployeesDataTable />
			</Container>
		</>
	)

}

export default Funcionarios;