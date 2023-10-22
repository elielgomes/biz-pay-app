import React from 'react';
import { IMaskMixin, IMaskInputProps } from 'react-imask';
import { cn } from '@/lib/utils';

const IMaskInputClass = IMaskMixin(({ inputRef, className, ...props }) =>
	React.createElement('input', {
		...props,
		className: cn(
			"flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
			className
		),
		ref: inputRef,
	})
);

const IMaskInputFn = <
	Props extends IMaskInputProps<HTMLInputElement>,
>(
	props: Props,
	ref: React.Ref<React.ComponentType<Props>>
) =>
	React.createElement(IMaskInputClass as any, { ref, ...props });

const MaskInput = React.forwardRef(IMaskInputFn as <
	Props extends IMaskInputProps<HTMLInputElement>,
>({ className, ...props }: Props & { ref?: React.Ref<React.ComponentType<Props>> }) => (
		React.ReactElement<Props>
	));


MaskInput.displayName = "MaskInput";

export default MaskInput;


