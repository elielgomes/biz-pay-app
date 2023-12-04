"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IPayslip } from "@/interfaces";
import api from "@/api";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@/components/ui/separator";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

interface IProps {
	payslipId?: string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export const ModalPayslip: React.FC<IProps> = ({ payslipId, open, onOpenChange }) => {

	const [payslip, setPayslip] = React.useState<IPayslip | null>(null);

	React.useEffect(() => {
		payslipId && api.payslip.getPayslipById(payslipId).then((data) => setPayslip(data));
	}, [payslipId]);

	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="max-w-screen-lg max-h-screen px-0">
					<ScrollArea className="max-h-[calc(100vh-100px)] px-4">
						<DialogHeader>
							<DialogTitle className="text-slate-700">Recibo de pagamento de salário</DialogTitle>
						</DialogHeader>
						<div className="px-2 mt-8">

							<div className="flex gap-2">
								<p>Período de referência:</p>
								<p className="capitalize font-bold">
									{payslip && new Intl
										.DateTimeFormat('pt-BR', { month: 'long' })
										.format(new Date(payslip?.dateOfIssue)) + "/" + new Date(payslip?.dateOfIssue).getFullYear()}
								</p>
							</div>


							<Separator className="my-3"></Separator>
							<div className="flex justify-between">
								<p>Nome do colaborador: {payslip?.employee.name}</p>
								<p>Admissão: {payslip?.employee && new Date(payslip?.employee?.admissionDate).toLocaleDateString('pt-br')}</p>
							</div>

							<p>Função: {payslip?.employee.role.name}</p>

							<Table className="w-full">
								<TableHeader>
									<TableRow>
										<TableHead className="uppercase">Descrições</TableHead>
										<TableHead className="text-right uppercase">Proventos</TableHead>
										<TableHead className="text-right uppercase">Deduções</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>

									<TableRow>
										<TableCell className="font-medium">Salário mensalista</TableCell>
										<TableCell className="text-right">{payslip?.grossSalary.toFixed(2).replace(".", ",")}</TableCell>
										<TableCell className="text-right"></TableCell>
									</TableRow>

									<TableRow>
										<TableCell className="font-medium">Bónus</TableCell>
										<TableCell className="text-right">{payslip?.bonus.toFixed(2).replace(".", ",")}</TableCell>
										<TableCell className="text-right"></TableCell>
									</TableRow>

									<TableRow>
										<TableCell className="font-medium">Descontos</TableCell>
										<TableCell className="text-right"></TableCell>
										<TableCell className="text-right">{payslip?.discounts.toFixed(2).replace(".", ",")}</TableCell>
									</TableRow>

									<TableRow>
										<TableCell className="font-medium">INSS</TableCell>
										<TableCell className="text-right"></TableCell>
										<TableCell className="text-right">{payslip?.inss.toFixed(2).replace(".", ",")}</TableCell>
									</TableRow>

									<TableRow>
										<TableCell className="font-medium">IRRF</TableCell>
										<TableCell className="text-right"></TableCell>
										<TableCell className="text-right">{payslip?.irrf.toFixed(2).replace(".", ",")}</TableCell>
									</TableRow>

								</TableBody>
								<TableFooter className="bg-white">

									<TableRow className="bg-slate-50 text-black hover:bg-slate-100">
										<TableCell>Totais</TableCell>
										<TableCell className="text-right">{payslip && (payslip.grossSalary + payslip.bonus).toFixed(2).replace(".", ",")}</TableCell>
										<TableCell className="text-right">{payslip && (payslip.discounts + payslip.inss + payslip.irrf).toFixed(2).replace(".", ",")}</TableCell>
									</TableRow>

									<TableRow className="bg-slate-200 text-black hover:bg-slate-200">
										<TableCell></TableCell>
										<TableCell className="text-right">Salário líquido</TableCell>
										<TableCell className="text-right font-bold">R$ {payslip && payslip.netSalary.toFixed(2).replace(".", ",")}</TableCell>
									</TableRow>

								</TableFooter>
							</Table>

						</div>
					</ScrollArea>
				</DialogContent>
			</Dialog>
		</>
	)
}