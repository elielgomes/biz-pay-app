import { IMaritalStatus } from "@/interfaces";

export const maritalStatus = [
	{ label: "Solteiro", value: IMaritalStatus.single },
	{ label: "Casado", value: IMaritalStatus.married },
	{ label: "Separado", value: IMaritalStatus.separated },
	{ label: "Divorciado", value: IMaritalStatus.divorced },
	{ label: "Viúvo", value: IMaritalStatus.widowed },
] as const;