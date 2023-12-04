'use client'
import React from "react";
import { Plus } from "lucide-react";

// Components:
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormCreateEmployee } from "@/components";
import { IEmployeeDTO } from "@/interfaces";
import { ICreateEmployee } from "@/app/dashboard/funcionarios/page";


export interface IHandleEmployeeEdit {
	modalTitle: string;
	employee?: IEmployeeDTO;
	editEmployee: ({ employee, callBack }: ICreateEmployee) => void;
}

interface IProps {
	createEmployee?: ({ employee, callBack }: ICreateEmployee) => void;
	onOpenChange?: (open: boolean) => void;
	open?: boolean;
	handleEmployeeEdit?: IHandleEmployeeEdit;
}


export const ModalCreateEmployee: React.FC<IProps> = ({
	open,
	onOpenChange,
	createEmployee,
	handleEmployeeEdit,
}) => {

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-screen-lg max-h-screen px-0">
				<ScrollArea className="max-h-[calc(100vh-100px)] px-4">
					<DialogHeader>
						<DialogTitle className="text-slate-700">{handleEmployeeEdit ? handleEmployeeEdit.modalTitle : "Novo funcionário"}</DialogTitle>
					</DialogHeader>
					<div className="px-2 mt-8">
						<FormCreateEmployee
							handleEmployeeEdit={handleEmployeeEdit}
							createEmployee={createEmployee}
						/>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}