'use client'
import React from "react";
import { Plus } from "lucide-react";

// Components:
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormCreateEmployee } from "@/components";

export const ModalCreateEmployee: React.FC = () => {

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">
					<Plus size={18} />	Novo funcionário
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-screen-lg max-h-screen px-0">
				<ScrollArea className="max-h-[calc(100vh-100px)] px-4">
					<DialogHeader>
						<DialogTitle>Novo funcionário</DialogTitle>
						{/* <DialogDescription>
							Make changes to your profile here. Click save when youre done.
						</DialogDescription> */}
					</DialogHeader>

					<div className="px-2 mt-8">
						<FormCreateEmployee />
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}