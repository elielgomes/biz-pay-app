"use strict";

import React from "react";
import { Container } from "@/components/Container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Loading = async () => {
	return (
		<>
			<Container>

				<div className="mb-8">
					<h1 className="text-2xl font-semibold text-slate-700">Detalhes</h1>
					<div className="w-[100px] h-1 rounded-md bg-gradient-to-r to-[#FF9B44] from-[#FC6075]" />
				</div>

				<div className="flex justify-end mb-4 animate-pulse">
					<div className="rounded-lg w-[168px] h-10 bg-gradient-to-r to-[#FF9B44] from-[#FC6075] transition-all duration-200 hover:brightness-95">
					</div>
				</div>

				<div className="w-full flex flex-col gap-5 md:flex-row mb-5">

					<Card className="md:w-2/5 border-none overflow-hidden shadow-lg">
						<CardHeader className="flex items-center space-y-6 mb-8 bg-gradient-to-b from-slate-200">
							<div className="animate-pulse w-[80px] h-[80px] flex-shrink-0 bg-gradient-to-r to-[#FF9B44] from-[#FC6075] rounded-full flex items-center justify-center">
								<span className="font-bold text-4xl text-white"></span>
							</div>
							<div className="space-y-3">
								<CardTitle className="w-32 mx-auto bg-slate-300 h-4 rounded-lg"></CardTitle>
								<CardDescription className="w-44 mx-auto bg-slate-300 h-4 rounded-lg"></CardDescription>
							</div>
						</CardHeader>
						<CardContent className="space-y-5 animate-pulse pb-28">
							<div className="space-y-3">
								<div className="w-24 bg-slate-300 h-4 rounded-lg"></div>
								<div className="bg-slate-300 h-4 rounded-lg"></div>
							</div>
							<div className="space-y-3">
								<div className="w-24 bg-slate-300 h-4 rounded-lg"></div>
								<div className="bg-slate-300 h-4 rounded-lg"></div>
							</div>
							<div className="space-y-3">
								<div className="w-24 bg-slate-300 h-4 rounded-lg"></div>
								<div className="bg-slate-300 h-4 rounded-lg"></div>
							</div>

						</CardContent>
					</Card>

					<Card className="md:w-3/5 border-none shadow-lg">
						<CardHeader className="space-y-2">
							<CardTitle className="text-xl font-bold text-slate-700">
								Informações Pessoais
							</CardTitle>
							<div className="w-[100px] h-1 rounded-md bg-gradient-to-r to-[#FF9B44] from-[#FC6075]" />
						</CardHeader>
						<CardContent className="space-y-6 animate-pulse">

							<div className="flex gap-4">
								<div className="w-36 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-36 bg-slate-300 h-4 rounded-lg"></div>
							</div>

							<div className="flex gap-4">
								<div className="w-36 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-32 bg-slate-300 h-4 rounded-lg"></div>
							</div>

							<div className="flex gap-4">
								<div className="w-12 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-24 bg-slate-300 h-4 rounded-lg"></div>
							</div>

							<div className="flex gap-4">
								<div className="w-28 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-24 bg-slate-300 h-4 rounded-lg"></div>
							</div>

							<div className="flex gap-4">
								<div className="w-44 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-28 bg-slate-300 h-4 rounded-lg"></div>
							</div>

							<div className="flex gap-4">
								<div className="w-40 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-12 bg-slate-300 h-4 rounded-lg"></div>
							</div>

							<div className="flex gap-4">
								<div className="w-16 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-48 bg-slate-300 h-4 rounded-lg"></div>
							</div>

							<div className="flex gap-4">
								<div className="w-20 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-28 bg-slate-300 h-4 rounded-lg"></div>
							</div>

							<div className="flex gap-4">
								<div className="w-20 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-28 bg-slate-300 h-4 rounded-lg"></div>
							</div>

							<div className="flex gap-4">
								<div className="w-20 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-56 bg-slate-300 h-4 rounded-lg"></div>
							</div>

						</CardContent>
					</Card>
				</div>
				<div className="w-full flex flex-col gap-5 md:flex-row">
					<Card className="md:w-full border-none shadow-lg">
						<CardHeader className="space-y-2">
							<CardTitle className="text-xl font-bold text-slate-700">
								Dados Bancários
							</CardTitle>
							<span className="w-[100px] h-1 rounded-md bg-orange-500" />
						</CardHeader>
						<CardContent className="space-y-3 animate-pulse">

							<div className="flex gap-4">
								<div className="w-28 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-24 bg-slate-300 h-4 rounded-lg"></div>
							</div>

							<div className="flex gap-4">
								<div className="w-40 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-24 bg-slate-300 h-4 rounded-lg"></div>
							</div >
							<div className="flex gap-4">
								<div className="w-44 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-24 bg-slate-300 h-4 rounded-lg"></div>
							</div >
							<div className="flex gap-4">
								<div className="w-24 bg-slate-300 h-4 rounded-lg"></div>
								<div className="w-24 bg-slate-300 h-4 rounded-lg"></div>
							</div >

						</CardContent >
					</Card >
				</div >

				<div className="mt-5">
					<Card className="border-none shadow-lg">
						<CardHeader className="space-y-2">
							<CardTitle className="text-xl font-bold text-slate-700">
								Holerites
							</CardTitle>
							<span className="w-[100px] h-1 rounded-md bg-orange-500" />
						</CardHeader>
						<CardContent className="p-4 animate-pulse space-y-5">
							<div className="flex justify-between">
								<div className="border border-[#FF9B44] bg-slate-100 w-[380px] h-10 rounded-lg"></div>
								<div className="flex gap-4">
									<div className="border border-[#FF9B44] bg-slate-100 w-[145px] h-10 rounded-lg"></div>
									<div className="bg-gradient-to-r to-[#FF9B44] from-[#FC6075] w-[145px] h-10 rounded-lg"></div>
								</div>
							</div>
							<div className="bg-slate-200 h-72 w-full rounded-lg"></div>
							<div className="flex gap-4 justify-end">
								<div className="bg-slate-100 w-24 h-9 rounded-lg"></div>
								<div className="bg-slate-100 w-24 h-9 rounded-lg"></div>
							</div>
						</CardContent>
					</Card>
				</div>

			</Container >
		</>
	)
};

export default Loading;