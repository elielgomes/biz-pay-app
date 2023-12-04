"use client";

import React, { useContext } from "react";
import { IEmployee, IPayslip, IPayslipDTO, IPermitions, } from "@/interfaces";
import api from "@/api";
import { toast } from "@/components/ui/use-toast";
import { ProfileCards, ModalCreateEmployee, Container, PayslipDataTable } from "@/components";
import { ICreateEmployee } from "@/app/dashboard/funcionarios/page";
import { IHandleEmployeeEdit } from "@/components/Modal/ModalCreateEmployee";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModalCreatePayslip } from "@/components";
import { ICreatePayslip, IHandlePayslipEdit } from "@/components/Form/FormCreatePayslip";
import { Separator } from "@/components/ui/separator";
import Loading from "./loading";
import { AuthContext } from "@/contexts/AuthContext";
import { usePayslipDataTable } from "@/components/PayslipDataTable/hook";

const Page = ({ params }: { params: { cpf: string } }) => {

	const { user } = useContext(AuthContext);

	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [modalCreateOpen, setModalCreateOpen] = React.useState<boolean>(false);
	const [employee, setEmployee] = React.useState<IEmployee | null>(null);
	const [handleEditEmployee, setHandleEditEmployee] = React.useState<IHandleEmployeeEdit | undefined>(undefined);
	const [handleEditPayslip, setHandleEditPayslip] = React.useState<IHandlePayslipEdit | undefined>(undefined);
	const { refresh, onRefresh } = usePayslipDataTable();

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

	const createPayslip = React.useCallback(({ payslip, callBack }: ICreatePayslip) => {
		api.payslip.createPayslip(payslip).then(() => {
			toast({
				variant: "success",
				title: "Holerite criado com sucesso!",
				description: "O Holerite foi criado com sucesso.",
			});
			callBack && callBack();
			onRefresh();
		}).catch((error) => {
			toast({
				variant: "error",
				title: "Error ao criar holerite!",
				description: error.message ? error.message : "Erro ao criar holerite.",
			});
		});
	}, [onRefresh]);

	const editPayslip = React.useCallback(({ payslip, callBack }: ICreatePayslip) => {
		api.payslip.updatePayslip(payslip).then(() => {
			toast({
				variant: "success",
				title: "Holerite editado com sucesso!",
				description: "O holerite foi editado com sucesso.",
			});
			callBack && callBack();
			onRefresh();
		}).catch((error) => {
			toast({
				variant: "error",
				title: "Error ao editar holerite!",
				description: error.message ? error.message : "Erro ao editar holerite.",
			});
		});
	}, [onRefresh]);

	const handlePayslipEdit = React.useCallback((payslip?: IPayslipDTO) => {
		if (payslip) {
			setHandleEditPayslip({
				modalTitle: "Editar holerite",
				payslip: payslip,
				editPayslip: editPayslip,
			});
			setModalCreateOpen(true);
		} else {
			toast({
				variant: "error",
				title: "Error!",
				description: "Houve um erro ao tentar editar o holerite.",
			});
		}
	}, [editPayslip]);

	const handleCreatePayslip = React.useCallback(() => {
		setHandleEditPayslip({
			modalTitle: "Criar holerite",
			payslip: undefined,
			editPayslip: editPayslip,
		});
		setModalCreateOpen(true);
	}, [editPayslip]);

	return (

		user?.permitionId === IPermitions.user ? (

			<div role="status" className="inline-block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<svg aria-hidden="true" className="inline w-14 h-14 text-gray-200 animate-spin fill-[#FF9B44]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
					<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
				</svg>
				<span className="sr-only">Loading...</span>
			</div>

		) : (
			employee ? (
				<Container>

					<div className="mb-8">
						<h1 className="text-2xl font-semibold text-slate-700">Detalhes</h1>
						<Separator className="w-[100px] h-1 rounded-md bg-gradient-to-r to-[#FF9B44] from-[#FC6075]" />
					</div>

					<div className="flex justify-end mb-4">
						<Button onClick={() => employee && handleEdit(employee)} className="flex gap-2 bg-gradient-to-r to-[#FF9B44] from-[#FC6075] transition-all duration-200 hover:brightness-95">
							<Edit size={18} />	Editar funcionário
						</Button>
					</div>

					<ModalCreateEmployee
						open={modalOpen}
						handleEmployeeEdit={handleEditEmployee}
						onOpenChange={() => modalOpen && setModalOpen(false)}
					/>

					<ProfileCards employee={employee} />

					<ModalCreatePayslip
						open={modalCreateOpen}
						onOpenChange={() => modalCreateOpen && setModalCreateOpen(false)}
						createPayslip={createPayslip}
						employeeCpf={employee?.cpf}
						handlePayslipEdit={handleEditPayslip}
					/>

					<PayslipDataTable refresher={refresh} employeeCpf={employee?.cpf} editPayslip={handlePayslipEdit} buttonChildren={
						<Button onClick={() => handleCreatePayslip()} className="flex gap-2 bg-gradient-to-r to-[#FF9B44] from-[#FC6075]">
							<Edit size={18} />	Criar holerite
						</Button>
					} />

				</Container>
			) : (
				<Loading />
			)
		)
	)
};

export default Page;