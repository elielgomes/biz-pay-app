import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";

const Loading = async () => {
	return (
		<div className="max-w-screen-xl mx-auto py-5 px-5 md:px-10 md:py-10">
			<div className="mb-8">
				<h1 className="text-2xl font-semibold">Perfil</h1>
			</div>
			<div className="w-full flex flex-col gap-5 md:flex-row mb-5">
				<Card className="md:w-1/2">
					<CardHeader className="space-y-0 flex flex-row gap-2">
						<Skeleton className="bg-slate-200 rounded-full w-16 h-16" />
						<div className="space-y-3">
							<CardTitle className="text-lg font-semibold">
								<Skeleton className="bg-slate-200 w-[150px] h-5" />
							</CardTitle>
							<CardDescription>
								<Skeleton className="bg-slate-200 w-[80px] h-4" />
							</CardDescription>
						</div>
					</CardHeader>

					<CardContent className="space-y-3">
						<Skeleton className="bg-slate-200 w-1/2 h-4" />
						<Skeleton className="bg-slate-200 w-full h-4" />
					</CardContent>

				</Card>

				<Card className="md:w-1/2">
					<CardHeader className="space-y-0">
						<CardTitle className="text-lg font-semibold">
							<Skeleton className="bg-slate-200 w-1/2 h-5" />
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<Skeleton className="bg-slate-200 w-1/3 h-4" />
						<Skeleton className="bg-slate-200 w-1/3 h-4" />
						<Skeleton className="bg-slate-200 w-1/2 h-4" />
						<Skeleton className="bg-slate-200 w-full h-4" />
					</CardContent>
				</Card>
			</div>

			<div className="w-full flex flex-col gap-5 md:flex-row">
				<Card className="md:w-1/2">
					<CardHeader className="space-y-0">
						<CardTitle className="text-lg font-semibold">
							<Skeleton className="bg-slate-200 w-1/2 h-5" />
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<Skeleton className="bg-slate-200 w-1/3 h-4" />
						<Skeleton className="bg-slate-200 w-1/2 h-4" />
						<Skeleton className="bg-slate-200 w-1/2 h-4" />
						<Skeleton className="bg-slate-200 w-1/2 h-4" />
					</CardContent>
				</Card>

				<Card className="md:w-1/2">
					<CardHeader className="space-y-0">
						<CardTitle className="text-lg font-semibold">
							<Skeleton className="bg-slate-200 w-1/2 h-5" />
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<Skeleton className="bg-slate-200 w-1/3 h-4" />
						<Skeleton className="bg-slate-200 w-1/3 h-4" />
						<Skeleton className="bg-slate-200 w-1/3 h-4" />
						<Skeleton className="bg-slate-200 w-1/3 h-4" />
					</CardContent>
				</Card>
			</div>
		</div>

	)
}

export default Loading;