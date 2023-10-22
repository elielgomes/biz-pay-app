'use client'
import React from "react";
import * as z from "zod";
import { format } from "date-fns"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";

import api from "@/api";
import { cn } from "@/lib/utils";
import { IHumanSexCodes, IMaritalStatus, IPermitions, IRole } from "@/interfaces";
import { nacionalities } from "@/resources/nacionalities";

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
import { IMaskInput } from "react-imask";

export type TCreateEmployeeForm = z.infer<typeof createEmployeeFormSchema>;

const createEmployeeFormSchema = z.object({
	name: z.string({
		required_error: "O Nome é obrigatório.",
	}).min(2, {
		message: "O Nome deve conter no mínimo 2 caracteres.",
	}),
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
	dateOfBirth: z.date({
		required_error: "A data de nascimento é obrigatória.",
	}).max(new Date(), {
		message: "A data de nascimento não pode ser futura.",
	}),
	nacionality: z.string({
		required_error: "A nacionalidade é obrigatória.",
	}).min(1, {
		message: "Nacionality must be at least 1 characters.",
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
	address: z.string().optional(),
	sex: z.nativeEnum(IHumanSexCodes, {
		required_error: "O Sexo é obrigatório.",
	}).refine((value) => {
		return Object.values(IHumanSexCodes).includes(value);
	}, {
		message: "Sexo é inválido.",
		path: ["sex"],
	}),
	hourlyPayment: z.string({
		required_error: "O Salário é obrigatório.",
	}).trim().refine(value => {
		return Number(value.replace(",", ".")) > 0
	}, {
		message: "O valor deve ser maior que R$ 00,00.",
	}),
	admissionDate: z.date({
		required_error: "A data de admissão é obrigatória.",
	}),
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

const maritalStatus = [
	{ label: "Solteiro", value: IMaritalStatus.single },
	{ label: "Casado", value: IMaritalStatus.married },
	{ label: "Separado", value: IMaritalStatus.separated },
	{ label: "Divorciado", value: IMaritalStatus.divorced },
	{ label: "Viúvo", value: IMaritalStatus.widowed },
] as const;

const humanSexCodes = [
	{ label: "Masculino", value: IHumanSexCodes.male },
	{ label: "Feminino", value: IHumanSexCodes.female },
	{ label: "Indefinido", value: IHumanSexCodes.notApplicable },
	{ label: "Outro", value: IHumanSexCodes.notKnown },
] as const;

const permitions = [
	{ label: "Usuário", value: IPermitions.user },
	{ label: "Administrador", value: IPermitions.admin },
] as const;

export const FormCreateEmployee: React.FC = () => {

	const form = useForm<TCreateEmployeeForm>({
		resolver: zodResolver(createEmployeeFormSchema),
		defaultValues: {
			name: "",
			email: "",
			cpf: undefined,
			rg: undefined,
			cellPhone: undefined,
			phone: "",
			password: "",
			confirmPassword: "",
			dateOfBirth: new Date(),
			nacionality: "Brasileira(o)",
			numberOfChildren: 0,
			maritalStatus: undefined,
			address: "",
			sex: undefined,
			hourlyPayment: undefined,
			admissionDate: new Date(),
			role: undefined,
			permition: undefined,
			bankName: "",
			accountNumber: "",
			agencyNumber: "",
			pixKey: "",
		}
	});

	const [roles, setRoles] = React.useState<IRole[] | null>(null);

	const getAllRoles = React.useCallback(() => {
		if (!roles) {
			api.role.getAllRoles().then((data) => {
				setRoles(data);
			}).catch((error) => {
				toast({
					variant: "error",
					title: "Ops algo de errado occorreu!",
					description: error.message ? error.message : "Erro ao carregar os cargos",
				});
			});
		}
	}, [roles]);

	const onSubmit = (data: TCreateEmployeeForm) => {
		console.log(data);
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

					<div>
						<h2 className="text-center text-slate-900 font-semibold">Informações pessoais</h2>
						<Separator className="my-3" />
					</div>

					{/* Nome / E-mail */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Nome *</FormLabel>
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
									<FormLabel>E-mail *</FormLabel>
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
									<FormLabel>Rg *</FormLabel>
									<FormControl>
										<MaskInput
											type="string"
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
									<FormLabel>Cpf *</FormLabel>
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
									<FormLabel>Celular *</FormLabel>
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
									<FormLabel>Senha *</FormLabel>
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
									<FormLabel>Confirme a senha *</FormLabel>
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
									<FormLabel>Data de nascimento *</FormLabel>
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
														format(field.value, "PPP")
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

						<FormField
							control={form.control}
							name="nacionality"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Nacionalidade *</FormLabel>
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
														? nacionalities.find((nacionality) => nacionality.label === field.value)?.label
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
													{nacionalities.map((nacionality) => (
														<CommandItem
															key={nacionality.label}
															value={nacionality.value}
															onSelect={() => {
																form.setValue("nacionality", nacionality.value)
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
									<FormLabel>Estado civil *</FormLabel>
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
									<FormLabel>Endereço</FormLabel>
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
									<FormLabel>Sexo *</FormLabel>
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

					{/* Salario hora / Data de admissao */}
					<div className="flex w-full gap-5">
						<FormField
							control={form.control}
							name="hourlyPayment"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Salário (valor/hora) *</FormLabel>
									<FormControl>
										<div className="relative">
											<MaskInput
												onBlur={field.onBlur}
												inputRef={field.ref}
												disabled={field.disabled}
												name={field.name}
												value={field.value}
												onAccept={field.onChange}
												mask="00,00"
												placeholder="00,00"
												className="pl-8"
											/>
											<span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">R$</span>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="admissionDate"
							render={({ field }) => (
								<FormItem className="w-1/2 flex flex-col space-y-3 justify-start">
									<FormLabel>Data de admissão</FormLabel>
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
														format(field.value, "PPP")
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
												disabled={(date) => date < new Date("1900-01-01")}
											//initialFocus
											/>
										</PopoverContent>
									</Popover>
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
									<FormLabel>Cargo *</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													onClick={() => getAllRoles()}
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
									<FormLabel>Permissão *</FormLabel>
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
						<h2 className="text-center text-slate-900 font-semibold">Informações bancárias</h2>
						<Separator className="my-3" />
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
						<Button type="button" className="w-32 bg-transparent text-red-500 border border-red-500 hover:text-white hover:bg-red-600">Cancelar</Button>
						<Button type="button" onClick={form.handleSubmit(onSubmit)} className="bg-emerald-500 hover:bg-emerald-600 w-32">Salvar</Button>
					</div>
				</form>
			</Form>
		</>
	);
};
