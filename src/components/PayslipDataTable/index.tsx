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
import { usePayslipDataTable } from "./hook"

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
import { ModalPayslip } from ".."
import { ICreatePayslip, IHandlePayslipEdit } from "../Form/FormCreatePayslip"
import { set } from "date-fns"
import { DownloadPDF } from "../PDF"

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
		cell: ({ row }) => <div className="lowercase text-slate-500 font-medium">{new Date(row.original.dateOfIssue).toLocaleDateString('pt-br')}</div>,
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
			return <div className="text-slate-500 font-medium">{formatted}</div>
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
			return <div className="text-slate-700 font-medium">{formatted}</div>
		},
	},
]


interface IProps {
	employeeCpf?: string;
	editPayslip: (payslip: IPayslipDTO) => void;
	buttonChildren?: React.ReactNode;
	refresher?: boolean;
}

export const PayslipDataTable: React.FC<IProps> = ({ refresher, employeeCpf, editPayslip, buttonChildren }) => {

	const { refresh, onRefresh } = usePayslipDataTable();
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
	const [employeeCpfState, setEmployeeCpfState] = React.useState(employeeCpf);

	const [payslipId, setPayslipId] = React.useState("");

	React.useEffect(() => {
		employeeCpf && api.payslip.getAllEmployeePayslips(employeeCpf).then((data) => {
			setData(data);
		});
		return () => { }
	}, [refresh, employeeCpf, refresher]);

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

	const handleDeletePayslip = (payslipId: string) => {
		api.payslip.deletePayslip(payslipId).then(() => {
			onRefresh();
		});
	};

	return (
		<div className="w-full bg-white p-4 rounded-lg shadow-lg mt-5">

			<div className="flex flex-col p-2 space-y-2">
				<h3 className="tracking-tight text-xl font-bold text-slate-700">Holerites</h3>
				<div data-orientation="horizontal" role="none" className="shrink-0 dark:bg-slate-800 w-[100px] h-1 rounded-md bg-orange-500">
				</div>
			</div>

			<ModalPayslip payslipId={payslipId} open={modalOpen} onOpenChange={setModalOpen} />
			<div className="flex items-center justify-between py-4">
				<Input
					placeholder="Filtrar	por data ou salário..."
					value={filtering}
					onChange={(event) => setFiltering(event.target.value)}
					className="max-w-sm focus-visible:ring-1	focus-visible:ring-[#FF9B44] focus-visible:ring-offset-1"
				/>
				<div className="flex gap-3">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto border-[#FF9B44] text-[#FF9B44] hover:text-[#FC6075]">
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
											className="capitalize text-slate-500"
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
					{buttonChildren}
				</div>
			</div>
			<div>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="hover:bg-white">
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
											<DropdownMenuContent align="end" className="text-slate-600">
												<DropdownMenuLabel>Ações</DropdownMenuLabel>
												<DropdownMenuItem
													onClick={() => navigator.clipboard.writeText(row.original.id)}
												>
													Copiar ID
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem onClick={() => handleDeletePayslip(row.original.id)}>Deletar</DropdownMenuItem>
												<DropdownMenuItem onClick={() => handleCreateOrEditPayslip(row.original)}>Editar</DropdownMenuItem>
												<DropdownMenuItem>
													<DownloadPDF payslip={row.original}></DownloadPDF>
												</DropdownMenuItem>
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
									className="h-24 text-center text-slate-700"
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
						className="text-slate-700"
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Anterior
					</Button>
					<Button
						className="text-slate-700"
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Próximo
					</Button>
				</div>
			</div>
		</div >
	)
}
