"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IStatus, IEmployee } from "@/interfaces";

import { BiSolidUserBadge } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import formatDate from "@/lib/formatDate";
import { CalendarCheck, CalendarX } from "lucide-react";
import { IHumanSexCodes } from "@/interfaces";
import { humanSexCodes } from "@/resources/humanSexCodes";

interface IProps {
	employee: IEmployee | null;
}

export const ProfileCards: React.FC<IProps> = ({ employee }) => {
	return (
		<>
			<div className="w-full flex flex-col gap-5 md:flex-row mb-5">

				<Card className="md:w-1/2">
					<CardHeader className="space-y-0 flex flex-row gap-2">
						<div className="w-16 h-16 bg-slate-400 rounded-full">
							<FaUserCircle className="w-full h-full fill-slate-500" />
						</div>
						<div>
							<CardTitle className="text-lg font-semibold">
								{employee?.name}
							</CardTitle>
							<CardDescription>
								<div className="capitalize flex items-center gap-2">
									<div className={`inline-block w-3 h-3 rounded-full ${employee?.status && IStatus[employee.status] == "Inativo" ? "bg-red-500" : "bg-emerald-500"}`}></div>
									{employee?.status && IStatus[employee.status]}
								</div>
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="space-y-1">
						<p className="flex gap-1 items-center text-sm">
							<BiSolidUserBadge className="inline-block" size={18} />
							{employee?.role?.name}
						</p>
						<p className="flex gap-1 items-center text-sm">
							<CalendarCheck size={18} className="inline-block" />
							Data de admissão: {employee && formatDate(employee.admissionDate)}
						</p>
						{employee?.terminationDate && (
							<p className="flex gap-1 items-center text-sm">
								<CalendarX size={18} className="inline-block" />
								Data de desligamento: {employee && formatDate(employee.terminationDate)}
							</p>
						)}
					</CardContent>
				</Card>
				<Card className="md:w-1/2">
					<CardHeader className="space-y-0">
						<CardTitle className="text-lg font-semibold">
							Informações de Contato
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-1">
						<p className="text-sm font-semibold">
							Celular: <span className="font-normal">{employee?.cellNumber}</span>
						</p>
						<p className="text-sm font-semibold">
							Telefone: <span className="font-normal">{employee?.phoneNumber}</span>
						</p>
						<p className="text-sm font-semibold">
							E-mail: <span className="font-normal">{employee?.email}</span>
						</p>
						<p className="text-sm font-semibold">
							Endereço: <span className="font-normal">{employee?.address}</span>
						</p>
					</CardContent>
				</Card>
			</div>
			<div className="w-full flex flex-col gap-5 md:flex-row">
				<Card className="md:w-1/2">
					<CardHeader className="space-y-0">
						<CardTitle className="text-lg font-semibold">
							Informações Pessoais
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-1">
						<p className="text-sm font-semibold">
							CPF: <span className="font-normal">{employee?.cpf}</span>
						</p>
						<p className="text-sm font-semibold">
							RG: <span className="font-normal">{employee?.rg}</span>
						</p>
						<p className="text-sm font-semibold">
							Sexo: <span className="font-normal">{employee?.sex && humanSexCodes.find((sex) => sex.value === Number(employee?.sex))?.label}</span>
						</p>
						<p className="text-sm font-semibold">
							Estado civil: <span className="font-normal">{employee?.maritalStatus}</span>
						</p>
						<p className="text-sm font-semibold">
							Nº de filhos: <span className="font-normal">{employee?.numberOfChildren}</span>
						</p>
						<p className="text-sm font-semibold">
							Nacionalidade: <span className="font-normal">{employee?.nationality}</span>
						</p>
						<p className="text-sm font-semibold">
							Data de nascimento: <span className="font-normal">{employee && formatDate(employee.dateOfBirth)}</span>
						</p>
					</CardContent>
				</Card>
				<Card className="md:w-1/2">
					<CardHeader className="space-y-0">
						<CardTitle className="text-lg font-semibold">
							Informações Bancárias
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-1">
						<p className="text-sm font-semibold">
							Nome do banco: <span className="font-normal">{employee?.bankName}</span>
						</p>
						<p className="text-sm font-semibold">
							Nº da conta: <span className="font-normal">{employee?.accountNumber}</span>
						</p>
						<p className="text-sm font-semibold">
							Nº da agência: <span className="font-normal">{employee?.agencyNumber}</span>
						</p>
						<p className="text-sm font-semibold">
							Chave PIX: <span className="font-normal">{employee?.pixKey}</span>
						</p>
					</CardContent>
				</Card>
			</div>
		</>
	)
}