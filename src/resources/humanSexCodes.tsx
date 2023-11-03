import { IHumanSexCodes } from "@/interfaces";

export const humanSexCodes = [
	{ label: "Masculino", value: IHumanSexCodes.male },
	{ label: "Feminino", value: IHumanSexCodes.female },
	{ label: "Indefinido", value: IHumanSexCodes.notApplicable },
	{ label: "Outro", value: IHumanSexCodes.notKnown },
] as const;
