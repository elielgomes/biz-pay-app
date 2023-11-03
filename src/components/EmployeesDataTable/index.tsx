"use client"

import * as React from "react"
import {
	ColumnDef,
	ColumnFiltersState,
	Row,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { IEmployee, IEmployeeDTO, IStatus } from "@/interfaces"
import { IHandleEmployeeEdit, ModalCreateEmployee } from "@/components/Modal/ModalCreateEmployee"
import { ICreateEmployee } from "@/app/dashboard/funcionarios/page"

export interface IProps {
	employees: IEmployee[];
	updateEmployeeStatus: (employee: IEmployee) => void;
	createEmployee: ({ employee, callBack }: ICreateEmployee) => void;
	editEmployee: ({ employee, callBack }: ICreateEmployee) => void;
}

export const columns: ColumnDef<IEmployee>[] = [

	{
		id: "Select",
		accessorKey: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				value={row.original.cpf}
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: "Status",
		accessorKey: "status",
		accessorFn: (row) => IStatus[row.status],
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					{column.id}
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className="capitalize flex items-center gap-2">
				<div className={`inline-block w-3 h-3 rounded-full ${IStatus[row.original.status] == "Inativo" ? "bg-red-500" : "bg-emerald-500"}`}></div>
				{IStatus[row.original.status]}
			</div>
		),
	},
	{
		id: "Nome",
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					{column.id}
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
	},
	{
		id: "E-mail",
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					{column.id}
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <div className="lowercase">{row.original.email}</div>,
	},
	{
		id: "Cargo",
		accessorKey: "role",
		accessorFn: (row) => row.role?.name,
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					{column.id}
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className="capitalize">
				{row.original.role?.name}
			</div>
		),
	},
];

export const EmployeesDataTable: React.FC<IProps> = ({ employees, updateEmployeeStatus, editEmployee, createEmployee }) => {

	const [sorting, setSorting] = React.useState<SortingState>([{ id: "Nome", desc: false }]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [filtering, setFiltering] = React.useState<string>("");

	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [handleEditEmployee, setHandleEditEmployee] = React.useState<IHandleEmployeeEdit | undefined>(undefined);

	React.useEffect(() => {
	}, [employees]);

	const table = useReactTable({
		data: employees,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setFiltering,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter: filtering,
		},
	})

	const handleCreateOrEditEmployee = React.useCallback((employee?: IEmployeeDTO) => {
		if (employee) {

			setHandleEditEmployee({
				modalTitle: "Editar funcionário",
				employee: employee,
				editEmployee: editEmployee,
			});
			setModalOpen(true);

		} else {

			setHandleEditEmployee(undefined);
			setModalOpen(true);

		}
	}, [editEmployee]);

	return (
		<div className="w-full">

			<ModalCreateEmployee
				open={modalOpen}
				handleEmployeeEdit={handleEditEmployee}
				onOpenChange={() => modalOpen && setModalOpen(false)}
				createEmployee={createEmployee}
			/>

			<div className="flex items-center py-4 justify-between">
				<Input
					autoFocus
					autoComplete="off"
					placeholder="Buscar por status, nome, email ou cargo"
					value={filtering}
					onChange={(event) => setFiltering(event.target.value)}
					className="max-w-sm"
				/>

				<div className="flex gap-4">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Exibir colunas <ChevronDown className="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									)
								})}
						</DropdownMenuContent>
					</DropdownMenu>

					<Button onClick={() => handleCreateOrEditEmployee()} className="flex gap-2">
						<Plus size={18} />	Criar funcionário
					</Button>
				</div>

			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}

									<TableCell key={"action"}>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="h-8 w-8 p-0">
													<span className="sr-only">Open menu</span>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Ações</DropdownMenuLabel>

												<DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.cpf)}>
													Copiar CPF
												</DropdownMenuItem>

												<DropdownMenuSeparator />

												<DropdownMenuItem onClick={() => updateEmployeeStatus(row.original)}>
													<div className="flex gap-2 items-center">
														{IStatus[row.original.status] == "Ativo" ? "Desativar" : "Ativar"}
														<div className={`inline-block w-3 h-3 rounded-full ${IStatus[row.original.status] == "Ativo" ? "bg-red-500" : "bg-emerald-500"}`}></div>
													</div>
												</DropdownMenuItem>
												
												<DropdownMenuItem onClick={() => handleCreateOrEditEmployee(row.original)}>
													Editar informações
												</DropdownMenuItem>


												<DropdownMenuItem>
													<Link href={`/dashboard/perfil/detalhes/${row.original.cpf}`}>
														Ver detalhes
													</Link>
												</DropdownMenuItem>

											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>

								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Sem resultados...
								</TableCell>
							</TableRow>
						)}
					</TableBody>

				</Table>
			</div>

			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} de{" "}
					{table.getFilteredRowModel().rows.length} linha(s) selecionadas.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Anterior
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Próximo
					</Button>
				</div>
			</div>

		</div>
	)
}
