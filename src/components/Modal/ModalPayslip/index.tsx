"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IPayslip } from "@/interfaces";
import api from "@/api";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import formatDate from "@/lib/formatDate";

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
							<DialogTitle>Holerite</DialogTitle>
						</DialogHeader>
						<div className="px-2 mt-8">
							<p>Data de {payslip && formatDate(payslip?.dateOfIssue)}</p>

							<div>
								<p>Período de referência:</p>
								<p className="capitalize">
									{payslip && new Intl
										.DateTimeFormat('pt-BR', { month: 'long' })
										.format(new Date(payslip?.dateOfIssue)) + "/" + new Date(payslip?.dateOfIssue).getFullYear()}
								</p>
							</div>

							<div className="flex justify-between">
								<p>Nome do colaborador: {payslip?.employee.name}</p>
								<p>Admissão: {payslip?.employee && formatDate(payslip?.employee?.admissionDate)}</p>
							</div>

							<p>Função: {payslip?.employee.role.name}</p>
						</div>
					</ScrollArea>
				</DialogContent>
			</Dialog>
		</>
	)
}