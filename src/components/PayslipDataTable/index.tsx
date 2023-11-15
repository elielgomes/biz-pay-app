"use client"

import * as React from "react"
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

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
import { IPayslip, IPayslipDTO } from "@/interfaces"
import api from "@/api"
import formatDate from "@/lib/formatDate"
import { ModalPayslip } from ".."
import { ICreatePayslip, IHandlePayslipEdit } from "../Form/FormCreatePayslip"

export const columns: ColumnDef<IPayslip>[] = [
	{
		id: "Data",
		accessorKey: "dateOfIssue",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Data
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <div className="lowercase">{formatDate(row.original.dateOfIssue)}</div>,
	},
	{
		id: "Salário Bruto",
		accessorKey: "grossSalary",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Salário Bruto
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const formatted = new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
			}).format(row.original.grossSalary)
			return <div>{formatted}</div>
		},
	},
	{
		id: "Salário Líquido",
		accessorKey: "netSalary",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Salário Líquido
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const formatted = new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
			}).format(row.original.netSalary)
			return <div>{formatted}</div>
		},
	},
]


interface IProps {
	employeeCpf?: string;
	editPayslip: (payslip: IPayslipDTO) => void;
}

export const PayslipDataTable: React.FC<IProps> = ({ employeeCpf, editPayslip }) => {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	)
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({});
	const [filtering, setFiltering] = React.useState<string>("");
	const [data, setData] = React.useState<IPayslip[]>([]);
	const [modalOpen, setModalOpen] = React.useState(false);
	const [payslipId, setPayslipId] = React.useState("");

	React.useEffect(() => {
		employeeCpf && api.payslip.getAllEmployeePayslips(employeeCpf).then((data) => {
			setData(data);
		});
	}, [employeeCpf]);

	const showMore = React.useCallback((payslipId: string) => {
		setPayslipId(payslipId);
		setModalOpen(true);
	}, []);

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter: filtering,
		},
	})

	const handleCreateOrEditPayslip = React.useCallback((payslip?: IPayslip) => {
		if (payslip) {
console.log(payslip);
			const edited: IPayslipDTO = {
				id: payslip.id,
				dateOfIssue: payslip.dateOfIssue,
				grossSalary: payslip.grossSalary,
				discounts: payslip.discounts,
				bonus: payslip.bonus,
				employeeCpf: payslip.employeeCpf,
			}
			editPayslip(edited);
		}
	}, [editPayslip]);

	return (
		<div className="w-full">
			<ModalPayslip payslipId={payslipId} open={modalOpen} onOpenChange={setModalOpen} />
			<div className="flex items-center py-4">
				<Input
					placeholder="Filtrar	por data ou salário..."
					value={filtering}
					onChange={(event) => setFiltering(event.target.value)}
					className="max-w-sm"
				/>
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
										className="capitalize"
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
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="h-8 w-8 p-0">
													<span className="sr-only">Open menu</span>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Ações</DropdownMenuLabel>
												<DropdownMenuItem
													onClick={() => navigator.clipboard.writeText(row.original.id)}
												>
													Copiar ID
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem onClick={() => handleCreateOrEditPayslip(row.original)}>Editar</DropdownMenuItem>
												<DropdownMenuItem>Baixar</DropdownMenuItem>
												<DropdownMenuItem onClick={() => showMore(row.original.id)}>Ver detalhes</DropdownMenuItem>
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
									Sem holerites cadastrados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				{/* <div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div> */}
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div >
	)
}
