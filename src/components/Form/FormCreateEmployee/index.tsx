'use client'
import React from "react";
import * as z from "zod";
import { format } from "date-fns"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";

import api from "@/api";
import { cn } from "@/lib/utils";
import { IEmployeeDTO, IHumanSexCodes, IMaritalStatus, IPermitions, IRole, IStatus } from "@/interfaces";
import { nationalities } from "@/resources/nationalities";
import { humanSexCodes } from "@/resources/humanSexCodes";
import { maritalStatus } from "@/resources/maritalStatus";

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
import { ICreateEmployee } from "@/app/dashboard/funcionarios/page";
import { IHandleEmployeeEdit } from "@/components/Modal/ModalCreateEmployee";
import { converStringToDate } from "@/lib/formatDate";

interface IProps {
	createEmployee?: ({ employee, callBack }: ICreateEmployee) => void;
	handleEmployeeEdit?: IHandleEmployeeEdit;
}

export type TCreateEmployeeForm = z.infer<typeof createEmployeeFormSchema>;

const createEmployeeFormSchema = z.object({
	name: z.string({
		required_error: "O Nome é obrigatório.",
	}).toLowerCase().min(2, {
		message: "O Nome deve conter no mínimo 2 caracteres.",
	}).transform(name => name.split(" ").map((word) => word.substring(0, 1).toUpperCase() + word.substring(1)).join(" ")),
	email: z.string({
		required_error: "O E-mail é obrigatório.",
	}).email({
		message: "E-mail inválido.",
	}),
	cpf: z.string({
		required_error: "O CPF é obrigatório.",
	}).trim().min(14, {
		message: "CPF inválido",
	}),
	rg: z.string({
		required_error: "O RG é obrigatório.",
	}).trim().min(11, {
		message: "RG inválido",
	}),
	cellPhone: z.string({
		required_error: "O Celular é obrigatório.",
	}).min(15, {
		message: "Celular inválido.",
	}),
	phone: z.string().optional(),
	password: z.string({
		required_error: "A senha é obrigatória.",
	}).min(8, {
		message: "A senha deve conter no minimo 8 caracteres.",
	}),
	confirmPassword: z.string({
		required_error: "A confirmação de senha é obrigatória.",
	}).min(8, {
		message: "A senha deve conter no minimo 8 caracteres.",
	}),
	dateOfBirth: z.string({
		required_error: "A data de nascimento é obrigatória.",
	}).min(1, {
		message: "A data de nascimento é obrigatória.",
	}),
	nationality: z.string({
		required_error: "A nacionalidade é obrigatória.",
	}).min(1, {
		message: "A nacionalidade é obrigatória.",
	}),
	numberOfChildren: z.number().min(0, {
		message: "Número de filhos inválido.",
	}),
	maritalStatus: z.nativeEnum(IMaritalStatus, {
		required_error: "O Estado civil é obrigatório.",
	}).refine((value) => {
		return Object.values(IMaritalStatus).includes(value);
	}, {
		message: "Estado civil inválido.",
		path: ["maritalStatus"],
	}),
	address: z.string({
		required_error: "O Endereço é obrigatório.",
	}).min(1, {
		message: "O Endereço é obrigatório.",
	}),
	sex: z.nativeEnum(IHumanSexCodes, {
		required_error: "O Sexo é obrigatório.",
	}).refine((value) => {
		return Object.values(IHumanSexCodes).includes(value);
	}, {
		message: "Sexo é inválido.",
		path: ["sex"],
	}),
	admissionDate: z.string({
		required_error: "A data de admissão é obrigatória.",
	}),
	terminationDate: z.string().optional(),
	role: z.string({
		required_error: "O Cargo é obrigatório.",
	}).min(1, {
		message: "O Cargo é obrigatório.",
	}),
	permition: z.nativeEnum(IPermitions, {
		required_error: "A permissão é obrigatória.",
	}).refine((value) => {
		return Object.values(IPermitions).includes(value);
	}, {
		message: "Permissão inválida.",
		path: ["permition"],
	}),
	bankName: z.string().optional(),
	accountNumber: z.string().optional(),
	agencyNumber: z.string().optional(),
	pixKey: z.string().optional(),
}).refine((data) => {
	return data.password === data.confirmPassword
},
	{
		message: "As senhas não coincidem.",
		path: ["confirmPassword"],
	});

const permitions = [
	{ label: "Usuário", value: IPermitions.user },
	{ label: "Administrador", value: IPermitions.admin },
] as const;

