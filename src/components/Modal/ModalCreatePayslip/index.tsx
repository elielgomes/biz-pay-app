"use client"

import React from "react";
import { FormCreatePayslip } from "@/components/Form";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ICreatePayslip, IHandlePayslipEdit } from "@/components/Form/FormCreatePayslip";

interface IProps {
	createPayslip?: ({ payslip, callBack }: ICreatePayslip) => void;
	onOpenChange?: (open: boolean) => void;
	open?: boolean;
	handlePayslipEdit?: IHandlePayslipEdit;
	employeeCpf?: string;
}

export const ModalCreatePayslip: React.FC<IProps> = ({ createPayslip, handlePayslipEdit, onOpenChange, open, employeeCpf }) => {
	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="max-w-screen-lg max-h-screen px-0">
					<ScrollArea className="max-h-[calc(100vh-100px)] px-4">
						<DialogHeader>
							<DialogTitle className="text-slate-700">{handlePayslipEdit ? handlePayslipEdit.modalTitle : "Criar holerite"}</DialogTitle>
						</DialogHeader>
						<div className="px-2 mt-8">
							<FormCreatePayslip
								handlePayslipEdit={handlePayslipEdit}
								createPayslip={createPayslip}
								employeeCpf={employeeCpf}
							/>
						</div>
					</ScrollArea>
				</DialogContent>
			</Dialog>
		</>
	)
}