"use client";

import React from "react";
import api from "@/api";
import { IEmployee, IEmployeeDTO, IStatus } from "@/interfaces";

import {
	EmployeesDataTable,
	Container,
	ModalCreateEmployee,
} from "@/components";
import { toast } from "@/components/ui/use-toast";

export interface ICreateEmployee {
	employee: IEmployeeDTO;
	callBack?: () => void;
}

const Funcionarios = () => {

	const [data, setData] = React.useState<IEmployee[]>([]);

	const getAllEmployees = React.useCallback(async () => {
		api.employee.getAllEmployees().then((data) => setData(data));
	}, []);

	const updateEmployeeStatus = React.useCallback(async (employee: IEmployee) => {
		const { permition, role, status, ...employeeSpread } = employee;
		const updatedEmployee: IEmployeeDTO = {
			...employeeSpread,
			status: IStatus[employee.status] == "Ativo" ? 0 : 1,
		};
		await api.employee.updateEmployee(updatedEmployee).then(() => getAllEmployees());
	}, [getAllEmployees]);

	const createEmployee = React.useCallback(({ employee, callBack }: ICreateEmployee) => {
		api.employee.createEmployee(employee).then(() => {
			toast({
				variant: "success",
				title: "Funcionário cadastrado com sucesso!",
				description: "O funcionário foi cadastrado com sucesso.",
			});
			getAllEmployees();
			callBack && callBack();
		}).catch((error) => {
			toast({
				variant: "error",
				title: "Error ao cadastrar funcionário!",
				description: error.message ? error.message : "Erro ao cadastrar funcionário.",
			});
		});

	}, [getAllEmployees]);

	const editEmployee = React.useCallback(({ employee, callBack }: ICreateEmployee) => {
		api.employee.updateEmployee(employee).then(() => {
			toast({
				variant: "success",
				title: "Funcionário editado com sucesso!",
				description: "O funcionário foi editado com sucesso.",
			});
			getAllEmployees();
			callBack && callBack();
		}).catch((error) => {
			toast({
				variant: "error",
				title: "Error ao editar funcionário!",
				description: error.message ? error.message : "Erro ao editar funcionário.",
			});
		});

	}, [getAllEmployees])

	React.useEffect(() => {
		getAllEmployees();
	}, [getAllEmployees]);

	return (
		<>
			<Container>
				<div className="mb-8">
					<h1 className="text-2xl font-semibold">Funcionários</h1>
				</div>
				<EmployeesDataTable
					employees={data}
					createEmployee={createEmployee}
					editEmployee={editEmployee}
					updateEmployeeStatus={updateEmployeeStatus}
				/>
			</Container>
		</>
	)

}

export default Funcionarios;