export const FormCreateEmployee: React.FC<IProps> = ({ createEmployee, handleEmployeeEdit }) => {

	const formRef = React.useRef<HTMLFormElement>(null);

	let defaultEmployee = handleEmployeeEdit?.employee;

	const formDefaultValues = React.useCallback((employee?: IEmployeeDTO) => {
		if (employee) {
			return {
				name: employee.name,
				email: employee.email,
				cpf: employee.cpf,
				rg: employee.rg,
				cellPhone: employee.cellNumber,
				phone: employee.phoneNumber,
				password: employee.password,
				confirmPassword: employee.password,
				dateOfBirth: new Date(employee.dateOfBirth).toLocaleDateString("pt-br"),
				nationality: employee.nationality,
				numberOfChildren: employee.numberOfChildren,
				maritalStatus: employee.maritalStatus,
				address: employee.address,
				sex: employee.sex,
				admissionDate: new Date(employee.admissionDate).toLocaleDateString("pt-br"),
				terminationDate: employee.terminationDate ? new Date(employee.terminationDate).toLocaleDateString("pt-br") : undefined,
				role: employee.roleId,
				permition: employee.permitionId,
				bankName: employee.bankName,
				accountNumber: employee.accountNumber,
				agencyNumber: employee.agencyNumber,
				pixKey: employee.pixKey,
			}
		} else {
			return {
				name: "",
				email: "",
				cpf: "",
				rg: "",
				cellPhone: "",
				phone: "",
				password: "",
				confirmPassword: "",
				dateOfBirth: new Date().toLocaleDateString("pt-br"),
				nationality: "Brasileira(o)",
				numberOfChildren: 0,
				maritalStatus: undefined,
				address: "",
				sex: undefined,
				hourlyPayment: "",
				admissionDate: new Date().toLocaleDateString("pt-br"),
				terminationDate: undefined,
				role: undefined,
				permition: undefined,
				bankName: "",
				accountNumber: "",
				agencyNumber: "",
				pixKey: "",
			}
		}
	}, [])

	const form = useForm<TCreateEmployeeForm>({
		resolver: zodResolver(createEmployeeFormSchema),
		defaultValues: {
			...formDefaultValues(defaultEmployee),
		}
	});

	const [roles, setRoles] = React.useState<IRole[] | null>(null);

	const resetAllFields = React.useCallback(() => {
		form.reset({ ...form.control._defaultValues });
	}, [form])

	const getAllRoles = React.useCallback(() => {
		if (!roles) {
			api.role.getAllRoles().then((data) => {
				setRoles(data);
			}).catch((error) => {
				toast({
					variant: "error",
					title: "Ops algo de errado occorreu!",
					description: error.message ? error.message : "Erro ao carregar os cargos.",
				});
			});
		}
	}, [roles]);

	const onSubmit = React.useCallback((data: TCreateEmployeeForm) => {
		const newEmployee: IEmployeeDTO = {
			cpf: data.cpf,
			name: data.name,
			status: data.terminationDate ? IStatus.Inativo : IStatus.Ativo,
			dateOfBirth: converStringToDate(data.dateOfBirth),
			email: data.email,
			phoneNumber: data.phone,
			cellNumber: data.cellPhone,
			address: data.address,
			sex: data.sex,
			password: data.password,
			admissionDate: converStringToDate(data.admissionDate),
			terminationDate: data.terminationDate ? converStringToDate(data.terminationDate) : undefined,
			rg: data.rg,
			nationality: data.nationality,
			maritalStatus: data.maritalStatus,
			numberOfChildren: data.numberOfChildren,
			bankName: data.bankName,
			accountNumber: data.accountNumber,
			agencyNumber: data.agencyNumber,
			pixKey: data.pixKey,
			permitionId: data.permition,
			roleId: data.role,
		};

		if (defaultEmployee && handleEmployeeEdit) {
			handleEmployeeEdit.editEmployee({ employee: newEmployee, callBack: () => form.reset({ ...formDefaultValues(newEmployee) }) });
		} else {
			createEmployee && createEmployee({ employee: newEmployee, callBack: resetAllFields });
		}
	}, [createEmployee, defaultEmployee, form, formDefaultValues, handleEmployeeEdit, resetAllFields]);

	React.useEffect(() => {

		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				const submit = new Event("submit", { cancelable: true, bubbles: true });
				submit.preventDefault();
				formRef.current?.dispatchEvent(submit);
			}
		};

		getAllRoles();

		document.addEventListener("keypress", handleKeyPress);

		return () => {
			document.removeEventListener("keypress", handleKeyPress);
		}
	}, [getAllRoles, form, onSubmit]);

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

					<div>
						<h2 className="text-center text-slate-700 font-semibold">Informações pessoais</h2>
						<Separator className="my-3 bg-gradient-to-r to-[#FF9B44] from-[#FC6075]" />
					</div>

					{/* Nome / E-mail */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Nome <span className="text-red-500">*</span></FormLabel>
									<FormControl>
										<Input placeholder="Digite o nome" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>E-mail <span className="text-red-500">*</span></FormLabel>
									<FormControl>
										<Input placeholder="example@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Cpf / Rg */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="rg"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Rg <span className="text-red-500">*</span></FormLabel>
									<FormControl>
										<MaskInput
											onBlur={field.onBlur}
											inputRef={field.ref}
											disabled={field.disabled}
											name={field.name}
											value={field.value}
											onAccept={field.onChange}
											mask="00.000.000-*"
											placeholder="00.000.000-0"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="cpf"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Cpf <span className="text-red-500">*</span></FormLabel>
									<FormControl>
										<MaskInput
											type="string"
											onBlur={field.onBlur}
											inputRef={field.ref}
											disabled={field.disabled}
											name={field.name}
											value={field.value}
											onAccept={field.onChange}
											mask="000.000.000-00"
											placeholder="000.000.000-00"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Celular / Telefone */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="cellPhone"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Celular <span className="text-red-500">*</span></FormLabel>
									<FormControl>
										<MaskInput
											onBlur={field.onBlur}
											inputRef={field.ref}
											disabled={field.disabled}
											name={field.name}
											value={field.value}
											onAccept={field.onChange}
											mask="(00) 00000-0000"
											placeholder="(00) 00000-0000"
											autoComplete="off"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Telefone</FormLabel>
									<FormControl>
										<MaskInput
											onBlur={field.onBlur}
											inputRef={field.ref}
											disabled={field.disabled}
											name={field.name}
											value={field.value}
											onAccept={field.onChange}
											mask="(00) 0000-0000"
											placeholder="(00) 0000-0000"
											autoComplete="off"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Senha / Confirme a senha */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="w-1/2">
									<FormLabel>Senha <span className="text-red-500">*</span></FormLabel>
									<FormControl>
										<Input placeholder="No mínimo 8 caracteres" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem className="w-1/2">
									<FormLabel>Confirme a senha <span className="text-red-500">*</span></FormLabel>
									<FormControl>
										<Input placeholder="Confirme a senha" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Data nascimento / Nacionalidade */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="dateOfBirth"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Data de nascimento <span className="text-red-500">*</span></FormLabel>
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

						<FormField
							control={form.control}
							name="nationality"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Nacionalidade <span className="text-red-500">*</span></FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													role="combobox"
													className={cn(
														"w-full justify-between font-normal",
														!field.value && "text-slate-500 font-normal"
													)}
												>
													{field.value
														? nationalities.find((nacionality) => nacionality.label === field.value)?.label
														: "Selecione o nacionalidade"}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>

										<PopoverContent className="w-[200px] p-0">

											<Command>
												<CommandInput placeholder="Buscar nacionalidade" />
												<CommandEmpty>Nacionalidade não encontrada</CommandEmpty>
												<CommandGroup className="max-h-44 overflow-y-auto">
													{nationalities.map((nacionality) => (
														<CommandItem
															key={nacionality.label}
															value={nacionality.value}
															onSelect={() => {
																form.setValue("nationality", nacionality.value)
															}}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	nacionality.value === field.value
																		? "opacity-100"
																		: "opacity-0"
																)}
															/>
															{nacionality.label}
														</CommandItem>
													))}
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>


					</div>

					{/* Número de filhos / Estado civil */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="numberOfChildren"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Número de filhos</FormLabel>
									<FormControl>
										<Input placeholder="Número de filhos" type="number" min={0} onChange={(e) => field.onChange(parseInt(e.target.value))} value={field.value} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="maritalStatus"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Estado civil <span className="text-red-500">*</span></FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													role="combobox"
													className={cn(
														"w-full justify-between font-normal",
														!Object.values(IMaritalStatus).includes(field.value) && "text-slate-500 font-normal"
													)}
												>
													{Object.values(IMaritalStatus).includes(field.value)
														? maritalStatus.find((status) => status.value === field.value)?.label
														: "Selecione um	estado civil"}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput placeholder="Buscar estado civil" />
												<CommandEmpty>Estado civil não encontrado</CommandEmpty>
												<CommandGroup>
													{maritalStatus.map((status) => (
														<CommandItem
															key={status.value}
															value={status.label}
															onSelect={() => {
																form.setValue("maritalStatus", status.value);
																field.onChange(status.value);
															}}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	status.value === Number(field.value)
																		? "opacity-100"
																		: "opacity-0"
																)}
															/>
															{status.label}
														</CommandItem>
													))}
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Endereço / Sexo */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Endereço <span className="text-red-500">*</span></FormLabel>
									<FormControl>
										<Input placeholder="Digite o endereço" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="sex"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Sexo <span className="text-red-500">*</span></FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													role="combobox"
													className={cn(
														"w-full justify-between font-normal",
														!Object.values(IHumanSexCodes).includes(field.value) && "text-slate-500 font-normal"
													)}
												>
													{Object.values(IHumanSexCodes).includes(field.value)
														? humanSexCodes.find((sex) => sex.value === Number(field.value))?.label
														: "Selecione o sexo"}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput placeholder="Buscar estado civil" />
												<CommandEmpty>Sexo não encontrado</CommandEmpty>
												<CommandGroup>
													{humanSexCodes.map((sex) => (
														<CommandItem
															key={sex.value}
															value={sex.label}
															onSelect={() => {
																form.setValue("sex", sex.value);
																field.onChange(sex.value);
															}}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	sex.value === Number(field.value)
																		? "opacity-100"
																		: "opacity-0"
																)}
															/>
															{sex.label}
														</CommandItem>
													))}
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Data de admissao / Data de desligamento */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="admissionDate"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Data de admissão</FormLabel>
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

						<FormField
							control={form.control}
							name="terminationDate"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Data de desligamento</FormLabel>
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

					{/* Cargo / Permissão */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Cargo <span className="text-red-500">*</span></FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													role="combobox"
													className={cn(
														"w-full justify-between font-normal",
														!field.value && "text-slate-500 font-normal"
													)}
												>
													{
														field.value
															? roles?.find((role) => role.id === field.value)?.name
															: "Selecione o cargo"
													}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput placeholder="Buscar cargo" />
												<CommandEmpty>Cargo não encontrado</CommandEmpty>
												<CommandGroup>
													{roles
														? roles.map((role) => (
															<CommandItem
																className="capitalize"
																key={role.id}
																value={role.name}
																onSelect={() => {
																	form.setValue("role", role.id);
																	field.onChange(role.id);
																}}>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		role.id === field.value
																			? "opacity-100"
																			: "opacity-0"
																	)}
																/>
																{role.name}
															</CommandItem>
														))
														: (
															<CommandItem className="justify-center">
																<Spinner />
																Loading...
															</CommandItem>
														)
													}
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="permition"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Permissão <span className="text-red-500">*</span></FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													role="combobox"
													className={cn(
														"w-full justify-between font-normal",
														!field.value && "text-slate-500 font-normal"
													)}
												>
													{field.value
														? permitions.find(
															(permition) => permition.value === field.value
														)?.label
														: "Selecione o sexo"}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput placeholder="Buscar estado civil" />
												<CommandEmpty>Sexo não encontrado</CommandEmpty>
												<CommandGroup>
													{permitions.map((permition) => (
														<CommandItem
															key={permition.value}
															value={permition.label}
															onSelect={() => {
																form.setValue("permition", permition.value);
																field.onChange(permition.value);
															}}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	permition.value === Number(field.value)
																		? "opacity-100"
																		: "opacity-0"
																)}
															/>
															{permition.label}
														</CommandItem>
													))}
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

					</div>

					<div>
						<h2 className="text-center text-slate-700 font-semibold">Informações bancárias</h2>
						<Separator className="my-3 bg-gradient-to-r to-[#FF9B44] from-[#FC6075]" />
					</div>

					{/* Nome do banco / Numero da conta */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="bankName"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Nome do banco</FormLabel>
									<FormControl>
										<Input type="text" placeholder="Digite o nome do banco"  {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="accountNumber"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Número da conta</FormLabel>
									<FormControl>
										<Input placeholder="Digite o número da conta" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Numero da agencia / Chave Pix */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="agencyNumber"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Número da agência</FormLabel>
									<FormControl>
										<Input placeholder="Digite o número da agência" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="pixKey"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Chave Pix</FormLabel>
									<FormControl>
										<Input placeholder="Digite a chave pix" {...field} />
									</FormControl>
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
