'use client';

import React from "react";
import * as z from "zod";
import { format, set } from "date-fns"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import CurrencyInput from 'react-currency-input-field';

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
import { converStringToDate } from "@/lib/formatDate";

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
	employeeCpf?: string;
}

export type TCreatePayslipForm = z.infer<typeof createPayslipFormSchema>;

const createPayslipFormSchema = z.object({
	dateOfIssue: z.string(),
	grossSalary: z.string(),
	discounts: z.string(),
	bonus: z.string(),
});

export const FormCreatePayslip: React.FC<IProps> = ({ createPayslip, handlePayslipEdit, employeeCpf }) => {

	const formRef = React.useRef<HTMLFormElement>(null);

	let defaultPayslip = handlePayslipEdit?.payslip;

	const formDefaultValues = React.useCallback((payslip?: IPayslipDTO) => {
		if (payslip) {
			return {
				id: payslip.id,
				dateOfIssue: new Date(payslip.dateOfIssue).toLocaleDateString('pt-br'),
				grossSalary: payslip.grossSalary.toString(),
				discounts: payslip.discounts.toString(),
				bonus: payslip.bonus.toString(),
				employeeCpf: payslip.employeeCpf,
			}
		} else {
			return {
				id: undefined,
				dateOfIssue: new Date().toLocaleDateString('pt-br'),
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
			id: defaultPayslip?.id ? defaultPayslip.id : undefined,
			dateOfIssue: converStringToDate(data.dateOfIssue),
			grossSalary: Number(parseFloat(data.grossSalary.replace(",", ".")).toFixed(2)),
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

	React.useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				const submit = new Event("submit", { cancelable: true, bubbles: true });
				submit.preventDefault();
				formRef.current?.dispatchEvent(submit);
			}
		};

		document.addEventListener("keypress", handleKeyPress);

		return () => {
			document.removeEventListener("keypress", handleKeyPress);
		}

	}, [form])

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

					<div>
						<h2 className="text-center text-slate-700 font-semibold">Informações de pagamento</h2>
						<Separator className="my-3 bg-gradient-to-r to-[#FF9B44] from-[#FC6075]" />
					</div>

					{/* salario / descontos */}
					<div className="flex w-full gap-5">

						<FormField
							control={form.control}
							name="grossSalary"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Salário bruto <span className="text-red-500">*</span></FormLabel>
									<FormControl>
										<div className="relative">
											<CurrencyInput
												className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
												intlConfig={{ locale: 'pt-br', currency: 'BRL' }}
												placeholder="R$ 0,00"
												defaultValue={0}
												decimalsLimit={2}
												decimalSeparator=","
												groupSeparator="."
												onValueChange={field.onChange}
												value={field.value}
												onBlur={field.onBlur}
												name={field.name}
												ref={field.ref}
											/>
										</div>
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
									<FormLabel>Descontos <span className="text-red-500">*</span></FormLabel>
									<FormControl>
										<CurrencyInput
											className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
											intlConfig={{ locale: 'pt-br', currency: 'BRL' }}
											placeholder="R$ 0,00"
											defaultValue={0}
											decimalsLimit={2}
											decimalSeparator=","
											groupSeparator="."
											onValueChange={field.onChange}
											value={field.value}
											onBlur={field.onBlur}
											name={field.name}
											ref={field.ref}
										/>
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
									<FormLabel>Bónus <span className="text-red-500">*</span></FormLabel>
									<FormControl>
										<CurrencyInput
											className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
											intlConfig={{ locale: 'pt-br', currency: 'BRL' }}
											placeholder="R$ 0,00"
											defaultValue={0}
											decimalsLimit={2}
											decimalSeparator=","
											groupSeparator="."
											onValueChange={field.onChange}
											value={field.value}
											onBlur={field.onBlur}
											name={field.name}
											ref={field.ref}
										/>
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
									<FormLabel>Data de referência <span className="text-red-500">*</span></FormLabel>
									<MaskInput
										type="string"
										onBlur={field.onBlur}
										inputRef={field.ref}
										disabled={field.disabled}
										name={field.name}
										value={field.value}
										onAccept={field.onChange}
										mask="00/00/0000"
										placeholder="00/00/0000"
									/>
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
