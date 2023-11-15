'use client'
import React from "react";
import * as z from "zod";
import { format } from "date-fns"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";

import api from "@/api";
import { cn } from "@/lib/utils";
import { IEmployeeDTO, IHumanSexCodes, IMaritalStatus, IPayslip, IPayslipDTO, IPermitions, IRole, IStatus } from "@/interfaces";
import { nationalities } from "@/resources/nationalities";
import { humanSexCodes } from "@/resources/humanSexCodes";

// Components
import { Separator } from "@/components/ui/separator"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import MaskInput from "@/components/MaskInput";

export interface IHandlePayslipEdit {
	modalTitle: string;
	payslip?: IPayslipDTO;
	editPayslip: ({ payslip, callBack }: ICreatePayslip) => void;
}

export interface ICreatePayslip {
	payslip: IPayslipDTO;
	callBack?: () => void;
}

interface IProps {
	createPayslip?: ({ payslip, callBack }: ICreatePayslip) => void;
	handlePayslipEdit?: IHandlePayslipEdit;
	employeeCpf?:	string;
}

export type TCreatePayslipForm = z.infer<typeof createPayslipFormSchema>;

const createPayslipFormSchema = z.object({
	dateOfIssue: z.date(),
	grossSalary: z.string(),
	discounts: z.string(),
	bonus: z.string(),
});

export const FormCreatePayslip: React.FC<IProps> = ({ createPayslip, handlePayslipEdit, employeeCpf }) => {

	let defaultPayslip = handlePayslipEdit?.payslip;

	const formDefaultValues = React.useCallback((payslip?: IPayslipDTO) => {
		console.log(payslip);
		if (payslip) {
			return {
				id: payslip.id,
				dateOfIssue: new Date(payslip.dateOfIssue),
				grossSalary: payslip.grossSalary.toString(),
				discounts: payslip.discounts.toString(),
				bonus: payslip.bonus.toString(),
				employeeCpf: payslip.employeeCpf,
			}
		} else {
			return {
				id: undefined,
				dateOfIssue: new Date(),
				grossSalary: "0",
				discounts: "0",
				bonus: "0",
				employeeCpf: undefined,
			}
		}
	}, [])

	const form = useForm<TCreatePayslipForm>({
		resolver: zodResolver(createPayslipFormSchema),
		defaultValues: {
			...formDefaultValues(defaultPayslip),
		}
	});

	const resetAllFields = React.useCallback(() => {
		form.reset({ ...form.control._defaultValues });
	}, [form])


	const onSubmit = (data: TCreatePayslipForm) => {
		const newPayslip: IPayslipDTO = {
			id: defaultPayslip?.id ?	defaultPayslip.id : undefined,
			dateOfIssue: new Date(data.dateOfIssue),
			grossSalary: Number(data.grossSalary),
			discounts: Number(data.discounts),
			bonus: Number(data.bonus),
			employeeCpf: employeeCpf,
		};

		if (defaultPayslip && handlePayslipEdit) {
			handlePayslipEdit.editPayslip({ payslip: newPayslip, callBack: () => form.reset({ ...formDefaultValues(newPayslip) }) });
		} else {
			createPayslip && createPayslip({ payslip: newPayslip, callBack: resetAllFields });
		}
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

					<div>
						<h2 className="text-center text-slate-900 font-semibold">Informações pessoais</h2>
						<Separator className="my-3" />
					</div>

					{/* salario / descontos */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="grossSalary"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Salário Bruto *</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="discounts"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Descontos *</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* bonus / data */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="bonus"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Bónus *</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="dateOfIssue"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Data de referência *</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-full pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(new Date(field.value), "PPP")
													) : (
														<span>Selecione a data</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date > new Date() || date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>


					<div className="flex gap-6 justify-end">
						<Button onClick={() => resetAllFields()} type="button" className="w-32 bg-transparent text-red-500 border border-red-500 hover:text-white hover:bg-red-600">Cancelar</Button>
						<Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 w-32">Salvar</Button>
					</div>

				</form>
			</Form>
		</>
	);
};
