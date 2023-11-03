"use client";

import React from "react";
import { IEmployee, } from "@/interfaces";
import api from "@/api";
import { toast } from "@/components/ui/use-toast";
import { ProfileCards, ModalCreateEmployee, Container, PayslipDataTable } from "@/components";
import { ICreateEmployee } from "@/app/dashboard/funcionarios/page";
import { IHandleEmployeeEdit } from "@/components/Modal/ModalCreateEmployee";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = ({ params }: { params: { cpf: string } }) => {

	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [employee, setEmployee] = React.useState<IEmployee | null>(null);
	const [handleEditEmployee, setHandleEditEmployee] = React.useState<IHandleEmployeeEdit | undefined>(undefined);

	const getEmployee = React.useCallback(() => {
		api.employee.getEmployeeByCpf(params.cpf).then((data) => {
			setEmployee(data);
		}).catch((error) => {
			toast({
				variant: "error",
				title: "Erro!",
				description: error.message ? error.message : "Erro 404.",
			});
		});
	}, [params.cpf]);

	const editEmployee = React.useCallback(({ employee, callBack }: ICreateEmployee) => {
		api.employee.updateEmployee(employee).then(() => {
			toast({
				variant: "success",
				title: "Funcionário editado com sucesso!",
				description: "O funcionário foi editado com sucesso.",
			});
			getEmployee();
			callBack && callBack();
		}).catch((error) => {
			toast({
				variant: "error",
				title: "Error ao editar funcionário!",
				description: error.message ? error.message : "Erro ao editar funcionário.",
			});
		});
	}, [getEmployee]);

	React.useEffect(() => {
		getEmployee();
	}, [getEmployee]);



	const handleEdit = React.useCallback((employee?: IEmployee) => {
		if (employee) {

			setHandleEditEmployee({
				modalTitle: "Editar funcionário",
				employee: employee,
				editEmployee: editEmployee,
			});
			setModalOpen(true);
		} else {
			toast({
				variant: "error",
				title: "Error!",
				description: "Houve um erro ao tentar editar um funcionário.",
			});
		}
	}, [editEmployee]);

	return (
		<>
			<Container>
				<div className="mb-8">
					<h1 className="text-2xl font-semibold">Detalhes</h1>
				</div>
				<div className="flex justify-end mb-4">
					<Button onClick={() => employee && handleEdit(employee)} className="flex gap-2">
						<Edit size={18} />	Editar funcionário
					</Button>
				</div>

				<ModalCreateEmployee
					open={modalOpen}
					handleEmployeeEdit={handleEditEmployee}
					onOpenChange={() => modalOpen && setModalOpen(false)}
				/>

				<ProfileCards employee={employee} />

				<PayslipDataTable employeeCpf={employee?.cpf} />

			</Container>
		</>
	)
};

export default Page;