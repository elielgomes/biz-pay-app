import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = ComponentProps<"div">;

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
	return (
		<div className={twMerge("max-w-screen-xl mx-auto py-5 px-5 md:px-10 md:py-10", className)}>
			{children}
		</div>
	)
}