"use client"
import React, { useContext } from "react";
import { Container } from "@/components/Container";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/api";

import { Chart, PieChart } from "@/components/PieChart";
import { IEmployee, IHumanSexCodes, IStatus } from "@/interfaces";
import { BarChart, IBarChart } from "@/components/BarChart";
import { humanSexCodes } from "@/resources/humanSexCodes";
import { AuthContext } from "@/contexts/AuthContext";
import { IPermitions } from "@/interfaces";

const Dashboard = () => {

	const [countEmployee, setCountEmployee] = React.useState<number>(0);
	const [employeeActivity, setEmployeeActivity] = React.useState<Chart>({ active: 0, inactive: 0 });
	const [employeeDataSex, setEmployeeDataSex] = React.useState<IBarChart | null>(null);
	const { user } = useContext(AuthContext);

	const organizeDataForBarChart = React.useCallback((employees: IEmployee[]) => {
		const ageCategories = ['0-20', '20-30', '30-40', '40-50', '50-60', '60-70'];

		const dataBySex = {
			male: new Array(ageCategories.length).fill(0),
			female: new Array(ageCategories.length).fill(0),
		};

		const getCurrentAgeCategory = (dateOfBirth: Date): string => {
			const currentYear = new Date().getFullYear();
			const birthYear = dateOfBirth.getFullYear();
			const age = currentYear - birthYear;
			for (let i = 1; i < ageCategories.length; i++) {
				const [start, end] = ageCategories[i].split('-').map(Number);
				if (age >= start && age < end) {
					return ageCategories[i];
				}
			}
			return ageCategories[0];
		};

		employees.forEach(employee => {
			const ageCategory = getCurrentAgeCategory(new Date(employee.dateOfBirth));
			const sexCategory = IHumanSexCodes[employee.sex] as keyof typeof dataBySex;

			const ageIndex = ageCategories.indexOf(ageCategory);
			if (ageIndex !== -1) {
				dataBySex[sexCategory][ageIndex]++;
			}
		});

		return dataBySex;
	}, []);

	React.useEffect(() => {
		api.employee.getAllEmployees().then((data) => {
			setCountEmployee(data.length);
			setEmployeeActivity({
				active: data.filter((employee) => employee.status == IStatus.Ativo).length,
				inactive: data.filter((employee) => employee.status == IStatus.Inativo).length,
			});
			setEmployeeDataSex(organizeDataForBarChart(data));
		})
	}, [organizeDataForBarChart]);

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

			<div>
				<Container>
					<div className="mb-8">
						<h1 className="text-2xl font-semibold text-slate-700">Dashboard</h1>
						<Separator className="w-[100px] h-1 rounded-md bg-gradient-to-r to-[#FF9B44] from-[#FC6075]" />
					</div>

					<div className="flex gap-5">

						<Card className="h-auto max-h-72 w-1/2 rounded-lg border-none shadow-lg bg-gradient-to-r to-[#FF9B44] from-[#FC6075]">
							<CardHeader>
								<CardTitle className="text-white">
									Funcionários
								</CardTitle>
								<CardDescription className="text-white opacity-75 font-semibold">
									Total cadastrados
								</CardDescription>
							</CardHeader>
							<CardContent className="pt-7 text-6xl font-bold text-white">
								{countEmployee}
								<Separator className="mt-8 h-1 rounded-lg bg-transparent bg-gradient-to-r from-white to-transparent" />
							</CardContent>
						</Card>

						<Card className="h-auto max-h-72 w-1/2 rounded-lg border-none shadow-lg">
							<CardHeader>
								<CardTitle className="text-slate-700">
									Quantidade
								</CardTitle>
								<CardDescription className="text-slate-500 opacity-75 font-semibold">
									Ativos e Inativos
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex w-full h-full items-center justify-center">
									<PieChart data={employeeActivity}></PieChart>
								</div>
							</CardContent>
						</Card>

					</div>

					<div className="mt-5">
						<Card className="w-full rounded-lg border-none shadow-lg">
							<CardHeader>
								<CardTitle className="text-slate-700">
									Distribuição
								</CardTitle>
								<CardDescription className="text-slate-500 opacity-75 font-semibold">
									Funcionários por Sexo e Faixa Etária
								</CardDescription>
							</CardHeader>
							<CardContent>
								{employeeDataSex && <BarChart dataChart={employeeDataSex} />}
							</CardContent>
						</Card>
					</div>

				</Container>
			</div>

		)
	)
}

export default Dashboard;