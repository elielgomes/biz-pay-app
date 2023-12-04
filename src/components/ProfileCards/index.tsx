"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IStatus, IEmployee } from "@/interfaces";

import { BiSolidUserBadge } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { CalendarCheck, CalendarX } from "lucide-react";
import { IHumanSexCodes } from "@/interfaces";
import { humanSexCodes } from "@/resources/humanSexCodes";
import { formatAvatarString } from "@/lib/avatarString";
import { Separator } from "../ui/separator";
import { maritalStatus } from "@/resources/maritalStatus";

interface IProps {
	employee: IEmployee | null;
}

export const ProfileCards: React.FC<IProps> = ({ employee }) => {
	return (
		<>
			<div className="w-full flex flex-col gap-5 md:flex-row mb-5">

				<Card className="md:w-2/5 border-none overflow-hidden shadow-lg">

					<CardHeader className="flex items-center space-y-6 mb-8 bg-gradient-to-b from-slate-200">
						<div className="w-[80px] h-[80px] flex-shrink-0 bg-gradient-to-r to-[#FF9B44] from-[#FC6075] rounded-full flex items-center justify-center">
							<span className="font-bold text-4xl text-white">{employee?.name && formatAvatarString(employee.name)}</span>
						</div>
						<div>
							<CardTitle className="text-xl text-slate-700 font-semibold text-center">
								{employee?.name}
							</CardTitle>
							<CardDescription className="text-lg text-slate-500 text-center">
								{employee?.role?.name}
							</CardDescription>
						</div>
					</CardHeader>

					<CardContent className="space-y-3">

						<div>
							<p className="text-sm uppercase text-slate-500">
								Admissão
							</p>
							<p className="text-md uppercase text-slate-700">
								{employee && new Date(employee.admissionDate).toLocaleDateString("pt-br")}
							</p>
						</div>

						{employee?.terminationDate && (
							<div>
								<p className="text-sm uppercase text-slate-500">
									Desligamento
								</p>
								<p className="text-md uppercase text-slate-700">
									{employee && new Date(employee.terminationDate).toLocaleDateString("pt-br")}
								</p>
							</div>
						)}

						<div>
							<p className="text-sm uppercase text-slate-500">
								CPF
							</p>
							<p className="text-md text-slate-700">
								{employee?.cpf}
							</p>
						</div>

						<div>
							<p className="text-sm uppercase text-slate-500">
								E-mail
							</p>
							<p className="text-md text-slate-700">
								{employee?.email}
							</p>
						</div>


					</CardContent>

				</Card>

				<Card className="md:w-3/5 border-none shadow-lg">
					<CardHeader className="space-y-2">
						<CardTitle className="text-xl font-bold text-slate-700">
							Informações Pessoais
						</CardTitle>
						<Separator className="w-[100px] h-1 rounded-md bg-gradient-to-r to-[#FF9B44] from-[#FC6075]" />
					</CardHeader>
					<CardContent className="space-y-4">

						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								Nome completo
							</p>
							<p className="text-md text-slate-700">
								{employee?.name}
							</p>
						</div>

						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								Nacionalidade
							</p>
							<p className="text-md text-slate-700">
								{employee?.nationality}
							</p>
						</div>

						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								Sexo
							</p>
							<p className="text-md text-slate-700">
								{employee && humanSexCodes.find(e => e.value == employee.sex)?.label}
							</p>
						</div>

						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								Estado civil
							</p>
							<p className="text-md text-slate-700">
								{employee && maritalStatus.find(e => e.value == employee.maritalStatus)?.label}
							</p>
						</div>

						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								Data de nascimento
							</p>
							<p className="text-md text-slate-700">
								{employee?.dateOfBirth && new Date(employee.dateOfBirth).toLocaleDateString("pt-br")}
							</p>
						</div>

						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								Número de filhos
							</p>
							<p className="text-md text-slate-700">
								{employee?.numberOfChildren}
							</p>
						</div>

						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								E-mail
							</p>
							<p className="text-md text-slate-700">
								{employee?.email}
							</p>
						</div>

						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								Celular
							</p>
							<p className="text-md text-slate-700">
								{employee?.cellNumber}
							</p>
						</div>

						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								Telefone
							</p>
							<p className="text-md text-slate-700">
								{employee?.phoneNumber}
							</p>
						</div>

						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								Endereço
							</p>
							<p className="text-md text-slate-700">
								{employee?.address}
							</p>
						</div>

					</CardContent>
				</Card>
			</div>
			<div className="w-full flex flex-col gap-5 md:flex-row">
				<Card className="md:w-full border-none shadow-lg">
					<CardHeader className="space-y-2">
						<CardTitle className="text-xl font-bold text-slate-700">
							Dados Bancários
						</CardTitle>
						<Separator className="w-[100px] h-1 rounded-md bg-orange-500" />
					</CardHeader>
					<CardContent className="space-y-1">
						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								Nome do banco
							</p>
							<p className="text-md text-slate-700">
								{employee?.bankName}
							</p>
						</div>

						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								Número da conta
							</p>
							<p className="text-md text-slate-700">
								{employee?.accountNumber}
							</p>
						</div>

						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								Número da agência
							</p>
							<p className="text-md text-slate-700">
								{employee?.agencyNumber}
							</p>
						</div>

						<div className="flex gap-4">
							<p className="text-md uppercase text-slate-500 text-end">
								Chave Pix
							</p>
							<p className="text-md text-slate-700">
								{employee?.pixKey}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	)
}